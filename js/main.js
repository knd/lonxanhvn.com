/* Lon Xanh — landing interactions (vanilla JS, client-side only) */
(function () {
  "use strict";

  /* ---- Points/price board data (aluminium only) ----
     Currently hidden in index.html (upstream price not finalized).
     Update the values and uncomment the .receipt block to show the board. */
  var POINTS = [
    { name: "Nhôm lon (tính kg)", value: "56", unit: "điểm/kg", star: true },
    { name: "Nhôm phế liệu hỗn hợp", value: "45", unit: "điểm/kg", star: true },
    { name: "Cửa nhôm / nhôm định hình", value: "—", unit: "liên hệ" },
    { name: "Bảng hiệu nhôm / tấm alu", value: "—", unit: "liên hệ" },
    { name: "Nhôm lon (tính cái)", value: "0.7", unit: "điểm/cái" }
  ];

  function renderPoints() {
    var host = document.getElementById("pointsList");
    if (!host) return;
    var html = POINTS.map(function (p) {
      var zero = p.value === "0" ? " zero" : "";
      var star = p.star
        ? ' <span class="pt-star">Giá cao</span>'
        : "";
      return (
        '<div class="pt-row">' +
          '<span class="pt-name">' + p.name + star + "</span>" +
          '<span class="pt-dots"></span>' +
          '<span class="pt-val' + zero + '">' + p.value +
            ' <em>' + p.unit + "</em></span>" +
        "</div>"
      );
    }).join("");
    host.innerHTML = html;
  }

  /* ---- Sticky header shadow ---- */
  function initHeader() {
    var header = document.getElementById("header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  function initMenu() {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("navMenu");
    if (!burger || !menu) return;

    var toggle = function (open) {
      var isOpen = open != null ? open : !menu.classList.contains("open");
      menu.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    };

    burger.addEventListener("click", function () { toggle(); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) toggle(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggle(false);
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Footer year ---- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPoints();
    initHeader();
    initMenu();
    initReveal();
    initYear();
  });
})();
