import { useEffect, useState } from "react";
import { LiquidGlass } from "liquid-glass-web-react";
import { motion } from "framer-motion";
import { results } from "../data/offer";
import { Drag } from "./Icons";

/** The lens is sized in px, so it is measured rather than declared. */
function useLensSize() {
  const [size, setSize] = useState({ w: 170, h: 122 });
  useEffect(() => {
    const fit = () => {
      // The column is at most 440px wide, so the lens stays a comfortable
      // thumb-sized puck on every phone.
      const col = Math.min(window.innerWidth, 440) - 36;
      setSize({ w: Math.round(col * 0.44), h: Math.round(col * 0.32) });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return size;
}

export function Hero() {
  const { w, h } = useLensSize();

  return (
    <section className="hero" id="top">
      <div className="shell hero__grid">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">
              <span className="eyebrow__dot" />
              Elite House · Бишкек
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Начнём с цифр,
            <br />
            которые <span className="grad-num">обещаю</span>.
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Четыре результата за первое полугодие. Нажмите на любой — увидите,
            какими методами он достигается и из каких проектов складывается,
            с процентом влияния каждого.
          </motion.p>

          <motion.div
            className="hero__cues"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chip chip--hot">13 проектов</span>
            <span className="chip">Отдел на 7 человек</span>
            <span className="chip">Спринты 2 недели · OKR на квартал</span>
            <span className="chip">Сайт и приложение уже готовы</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiquidGlass
            draggable
            width={w}
            height={h}
            radius={30}
            strength={0.032}
            chromaticAberration={0.1}
            curvature={0.35}
            depth={8}
            glow={0.16}
            edgeHighlight={0.38}
            specularAngle={135}
            blur={0}
            x={0.52}
            y={0.72}
            className="hero__lens"
          >
            <div className="lens-card">
              <div>
                <span className="eyebrow">
                  <span className="eyebrow__dot" />
                  Что будет в цифрах
                </span>
              </div>
              <div className="lens-card__rows">
                {results.map((r) => (
                  <div className="lens-row" key={r.id}>
                    <span className="lens-row__k">{r.label}</span>
                    <span className="lens-row__v grad-num">
                      {r.value}
                      {r.unit}
                    </span>
                  </div>
                ))}
              </div>
              <span className="lens-hint">
                <Drag /> Потяните стекло — оно живое
              </span>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}
