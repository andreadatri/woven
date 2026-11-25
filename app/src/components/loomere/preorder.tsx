import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormEvent, ReactNode } from "react";

import { reserveSeat } from "@/lib/preorder.functions";

import { Knot } from "./parts";

export type ColourwayId = "coral" | "mint" | "shell" | "butter" | "sky";
export type SizeId = "XS" | "S" | "M" | "L" | "XL";

const SIZES: SizeId[] = ["XS", "S", "M", "L", "XL"];

const WAYS: { id: ColourwayId; name: string }[] = [
  { id: "coral", name: "Coral" },
  { id: "mint", name: "Mint" },
  { id: "shell", name: "Shell" },
  { id: "butter", name: "Butter" },
  { id: "sky", name: "Sky" },
];

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

type PreorderContextValue = {
  open: (colourway?: ColourwayId) => void;
};

const PreorderContext = createContext<PreorderContextValue>({
  open: () => {},
});

export function usePreorder() {
  return useContext(PreorderContext);
}

export function PreorderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState<ColourwayId>("coral");

  const open = useCallback((colourway?: ColourwayId) => {
    if (colourway) {
      setSeed(colourway);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <PreorderContext.Provider value={{ open }}>
      {children}
      {isOpen ? <PreorderModal seed={seed} onClose={close} /> : null}
    </PreorderContext.Provider>
  );
}

function PreorderModal({
  seed,
  onClose,
}: {
  seed: ColourwayId;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<SizeId>("M");
  const [colourway, setColourway] = useState<ColourwayId>(seed);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [queue, setQueue] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const wayName = WAYS.find((way) => way.id === colourway)?.name ?? "Coral";
  const nameBad = status === "error" && name.trim().length < 2;
  const emailBad = status === "error" && !EMAIL.test(email.trim());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") {
      return;
    }
    if (name.trim().length < 2) {
      setStatus("error");
      setMessage("Add a name we can write on the ticket.");
      return;
    }
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      setMessage("That email does not look complete.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const result = await reserveSeat({
        data: { name: name.trim(), email: email.trim(), size, colourway },
      });
      if (result.ok) {
        setQueue(result.queue);
        setStatus("done");
        return;
      }
      setStatus("error");
      setMessage(
        result.reason === "duplicate"
          ? "That email already holds a place in this colourway."
          : result.reason === "closed"
            ? "This colourway has closed. The next batch opens in spring."
            : "Reservations are offline right now. Try again in a minute.",
      );
    } catch {
      setStatus("error");
      setMessage("Reservations are offline right now. Try again in a minute.");
    }
  }

  return (
    <div
      aria-label="Reserve a polo"
      aria-modal="true"
      className="lm-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
    >
      <div className="lm-modal__card">
        <button
          aria-label="Close"
          className="lm-modal__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="lm-modal__body">
          {status === "done" && queue !== null ? (
            <>
              <h2 className="lm-modal__title">You are on the list.</h2>
              <div className="lm-success" role="status">
                <span className="lm-success__no">
                  {String(queue).padStart(3, "0")}
                </span>
                <p>
                  Your place in the {wayName.toLowerCase()} queue, size {size}.
                  We write to {email.trim()} when the March cut reaches your
                  number, and nothing before that.
                </p>
              </div>
              <p className="lm-modal__note">
                No deposit is taken. A place can be moved to another colourway
                once, at no cost.
              </p>
            </>
          ) : (
            <>
              <h2 className="lm-modal__title">Reserve a polo</h2>
              <p className="lm-modal__note">
                400 pieces per colourway, cut in March. A reservation holds your
                size without a deposit.
              </p>

              <form className="lm-form" onSubmit={handleSubmit}>
                <div className="lm-form__row">
                  <div className={nameBad ? "lm-field lm-field--error" : "lm-field"}>
                    <label htmlFor="lm-name">Name</label>
                    <input
                      autoComplete="name"
                      id="lm-name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Giulia Ferri"
                      ref={nameRef}
                      type="text"
                      value={name}
                    />
                  </div>
                  <div
                    className={emailBad ? "lm-field lm-field--error" : "lm-field"}
                  >
                    <label htmlFor="lm-email">Email</label>
                    <input
                      autoComplete="email"
                      id="lm-email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="giulia@studio.it"
                      type="email"
                      value={email}
                    />
                  </div>
                </div>

                <div className="lm-field">
                  <span className="lm-field__legend">Size</span>
                  <div className="lm-form__sizes">
                    {SIZES.map((option) => (
                      <button
                        aria-pressed={size === option}
                        className="lm-size"
                        key={option}
                        onClick={() => setSize(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lm-field">
                  <label htmlFor="lm-colour">Colourway</label>
                  <select
                    id="lm-colour"
                    onChange={(event) =>
                      setColourway(event.target.value as ColourwayId)
                    }
                    value={colourway}
                  >
                    {WAYS.map((way) => (
                      <option key={way.id} value={way.id}>
                        {way.name}
                      </option>
                    ))}
                  </select>
                </div>

                {status === "error" ? (
                  <p aria-live="polite" className="lm-error" role="alert">
                    {message}
                  </p>
                ) : null}

                <button
                  className="lm-submit"
                  disabled={status === "sending"}
                  type="submit"
                >
                  {status === "sending" ? "Writing your ticket" : "Reserve a polo"}
                </button>
              </form>
            </>
          )}
        </div>

        <aside className="lm-modal__aside">
          <Knot />
          <p>Loomere, Prato. One polo, five colourways, twice a year.</p>
        </aside>
      </div>
    </div>
  );
}
