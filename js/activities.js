// GANTI data placeholder dengan kegiatan asli. Foto di assets/activities/
const ACTIVITIES = [
  { title: "[Judul Kegiatan 1]", description: "[Deskripsi singkat, misal proses produksi]", date: "", image: "assets/activities/kegiatan-1.jpg" },
  { title: "[Judul Kegiatan 2]", description: "[Deskripsi singkat, misal proses finishing]", date: "", image: "assets/activities/kegiatan-2.jpg" },
  { title: "[Judul Kegiatan 3]", description: "[Deskripsi singkat, misal packing pesanan]", date: "", image: "assets/activities/kegiatan-3.jpg" },
  { title: "[Judul Kegiatan 4]", description: "[Deskripsi singkat, misal pengiriman]", date: "", image: "assets/activities/kegiatan-4.jpg" }
];
document.addEventListener("DOMContentLoaded", () => {
  const c = $("#activityCarousel"); if (!c) return;
  c.classList.add("p3");
  initCarousel(c, ACTIVITIES, a => h("article", { class: "card acard" }, h("img", { src: ROOT + a.image, alt: a.title, loading: "lazy" }),
    h("div", { class: "cbody" }, h("h3", {}, a.title), h("p", {}, a.description), a.date ? h("small", {}, a.date) : "")), 7000);
});
