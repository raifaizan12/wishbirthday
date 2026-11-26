/* ============================================================
   control.js - public site ka remote lock + remote settings
   - Site khulne se pehle remote config check karta hai
   - Locked ho to sirf lock screen dikhata hai (script.js load hi nahi hoti)
   - Har 10 sec baad dobara check karta hai, isliye lock/unlock LIVE kaam karta hai
   - Remote se bhi na mile (net issue / setup nahi) to site normal chalti hai
   ============================================================ */
(function () {
  "use strict";
  var cfg = window.CTL_CONFIG || {};
  var DB = String(cfg.dbUrl || "").replace(/\/+$/, "");
  var POLL_MS = 10000, TIMEOUT_MS = 3000;
  var DEFAULT_MSG = "Website locked / closed by developer.\nPlease contact the developer.";
  var booted = false, lockedNow = false;

  function loadSite() {
    if (booted) return; booted = true;
    var s = document.createElement("script");
    s.src = "script.js"; s.async = false;
    document.body.appendChild(s);
  }

  /* resolves: object (data, {} if empty) | false (network/setup problem) */
  function getRemote() {
    if (!DB) return Promise.resolve(false);
    var req = fetch(DB + "/site.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : false; })
      .then(function (d) { return (d && typeof d === "object") ? d : {}; })
      .catch(function () { return false; });
    var to = new Promise(function (res) { setTimeout(function () { res(false); }, TIMEOUT_MS); });
    return Promise.race([req, to]);
  }

  function showLock(d) {
    var id = "ctl-lock";
    if (document.getElementById(id)) return;
    var msg = (typeof d.lockMessage === "string" && d.lockMessage.trim()) ? d.lockMessage : DEFAULT_MSG;
    var num = String(d.contact || cfg.devWhatsapp || "").replace(/\D/g, "");

    var o = document.createElement("div");
    o.id = id;
    o.setAttribute("role", "alertdialog");
    o.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;" +
      "padding:24px;text-align:center;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
      "background:radial-gradient(circle at 30% 20%,#2a0a3d,#0b0618 70%)";
    var box = document.createElement("div");
    box.style.cssText = "max-width:420px;width:100%";
    var ic = document.createElement("div");
    ic.textContent = "\uD83D\uDD12"; ic.style.cssText = "font-size:64px;margin-bottom:12px";
    var h = document.createElement("h1");
    h.textContent = "Website Locked"; h.style.cssText = "margin:0 0 12px;font-size:28px;color:#FF4FA3";
    var p = document.createElement("p");
    p.textContent = msg; p.style.cssText = "margin:0 0 22px;font-size:17px;line-height:1.6;white-space:pre-line;opacity:.92";
    box.appendChild(ic); box.appendChild(h); box.appendChild(p);
    if (num) {
      var a = document.createElement("a");
      a.href = "https://wa.me/" + num; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "Contact Developer";
      a.style.cssText = "display:inline-block;padding:12px 26px;border-radius:999px;background:linear-gradient(135deg,#FF4FA3,#9B5CFF);" +
        "color:#fff;text-decoration:none;font-weight:600";
      box.appendChild(a);
    }
    o.appendChild(box);
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";

    /* overlay hata do to wapas laga do (casual devtools se bachne ke liye) */
    new MutationObserver(function () {
      if (lockedNow && !document.getElementById(id)) { document.body.appendChild(o); }
    }).observe(document.body, { childList: true });
  }

  function poll() {
    getRemote().then(function (d) {
      if (d === false) return;               /* network issue: kuch mat badlo */
      if (!!d.locked !== lockedNow) location.reload();  /* lock/unlock live apply */
    });
  }

  getRemote().then(function (d) {
    window.__REMOTE = d || {};
    lockedNow = !!(d && d.locked);
    if (lockedNow) showLock(d); else loadSite();
    if (DB) setInterval(poll, POLL_MS);
  });
})();
