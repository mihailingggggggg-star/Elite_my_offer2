/** Static, GPU-cheap backdrop the glass has something to refract. */
export function Scene() {
  return (
    <div className="scene" aria-hidden>
      <div className="scene__blob scene__blob--a" />
      <div className="scene__blob scene__blob--b" />
      <div className="scene__blob scene__blob--c" />
      <div className="scene__grid" />
      <div className="scene__grain" />
    </div>
  );
}
