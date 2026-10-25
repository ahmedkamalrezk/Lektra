// ===== Liquid Glass pointer light =====
// Apple's material reacts to light and touch. This is the web approximation:
// a soft specular highlight that follows the pointer/finger across glass
// controls. It only writes two custom properties, so it stays cheap.
(function () {
  var GLASS = ".round:not(.top),.chip,.plans,.cell,.row,.mcard,.dcard,.dchip," +
    ".dremind,.add,.btns button,.sback,.edots,.eok,.stab,.sresrow,.dp," +
    ".kseg button,.srow,.sbar";
  var target = null;
  var x = 0;
  var y = 0;
  var frame = 0;

  function paint() {
    frame = 0;
    if (!target || !target.isConnected) return;
    var r = target.getBoundingClientRect();
    if (!r.width || !r.height) return;
    target.style.setProperty("--mx", ((x - r.left) / r.width * 100).toFixed(1) + "%");
    target.style.setProperty("--my", ((y - r.top) / r.height * 100).toFixed(1) + "%");
  }

  function move(e) {
    var el = e.target && e.target.closest ? e.target.closest(GLASS) : null;
    if (!el) return;
    target = el;
    x = e.clientX;
    y = e.clientY;
    if (!frame) frame = window.requestAnimationFrame(paint);
  }

  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerdown", move, { passive: true });
  document.addEventListener("pointerleave", function () { target = null; }, true);
})();
