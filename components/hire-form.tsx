"use client";

import { useActionState } from "react";
import { submitHireForm } from "@/actions/hire";

import { Magnetic } from "./primitives";

/**
 * The /hire page's form. Server action does Zod validation and an email
 * send via Resend — no database.
 */

const initialState = { success: false, error: undefined as string | undefined };

const FIELD =
  "v-heading rounded-xl border border-[var(--v-line)] bg-[var(--v-bg)]/60 px-3.5 py-2.5 text-[14px] text-[var(--v-fg)] placeholder:text-[var(--v-faint-2)] outline-none transition-colors duration-300 focus:border-[var(--v-accent-line)]";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="v-heading text-[11px] tracking-[0.12em] text-[var(--v-faint)] uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function HireForm() {
  const [state, action, isPending] = useActionState(
    submitHireForm,
    initialState,
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span
          aria-hidden
          className="flex size-12 items-center justify-center rounded-full border border-[var(--v-accent-line)] text-[var(--v-accent)]"
        >
          ✓
        </span>
        <h3 className="v-display text-2xl text-[var(--v-fg)]">Message received.</h3>
        <p className="max-w-xs text-[14px] leading-relaxed text-pretty text-[var(--v-muted)]">
          I read every inquiry myself and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && (
        <p className="v-mono rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </p>
      )}

      <Field id="name" label="Your name">
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jean Doe"
          className={FIELD}
        />
      </Field>

      <Field id="email" label="Email address">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={FIELD}
        />
      </Field>

      <Field id="projectType" label="Project type">
        <select id="projectType" name="projectType" required className={FIELD}>
          <option value="saas">SaaS / Web App</option>
          <option value="ai-workflow">AI Workflow</option>
          <option value="website">Website / Landing Page</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field id="budgetRange" label="Budget">
          <select
            id="budgetRange"
            name="budgetRange"
            required
            className={FIELD}
            defaultValue={"<1k"}
          >
            <option value="<500">Under $500</option>
            <option value="<1k">Under $1k</option>
            <option value="1k-5k">$1k – $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k+">$15k+</option>
          </select>
        </Field>

        <Field id="timeline" label="Timeline">
          <select id="timeline" name="timeline" required className={FIELD}>
            <option value="asap">ASAP</option>
            <option value="1-3months">1–3 months</option>
            <option value="3-6months">3–6 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </Field>
      </div>

      <Field id="description" label="Tell me about the project">
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="What are you building? What problem does it solve? Any specific features in mind?"
          className={`${FIELD} resize-none`}
        />
      </Field>

      {/* A plain <button> styled to match ShimmerButton rather than that
          primitive itself — ShimmerButton always renders a Link/anchor,
          and a form needs a real `type="submit"` element to fire the
          action on Enter as well as on click. */}
      {/* block + w-full override Magnetic's default `inline-block`: that
          wrapper would otherwise shrink to the button's own intrinsic
          width, and the button's own `w-full` has nothing to be 100% of. */}
      <Magnetic strength={0.2} className="mt-1 block w-full">
        <button
          type="submit"
          disabled={isPending}
          className="v-shimmer v-heading relative isolate flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[var(--v-cta-bg)] text-sm font-semibold text-[var(--v-cta-fg)] transition-[transform,box-shadow,opacity] duration-300 hover:shadow-[0_8px_40px_-8px_var(--v-cta-glow)] disabled:pointer-events-none disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send inquiry"}
        </button>
      </Magnetic>
    </form>
  );
}
