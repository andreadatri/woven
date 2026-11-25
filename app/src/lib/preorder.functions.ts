import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "./bindings.server";

const COLOURWAYS = ["coral", "mint", "shell", "butter", "sky"] as const;
const SIZES = ["XS", "S", "M", "L", "XL"] as const;

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  size: z.enum(SIZES),
  colourway: z.enum(COLOURWAYS),
});

export type PreorderInput = z.infer<typeof schema>;
export type PreorderResult =
  | { ok: true; queue: number; colourway: string; size: string }
  | { ok: false; reason: "closed" | "duplicate" | "unavailable" };

/**
 * Records a reservation in the atelier's own D1 database and returns the
 * position the visitor now holds in the batch queue.
 */
export const reserveSeat = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }): Promise<PreorderResult> => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false, reason: "unavailable" };
    }

    await DB.prepare(
      `CREATE TABLE IF NOT EXISTS preorders (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT NOT NULL,
         size TEXT NOT NULL,
         colourway TEXT NOT NULL,
         created_at TEXT NOT NULL DEFAULT (datetime('now'))
       )`,
    ).run();

    const existing = await DB.prepare(
      "SELECT id FROM preorders WHERE lower(email) = lower(?) AND colourway = ? LIMIT 1",
    )
      .bind(data.email, data.colourway)
      .first<{ id: number }>();

    if (existing) {
      return { ok: false, reason: "duplicate" };
    }

    const batch = await DB.prepare(
      "SELECT COUNT(*) AS n FROM preorders WHERE colourway = ?",
    )
      .bind(data.colourway)
      .first<{ n: number }>();

    if ((batch?.n ?? 0) >= 400) {
      return { ok: false, reason: "closed" };
    }

    await DB.prepare(
      "INSERT INTO preorders (name, email, size, colourway) VALUES (?, ?, ?, ?)",
    )
      .bind(data.name, data.email, data.size, data.colourway)
      .run();

    const total = await DB.prepare(
      "SELECT COUNT(*) AS n FROM preorders WHERE colourway = ?",
    )
      .bind(data.colourway)
      .first<{ n: number }>();

    return {
      ok: true,
      queue: total?.n ?? 1,
      colourway: data.colourway,
      size: data.size,
    };
  });

export const colourwayNames = COLOURWAYS;
export const sizeNames = SIZES;
