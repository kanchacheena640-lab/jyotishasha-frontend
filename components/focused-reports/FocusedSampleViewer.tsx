"use client";
// components/focused-reports/FocusedSampleViewer.tsx
// "View Sample" for a focused product: opens the product's EXISTING sample PDF
// (href from getFocusedReportSampleOrPreviewHref, passed in by the Hero -- this
// file never decides which PDF) in a modal on the SAME page, so the visitor
// stays on the product page and can continue straight to purchase.
//
// - Trigger stays a real <a href={pdf} target="_blank">: without JS, or on a
//   modifier/middle click, it opens the PDF exactly as before.
// - Native <dialog>.showModal(): dialog semantics + aria-modal, focus kept
//   inside the dialog, background inert, Escape -> "cancel" event.
// - Browser/device Back closes the modal: opening pushes ONE same-URL history
//   entry (no hash/query -- the page already uses #focused-report-form, and
//   Next 14.2's patched pushState copies its own router state into the entry,
//   so popping it is an in-place restore, never a reload/navigation). X /
//   Escape / the CTA go through history.back() when that entry is current, so
//   no stale entries pile up; Forward simply reopens it (state-driven, no loop).
// - The purchase CTA does NOT start a checkout of its own: it closes the modal
//   and scrolls to the page's existing #focused-report-form (the same target as
//   the Hero's own "Get Your Report" CTA), which renders FocusedReportCheckout /
//   FocusedDualReportCheckout for this product.
// - The PDF iframe is only mounted while open (no PDF download per page view).
//   Browsers without a built-in PDF viewer (navigator.pdfViewerEnabled ===
//   false, e.g. Chrome on Android) get an explicit "open the PDF" button
//   instead of a blank frame; an "open in new tab" link is always shown too.

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, SyntheticEvent } from "react";
import type { Locale } from "@/lib/authority-engine/types";

const HISTORY_KEY = "focusedSampleModal";
const PURCHASE_FORM_ID = "focused-report-form";

interface Props {
  href: string;
  locale: Locale;
  priceRupees: number;
  title: string;
}

function isModalEntry(state: unknown, href: string): boolean {
  return Boolean(state && typeof state === "object" && (state as Record<string, unknown>)[HISTORY_KEY] === href);
}

export default function FocusedSampleViewer({ href, locale, priceRupees, title }: Props) {
  const isHi = locale === "hi";
  const [open, setOpen] = useState(false);
  const [pdfViewerAvailable, setPdfViewerAvailable] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // What to do once the modal has actually closed: return focus to the trigger, or continue to purchase.
  const afterCloseRef = useRef<"restore-focus" | "purchase">("restore-focus");

  useEffect(() => {
    const nav = navigator as Navigator & { pdfViewerEnabled?: boolean };
    if (nav.pdfViewerEnabled === false) setPdfViewerAvailable(false);
  }, []);

  // History is the single source of truth while the modal entry exists: Back closes, Forward reopens.
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => setOpen(isModalEntry(event.state, href));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [href]);

  // Sync the native dialog + body scroll lock with `open`.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      wasOpenRef.current = true;
      if (!dialog.open) dialog.showModal();
      // React's autoFocus doesn't emit the attribute, so showModal() would focus the first focusable element.
      closeButtonRef.current?.focus();
      const root = document.documentElement;
      const previousOverflow = root.style.overflow;
      root.style.overflow = "hidden";
      return () => {
        root.style.overflow = previousOverflow;
      };
    }
    if (dialog.open) dialog.close();
    if (!wasOpenRef.current) return undefined; // initial mount: never steal focus on page load
    wasOpenRef.current = false;
    const action = afterCloseRef.current;
    afterCloseRef.current = "restore-focus";
    if (action === "purchase") {
      // Closing went through history.back(); the browser restores that entry's scroll position right after
      // popstate, which would cancel a scroll started now. Start it once the traversal has settled.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const form = document.getElementById(PURCHASE_FORM_ID);
        form?.scrollIntoView({ behavior: "smooth", block: "start" });
        form?.querySelector<HTMLElement>("input, select, textarea, button")?.focus({ preventScroll: true });
      }));
    } else {
      triggerRef.current?.focus({ preventScroll: true });
    }
    return undefined;
  }, [open]);

  const openModal = useCallback(() => {
    if (!isModalEntry(window.history.state, href)) {
      // Same URL (no hash/query); Next's patched pushState merges its own router state into this entry.
      window.history.pushState({ ...(window.history.state ?? {}), [HISTORY_KEY]: href }, "");
    }
    setOpen(true);
  }, [href]);

  const requestClose = useCallback(
    (action: "restore-focus" | "purchase" = "restore-focus") => {
      afterCloseRef.current = action;
      if (isModalEntry(window.history.state, href)) {
        window.history.back(); // popstate -> setOpen(false); removes our entry instead of stacking another
      } else {
        setOpen(false);
      }
    },
    [href],
  );

  const onTriggerClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle new-tab/window intents natively.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openModal();
  };

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault(); // Escape: close through history like every other close path
    requestClose();
  };

  const onBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) requestClose();
  };

  const headingId = `focused-sample-title-${href.replace(/[^a-z0-9]+/gi, "-")}`;
  const ctaLabel = isHi
    ? `मेरी व्यक्तिगत रिपोर्ट प्राप्त करें — ₹${priceRupees}`
    : `Get My Personalized Report — ₹${priceRupees}`;

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onTriggerClick}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:border-purple-300 hover:text-white"
      >
        {isHi ? "Sample देखें" : "View Sample"}
        <span aria-hidden="true">↗</span>
      </a>

      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={headingId}
        onCancel={onCancel}
        onClick={onBackdropClick}
        className="m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/70 sm:m-auto sm:h-[90vh] sm:w-[min(92vw,960px)] sm:rounded-2xl"
      >
        {open && (
          <div className="flex h-full flex-col overflow-hidden bg-slate-900 text-left text-white sm:rounded-2xl sm:border sm:border-purple-400/30">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-300">
                  {isHi ? "Sample रिपोर्ट" : "Sample Report"}
                </p>
                <h2 id={headingId} className="truncate text-base font-semibold sm:text-lg">
                  {title}
                </h2>
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 text-sm text-purple-300 underline-offset-2 hover:underline sm:inline"
              >
                {isHi ? "नए टैब में खोलें ↗" : "Open in new tab ↗"}
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                autoFocus
                onClick={() => requestClose()}
                aria-label={isHi ? "Sample बंद करें" : "Close sample"}
                className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span aria-hidden="true">✕</span>
                <span className="ml-1.5">{isHi ? "बंद करें" : "Close"}</span>
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-slate-800">
              {pdfViewerAvailable ? (
                <iframe
                  src={href}
                  title={isHi ? `${title} — Sample PDF` : `${title} — sample PDF`}
                  className="h-full w-full border-0 bg-white"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="max-w-sm text-slate-300">
                    {isHi
                      ? "आपका ब्राउज़र यहाँ PDF नहीं दिखा सकता। Sample PDF खोलकर देखें, फिर इसी पेज पर लौटें।"
                      : "Your browser can't display the PDF here. Open the sample PDF, then return to this page."}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-purple-400/60 px-5 py-3 font-semibold text-purple-200 hover:bg-purple-400/10"
                  >
                    {isHi ? "Sample PDF खोलें ↗" : "Open sample PDF ↗"}
                  </a>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-slate-900 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => requestClose("purchase")}
                className="w-full rounded-xl bg-purple-700 px-6 py-3 text-base font-bold text-white shadow-xl transition-all hover:bg-purple-800 active:scale-[0.99] sm:text-lg"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
