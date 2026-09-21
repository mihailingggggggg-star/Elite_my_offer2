import { motion } from "framer-motion";
import type { Result } from "../data/offer";
import { projectById } from "../data/offer";
import { Sheet, Block } from "./Sheet";
import { ArrowRight } from "./Icons";

export function ResultSheet({
  result,
  onClose,
  onPickProject,
}: {
  result: Result;
  onClose: () => void;
  onPickProject: (id: string) => void;
}) {
  const top = Math.max(...result.mix.map((m) => m.weight));

  return (
    <Sheet
      onClose={onClose}
      crumbs={<>Гарантированный результат · {result.horizon}</>}
      title={
        <>
          <span className="grad-num">
            {result.value}
            {result.unit}
          </span>{" "}
          — {result.label.toLowerCase()}
        </>
      }
      lede={
        <>
          {result.plain}
          {result.note && (
            <>
              <br />
              <span style={{ color: "var(--txt-3)", fontSize: "14px" }}>{result.note}</span>
            </>
          )}
        </>
      }
    >
      <Block n="01" title="Какими методами" hint="Принцип, за счёт которого цифра двигается">
        <div className="mlist">
          {result.methods.map((m, i) => (
            <motion.div
              className="mrow"
              key={m.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mrow__i">{i + 1}</span>
              <div>
                <h4>{m.title}</h4>
                <p>{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Block>

      <Block
        n="02"
        title="Из каких проектов складывается"
        hint="Процент — вклад проекта в этот результат. Нажмите, чтобы раскрыть проект"
      >
        <div className="mixlist">
          {result.mix.map((m, i) => {
            const p = projectById(m.projectId);
            return (
              <motion.button
                className="mix"
                key={m.projectId}
                onClick={() => onPickProject(m.projectId)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="mix__fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: m.weight / top }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%" }}
                />
                <span className="mix__in">
                  <span className="mix__pct">
                    {m.weight}
                    <span>%</span>
                  </span>
                  <span>
                    <span className="mix__t">{p.title}</span>
                    <span className="mix__w">{m.why}</span>
                  </span>
                  <ArrowRight className="mix__arrow" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </Block>
    </Sheet>
  );
}
