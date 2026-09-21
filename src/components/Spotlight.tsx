import { motion } from "framer-motion";
import type { Project, Spot } from "../data/offer";
import { ArrowRight, External } from "./Icons";

/**
 * The three assets that carry the offer — the Elite Invest app, the new site
 * and the MBANK placement — plus AR. Deliberately louder than a project card.
 */
export function SpotCard({
  spot,
  project,
  index,
  onOpen,
}: {
  spot: Spot;
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const link = project.link;

  return (
    <motion.div
      className={spot.hero ? "spot spot--hero" : "spot"}
      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="spot__sheen" aria-hidden />

      <div className="spot__head">
        <span className="spot__kicker">{spot.kicker}</span>
        {link && <span className="spot__ready">Готово</span>}
      </div>

      <h3 className="spot__name">{spot.headline}</h3>
      <p className="spot__line">{spot.line}</p>

      {spot.note && <p className="spot__note">{spot.note}</p>}

      <div className="spot__acts">
        {link &&
          (link.url === "#" ? (
            <span className="btn btn--ghost btn--soon">
              <External /> {link.note}
            </span>
          ) : (
            <a className="btn btn--fill" href={link.url} target="_blank" rel="noreferrer">
              <External /> {link.label}
            </a>
          ))}
        <button className="btn btn--ghost" onClick={onOpen}>
          Что внутри и сроки <ArrowRight />
        </button>
      </div>
    </motion.div>
  );
}
