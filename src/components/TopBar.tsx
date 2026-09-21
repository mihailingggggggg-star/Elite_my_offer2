import { motion, useScroll, useSpring } from "framer-motion";
import logo from "../assets/elite-house-logo.svg";
import { ArrowRight } from "./Icons";

export function TopBar() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <header className="topbar">
      <div className="glass glass--pill topbar__in">
        <a className="topbar__logo" href="#top">
          <img src={logo} alt="Elite House" />
          <span className="topbar__tag">Маркетинг</span>
        </a>
        <a className="topbar__jump" href="#projects">
          Проекты <ArrowRight />
        </a>
        <motion.div className="topbar__progress" style={{ scaleX: bar }} />
      </div>
    </header>
  );
}
