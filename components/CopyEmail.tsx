"use client";

// Copies the email address, for visitors whose computer has no mail app set up
// (clicking a mailto: link does nothing for them).
import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`; // clipboard blocked: fall back to the mail app
    }
  }
  return (
    <button type="button" className="btn btn-line copy-btn" onClick={copy} aria-live="polite">
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
