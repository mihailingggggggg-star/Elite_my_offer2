import { motion, useDragControls } from "framer-motion";
import type { ReactNode } from "react";
import { Close } from "./Icons";

/**
 * Native-feeling bottom sheet: slides up, drags down to dismiss.
 * Dragging is bound to the grip only, so the body keeps scrolling normally.
 */
export function Sheet({
  crumbs,
  title,
  lede,
  onClose,
  stacked,
  children,
}: {
  crumbs: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  onClose: () => void;
  stacked?: boolean;
  children: ReactNode;
}) {
  const drag = useDragControls();

  return (
    <motion.div
      className={stacked ? "sheet sheet--stack" : "sheet"}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.7 }}
      drag="y"
      dragListener={false}
      dragControls={drag}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.55 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 130 || info.velocity.y > 700) onClose();
      }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="sheet__grip"
        onPointerDown={(e) => drag.start(e)}
        aria-hidden
      >
        <span />
      </div>

      <div className="sheet__head">
        <div className="sheet__crumbs">{crumbs}</div>
        <div className="sheet__title">
          <div>
            <h2>{title}</h2>
            {lede && <p className="sheet__plain">{lede}</p>}
          </div>
          <button className="xbtn" onClick={onClose} aria-label="Закрыть">
            <Close />
          </button>
        </div>
      </div>

      <div className="sheet__body">{children}</div>
    </motion.div>
  );
}

export function Block({
  n,
  title,
  hint,
  children,
}: {
  n?: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="block__head">
        {n && (
          <span className="eyebrow">
            <span className="eyebrow__num">{n}</span>
          </span>
        )}
        <h3>{title}</h3>
        {hint && <span className="block__hint">{hint}</span>}
      </div>
      {children}
    </section>
  );
}
