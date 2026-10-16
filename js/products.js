// =====================================================
// DATA PRODUK
// =====================================================
// Tambah produk dengan menyalin salah satu objek di bawah.
// Gambar produk diletakkan di: assets/products/
//
// Ukuran, bahan, dan finishing:
// - Isi jika data sudah pasti.
// - Kosongkan ("") jika belum ada data.
// =====================================================

const PRODUCTS = [
    {
        id: 1,
        name: "Spanduk",
        category: "Spanduk",
        image: "assets/products/spanduk.jpg",
        description: "Spanduk untuk kebutuhan promosi dan informasi.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 2,
        name: "Kartu Nama",
        category: "Perkantoran",
        image: "assets/products/kartu-nama.jpg",
        description: "Kartu nama untuk identitas profesional Anda.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 3,
        name: "Brosur",
        category: "Promosi",
        image: "assets/products/brosur.jpg",
        description: "Brosur untuk promosi produk dan layanan.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 4,
        name: "Flyer",
        category: "Promosi",
        image: "assets/products/flyer.jpg",
        description: "Flyer untuk promosi acara dan penawaran.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 5,
        name: "Banner",
        category: "Spanduk",
        image: "assets/products/banner.jpg",
        description: "Banner untuk promosi dan dekorasi.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 6,
        name: "Sticker",
        category: "Lainnya",
        image: "assets/products/sticker.jpg",
        description: "Sticker untuk label, branding, dan promosi.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 7,
        name: "Kalender",
        category: "Percetakan",
        image: "assets/products/kalender.jpg",
        description: "Kalender untuk hadiah dan promosi.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 8,
        name: "Nota",
        category: "Perkantoran",
        image: "assets/products/nota.jpg",
        description: "Nota untuk kebutuhan administrasi usaha.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 9,
        name: "Buku",
        category: "Percetakan",
        image: "assets/products/buku.jpg",
        description: "Cetak buku untuk berbagai kebutuhan.",
        featured: false,
        sizes: "",
        materials: "",
        finishing: ""
    },

    {
        id: 10,
        name: "Packaging",
        category: "Packaging",
        image: "assets/products/packaging.jpg",
        description: "Kemasan cetak untuk produk Anda.",
        featured: true,
        sizes: "",
        materials: "",
        finishing: ""
    }
];


// =====================================================
// PLACEHOLDER
// =====================================================

const PH = "[Hubungi kami via WhatsApp untuk informasi]";


// =====================================================
// PESAN WHATSAPP PRODUK
// =====================================================

function productMsg(product) {

    return `Halo Madani Printing, saya ingin menanyakan produk ${product.name}. Mohon informasi harga, ukuran, bahan, dan detail pemesanannya.`;

}


// =====================================================
// PRODUCT CARD
// =====================================================

function productCard(product) {

    return h(
        "article",
        {
            class: "card pcard"
        },

        h(
            "img",
            {
                src: ROOT + product.image,
                alt: `${product.name} - Madani Printing`,
                loading: "lazy"
            }
        ),

        h(
            "div",
            {
                class: "cbody"
            },

            h(
                "span",
                {
                    class: "tag"
                },
                product.category
            ),

            h(
                "h3",
                {},
                product.name
            ),

            h(
                "p",
                {},
                product.description
            ),

            h(
                "div",
                {
                    class: "row"
                },

                h(
                    "button",
                    {
                        class: "btn sm",
                        onclick: () => openProduct(product)
                    },
                    "Lihat Produk"
                ),

                waBtn(
                    productMsg(product),
                    `WhatsApp ${product.name}`
                )
            )
        )
    );
}


// =====================================================
// DETAIL PRODUK / MODAL
// =====================================================

function openProduct(product) {

    const modal = overlay(
        "",

        h(
            "div",
            {
                class: "mbox"
            },

            h(
                "button",
                {
                    class: "x",
                    "aria-label": "Tutup"
                },
                "×"
            ),

            h(
                "img",
                {
                    src: ROOT + product.image,
                    alt: product.name
                }
            ),

            h(
                "div",
                {
                    class: "minfo"
                },

                h(
                    "span",
                    {
                        class: "tag"
                    },
                    product.category
                ),

                h(
                    "h2",
                    {},
                    product.name.toUpperCase()
                ),

                h(
                    "p",
                    {},
                    product.description
                ),

                h(
                    "dl",
                    {},

                    h(
                        "dt",
                        {},
                        "Pilihan Ukuran"
                    ),

                    h(
                        "dd",
                        {},
                        product.sizes || PH
                    ),

                    h(
                        "dt",
                        {},
                        "Pilihan Bahan"
                    ),

                    h(
                        "dd",
                        {},
                        product.materials || PH
                    ),

                    h(
                        "dt",
                        {},
                        "Finishing"
                    ),

                    h(
                        "dd",
                        {},
                        product.finishing || PH
                    ),

                    h(
                        "dt",
                        {},
                        "Informasi Pemesanan"
                    ),

                    h(
                        "dd",
                        {},
                        "Hubungi kami via WhatsApp untuk harga dan detail pemesanan."
                    )
                ),

                h(
                    "button",
                    {
                        class: "btn",
                        onclick: () => openWhatsApp(productMsg(product))
                    },
                    "Tanya Harga via WhatsApp"
                )
            )
        )
    );


    $(".x", modal.m).addEventListener(
        "click",
        modal.close
    );
}


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------
    // CAROUSEL PRODUK UNGGULAN
    // -------------------------------------------------

    const productCarousel = $("#productCarousel");

    if (productCarousel) {

        const featuredProducts = PRODUCTS.filter(
            product => product.featured
        );

        initCarousel(
            productCarousel,
            featuredProducts,
            productCard
        );
    }


    // -------------------------------------------------
    // PRODUCT GRID
    // -------------------------------------------------

    const productGrid = $("#productGrid");

    if (!productGrid) {
        return;
    }


    let currentCategory = "Semua";
    let searchQuery = "";


    const categories = [
        "Semua",
        "Spanduk",
        "Promosi",
        "Perkantoran",
        "Packaging",
        "Percetakan",
        "Lainnya"
    ];


    const categoryFilters = $("#catFilters");


    // -------------------------------------------------
    // RENDER PRODUCT GRID
    // -------------------------------------------------

    function renderProducts() {

        $$(
            "button",
            categoryFilters
        ).forEach(button => {

            button.classList.toggle(
                "on",
                button.textContent === currentCategory
            );

        });


        const filteredProducts = PRODUCTS.filter(product => {

            const matchCategory =
                currentCategory === "Semua" ||
                product.category === currentCategory;


            const searchText = (
                product.name +
                product.description
            ).toLowerCase();


            const matchSearch =
                searchText.includes(searchQuery);


            return matchCategory && matchSearch;

        });


        productGrid.replaceChildren(

            ...(filteredProducts.length

                ? filteredProducts.map(productCard)

                : [
                    h(
                        "p",
                        {},
                        "Produk tidak ditemukan."
                    )
                ]

            )

        );
    }


    // -------------------------------------------------
    // CATEGORY FILTER
    // -------------------------------------------------

    categories.forEach(category => {

        categoryFilters.append(

            h(
                "button",
                {
                    onclick: () => {

                        currentCategory = category;

                        renderProducts();

                    }
                },
                category
            )

        );

    });


    // -------------------------------------------------
    // SEARCH
    // -------------------------------------------------

    $("#search").addEventListener(
        "input",
        event => {

            searchQuery = event.target.value
                .trim()
                .toLowerCase();

            renderProducts();

        }
    );


    // Initial render
    renderProducts();

});