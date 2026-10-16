// PENTING: data di bawah hanya PLACEHOLDER. Ganti dengan ulasan ASLI (mis. dari Shopee).
// Opsional: tambahkan screenshot ulasan asli dengan field  screenshot: "assets/reviews/nama.jpg"
const REVIEWS = [
  { name: "[NAMA CUSTOMER]", rating: 5, review: "[ULASAN CUSTOMER]", source: "Shopee" },
  { name: "[NAMA CUSTOMER]", rating: 5, review: "[ULASAN CUSTOMER]", source: "Shopee" },
  { name: "[NAMA CUSTOMER]", rating: 5, review: "[ULASAN CUSTOMER]", source: "Shopee" }
];
document.addEventListener("DOMContentLoaded", () => {
  const c = $("#reviewCarousel"); if (!c) return;
  c.classList.add("p2");
  initCarousel(c, REVIEWS, r => h("article", { class: "card rcard" },
    h("div", { class: "stars", "aria-label": r.rating + " dari 5 bintang" }, "★".repeat(r.rating) + "☆".repeat(5 - r.rating)),
    h("q", {}, r.review), h("strong", {}, r.name), h("br"), h("small", {}, "Customer Madani Printing · " + r.source),
    r.screenshot ? h("img", { src: ROOT + r.screenshot, alt: "Screenshot ulasan " + r.name, loading: "lazy" }) : ""), 7000);
});
