import { motion } from "framer-motion";
import type { Project, Result } from "../data/offer";
import { results } from "../data/offer";
import { Sheet, Block } from "./Sheet";
import { ArrowRight, Dot, External } from "./Icons";

const scaleLabel: Record<Project["scale"], string> = {
  core: "Базовый проект",
  big: "Крупный проект",
  ready: "Уже готово",
};

export function ProjectSheet({
  project,
  from,
  onClose,
  onBack,
  onPickResult,
}: {
  project: Project;
  from?: Result | null;
  onClose: () => void;
  onBack?: () => void;
  onPickResult: (id: string) => void;
}) {
  /** Where this project shows up across the four guarantees. */
  const feeds = results
    .map((r) => {
      const hit = r.mix.find((m) => m.projectId === project.id);
      return hit ? { result: r, weight: hit.weight } : null;
    })
    .filter(Boolean) as { result: Result; weight: number }[];

  return (
    <Sheet
      stacked
      onClose={onClose}
      crumbs={
        <>
          {from && onBack ? (
            <span className="sheet__back">
              <button onClick={onBack}>
                ←{" "}
                <span>
                  {from.value}
                  {from.unit} · {from.label}
                </span>
              </button>
            </span>
          ) : null}
          Проект · {project.duration}
        </>
      }
      title={project.title}
      lede={project.short}
    >
      <div className="kv">
        <span className="kv__item">
          <b>Срок</b>
          {project.duration}
        </span>
        <span className="kv__item">
          <b>Тип</b>
          {scaleLabel[project.scale]}
        </span>
        <span className="kv__item">
          <b>Шагов в плане</b>
          {project.steps.length}
        </span>
      </div>

      <div className="value-box">
        <b>Ценность</b>
        <p>{project.value}</p>
      </div>

      <Block n="01" title="Что это и зачем">
        <p style={{ fontSize: "15.5px", color: "var(--txt-2)", maxWidth: "70ch" }}>
          {project.description}
        </p>
        {project.link && (
          <div className="ready-card__acts" style={{ marginTop: 20 }}>
            {project.link.url === "#" ? (
              <span className="btn btn--ghost btn--soon">
                <External /> {project.link.note}
              </span>
            ) : (
              <a className="btn btn--fill" href={project.link.url} target="_blank" rel="noreferrer">
                <External /> {project.link.label}
              </a>
            )}
          </div>
        )}
      </Block>

      {project.risk && (
        <div className="risk-box">
          <b>Главный риск</b>
          <p>{project.risk}</p>
        </div>
      )}

      <Block n="02" title="Из чего состоит" hint="По порядку, в сроках реализации">
        <div className="steps">
          {project.steps.map((s, i) => (
            <motion.div
              className="step"
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step__n">{i + 1}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Block>

      {project.roles && (
        <Block n="03" title="Состав отдела" hint="Роль · зона ответственности · своя цифра">
          <div className="roles glass glass--flat" style={{ background: "rgba(255,255,255,0.035)" }}>
            {project.roles.map((r) => (
              <div className="role" key={r.name}>
                <div>
                  <div className="role__n">{r.name}</div>
                  <div className="role__j">{r.job}</div>
                </div>
                <span className="role__m">{r.metric}</span>
              </div>
            ))}
          </div>
        </Block>
      )}

      <Block n={project.roles ? "04" : "03"} title="Примеры">
        <div className="bullets">
          {project.examples.map((e) => (
            <div className="bullet" key={e}>
              <Dot className="bullet__i" />
              <span>{e}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block n={project.roles ? "05" : "04"} title="Что замеряем">
        <div className="pills">
          {project.kpi.map((k) => (
            <span className="pill" key={k}>
              {k}
            </span>
          ))}
        </div>
      </Block>

      <Block n={project.roles ? "06" : "05"} title="На какие результаты влияет">
        <div className="backlinks">
          {feeds.map((f) => (
            <button className="backlink" key={f.result.id} onClick={() => onPickResult(f.result.id)}>
              {f.result.value}
              {f.result.unit} {f.result.label} · {f.weight}% <ArrowRight />
            </button>
          ))}
        </div>
      </Block>
    </Sheet>
  );
}
