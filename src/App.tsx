import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  cadence,
  okrs,
  projectById,
  projects,
  results,
  spotlight,
  type Project,
  type Result,
} from "./data/offer";
import { Scene } from "./components/Scene";
import { TopBar } from "./components/TopBar";
import { Reveal } from "./components/Reveal";
import { SpotCard } from "./components/Spotlight";
import { ResultSheet } from "./components/ResultSheet";
import { ProjectSheet } from "./components/ProjectSheet";
import { ArrowRight } from "./components/Icons";
import logo from "./assets/elite-house-logo.svg";

const spotIds = new Set(spotlight.map((s) => s.projectId));

export default function App() {
  /** Funnel state: a result opens level 1, a project stacks level 2 on top. */
  const [result, setResult] = useState<Result | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const open = Boolean(result || project);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const closeAll = useCallback(() => {
    setProject(null);
    setResult(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (project) setProject(null);
      else if (result) setResult(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, result]);

  const org = projectById("org-okr");
  /** Everything the spotlight already covers is not repeated in the grid. */
  const rest = projects.filter((p) => !spotIds.has(p.id));

  return (
    <>
      <Scene />
      <TopBar />

      <main className="page">
        {/* --------------------------------------------------- результаты */}
        <section className="section section--first" id="results">
          <div className="shell">
            <Reveal y={16}>
              <span className="eyebrow">
                <span className="eyebrow__dot" />
                Elite House · Бишкек
              </span>
              <h2 className="h-lead">
                Результаты, которые <span className="grad-num">обещаю</span>.
              </h2>
              <p className="lede">
                Нажмите на любую цифру — внутри проекты, из которых она
                складывается, с процентом влияния каждого.
              </p>
            </Reveal>

            <div className="results">
              {results.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06}>
                  <button className="glass glass--tap rcard" onClick={() => setResult(r)}>
                    <div className="rcard__top">
                      <span className="rcard__num grad-num">
                        {r.value}
                        <span className="rcard__unit">{r.unit}</span>
                      </span>
                      <span className="rcard__horizon">{r.horizon}</span>
                    </div>
                    <div>
                      <div className="rcard__label">{r.label}</div>
                      <div className="rcard__sub">{r.sub}</div>
                    </div>
                    <p className="rcard__plain">{r.plain}</p>
                    <div className="rcard__foot">
                      <span className="rcard__cta">
                        Из чего складывается <ArrowRight />
                      </span>
                      <span className="rcard__count">{r.mix.length} проектов</span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* ------------------------------------------------- главное */}
            <div className="spot-intro">
              <Reveal y={16}>
                <span className="eyebrow">
                  <span className="eyebrow__dot" />
                  Главное
                </span>
                <h2 className="h-sect">Приложение, сайт и МБАНК.</h2>
                <p className="lede">
                  Первые два можно открыть прямо сейчас. Третий — договорённость,
                  которой нет ни у одного конкурента.
                </p>
              </Reveal>
            </div>

            <div className="spots">
              {spotlight.map((s, i) => (
                <SpotCard
                  key={s.projectId}
                  spot={s}
                  project={projectById(s.projectId)}
                  index={i}
                  onOpen={() => setProject(projectById(s.projectId))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ проекты */}
        <section className="section" id="projects">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow__dot" />
                Остальные проекты
              </span>
              <h2 className="h-sect">Из чего ещё складываются цифры.</h2>
              <p className="lede">
                В каждом — состав, сроки, примеры и что замеряем.
              </p>
            </Reveal>

            <div className="pgrid">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 0.05}>
                  <button className="glass glass--tap pcard" onClick={() => setProject(p)}>
                    <div className="pcard__head">
                      <span className={p.scale === "big" ? "tag tag--big" : "tag"}>
                        {p.scale === "big" ? "Крупный проект" : "Проект"}
                      </span>
                      <span className="pcard__time">{p.duration}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p className="pcard__short">{p.short}</p>
                    <span className="pcard__foot">
                      Раскрыть <ArrowRight />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ команда */}
        <section className="section" id="team">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow__dot" />
                Управление командой
              </span>
              <h2 className="h-sect">Отдел на 7 человек, спринты и OKR.</h2>
              <p className="lede">
                У каждого одна зона ответственности и одна цифра. Результат
                виден каждые две недели.
              </p>
            </Reveal>

            <div className="team-grid">
              <Reveal>
                <div className="glass roles">
                  {org.roles?.map((r) => (
                    <div className="role" key={r.name}>
                      <div>
                        <div className="role__n">{r.name}</div>
                        <div className="role__j">{r.job}</div>
                      </div>
                      <span className="role__m">{r.metric}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="glass cadence">
                  {cadence.map((c) => (
                    <div className="cadence__row" key={c.title}>
                      <span className="cadence__dot" />
                      <div>
                        <h4>{c.title}</h4>
                        <p>{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div style={{ marginTop: 40 }}>
                <span className="eyebrow">
                  <span className="eyebrow__dot" /> OKR на первый квартал
                </span>
                <h2 className="h-sect">Три цели, у каждой три цифры.</h2>
              </div>
            </Reveal>

            <div className="okrs">
              {okrs.map((o, i) => (
                <Reveal key={o.objective} delay={i * 0.06}>
                  <div className="glass okr">
                    <div className="okr__o">
                      <span className="okr__badge">O{i + 1}</span>
                      <h4>{o.objective}</h4>
                    </div>
                    <div className="okr__krs">
                      {o.krs.map((kr, k) => (
                        <div className="okr__kr" key={kr}>
                          <b>KR{k + 1}</b>
                          <span>{kr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- закрытие */}
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="shell">
            <Reveal>
              <div className="glass closing">
                <span className="eyebrow">
                  <span className="eyebrow__dot" /> Коротко
                </span>
                <h2>
                  Первые результаты — <span className="grad-num">через 2 недели</span>.
                </h2>
                <p>
                  Начинаем с перераспределения бюджета: это самый быстрый рычаг.
                  Дальше — МБАНК, аналитика и структура отдела. Каждая цифра
                  выше разложена на проекты и сроки.
                </p>
                <button
                  className="btn btn--fill btn--wide"
                  onClick={() => setResult(results[0])}
                >
                  Открыть первую цифру <ArrowRight />
                </button>
              </div>
            </Reveal>

            <div className="foot">
              <img src={logo} alt="Elite House" />
              <span>
                Предложение по маркетингу · Бишкек · {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------------------------------------------- воронка */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {project ? (
          <div className="sheet-wrap" key="project" onClick={closeAll}>
            <ProjectSheet
              project={project}
              from={result}
              onClose={closeAll}
              onBack={result ? () => setProject(null) : undefined}
              onPickResult={(id) => {
                setProject(null);
                setResult(results.find((r) => r.id === id) ?? null);
              }}
            />
          </div>
        ) : result ? (
          <div className="sheet-wrap" key="result" onClick={closeAll}>
            <ResultSheet
              result={result}
              onClose={closeAll}
              onPickProject={(id) => setProject(projectById(id))}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
