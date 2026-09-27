"use client";

import { useEffect, type ReactNode } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-on-surface/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-low shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-surface-container-lowest border-b border-outline-variant/40">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
