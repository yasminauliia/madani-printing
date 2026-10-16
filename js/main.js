// =====================================================
// KONFIGURASI WHATSAPP
// =====================================================
// Format nomor: 62xxxxxxxxxx
// Jangan gunakan tanda + atau angka 0 di awal.
//
// Contoh:
// 628123456789
// =====================================================

const WHATSAPP_NUMBER = "628XXXXXXXXXX";


// =====================================================
// WHATSAPP
// =====================================================

function openWhatsApp(message) {
    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener");
}


// =====================================================
// ROOT PATH
// =====================================================

const ROOT = document.body.dataset.root || "";


// =====================================================
// DOM HELPER
// =====================================================

const $ = (selector, element = document) => {
    return element.querySelector(selector);
};


const $$ = (selector, element = document) => {
    return [...element.querySelectorAll(selector)];
};


function h(tag, attrs = {}, ...children) {

    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attrs)) {

        if (key === "class") {
            element.className = value;
        }

        else if (key.startsWith("on")) {
            element.addEventListener(
                key.slice(2),
                value
            );
        }

        else {
            element.setAttribute(key, value);
        }
    }

    children
        .flat()
        .forEach(child => element.append(child));

    return element;
}


// =====================================================
// DOM CONTENT LOADED
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------
    // MOBILE MENU
    // -------------------------------------------------

    const burger = $(".burger");
    const menu = $(".menu");

    if (burger && menu) {

        burger.addEventListener("click", () => {

            const isOpen =
                menu.classList.toggle("open");

            burger.setAttribute(
                "aria-expanded",
                isOpen
            );
        });
    }


    // -------------------------------------------------
    // WHATSAPP BUTTON
    // -------------------------------------------------

    $$("[data-wa]").forEach(button => {

        button.addEventListener("click", () => {

            openWhatsApp(
                button.dataset.wa
            );

        });

    });


    // -------------------------------------------------
    // SCROLL REVEAL
    // -------------------------------------------------

    const observer =
        "IntersectionObserver" in window

            ? new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("in");

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            )

            : null;


    $$(".reveal").forEach(element => {

        if (observer) {
            observer.observe(element);
        }

        else {
            element.classList.add("in");
        }

    });


    // -------------------------------------------------
    // CONTACT FORM
    // -------------------------------------------------

    const contactForm = $("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const data =
                    Object.fromEntries(
                        new FormData(contactForm)
                    );

                const error =
                    $("#formErr");


                const nama =
                    (data.nama || "").trim();

                const wa =
                    (data.wa || "").trim();

                const email =
                    (data.email || "").trim();

                const pesan =
                    (data.pesan || "").trim();


                // Validasi nama dan pesan
                if (!nama || !pesan) {

                    error.textContent =
                        "Nama dan pesan wajib diisi.";

                    return;
                }


                // Validasi WhatsApp
                if (
                    !/^[0-9+\-\s]{8,20}$/.test(wa)
                ) {

                    error.textContent =
                        "Nomor WhatsApp tidak valid.";

                    return;
                }


                // Validasi email
                if (
                    email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ) {

                    error.textContent =
                        "Format email tidak valid.";

                    return;
                }


                error.textContent = "";


                const message =
                    `Halo Madani Printing, saya ${nama} ` +
                    `(WA: ${wa}` +
                    `${email ? ", email: " + email : ""}).\n\n` +
                    `${pesan}`;


                openWhatsApp(message);

            }
        );
    }

});


// =====================================================
// INFINITE CAROUSEL
// =====================================================
// Fitur:
// - Tombol Previous / Next
// - Swipe / scroll native
// - Auto slide
// - Infinite looping
// - Dots indicator
// - Responsive
// =====================================================

function initCarousel(
    root,
    items,
    build,
    auto = 6000
) {

    const track = $(".track", root);
    const dots = $(".dots", root);
    const nextButton = $(".next", root);
    const prevButton = $(".prev", root);


    // Tidak menjalankan carousel jika elemen
    // yang dibutuhkan tidak tersedia.
    if (
        !track ||
        !dots ||
        !nextButton ||
        !prevButton ||
        !items.length
    ) {
        return;
    }


    // -------------------------------------------------
    // BUAT PRODUK ASLI
    // -------------------------------------------------

    const originalItems = items.map(item => build(item));


    // -------------------------------------------------
    // CLONE ITEM
    // -------------------------------------------------
    // Clone membuat carousel bisa berputar
    // tanpa terlihat berhenti di produk terakhir.
    // -------------------------------------------------

    const beforeClones =
        items.map(item => build(item));

    const afterClones =
        items.map(item => build(item));


    track.replaceChildren(
        ...beforeClones,
        ...originalItems,
        ...afterClones
    );


    const totalItems = items.length;


    // Posisi awal berada di kumpulan produk asli.
    let currentIndex = totalItems;


    // Digunakan untuk mencegah event scroll
    // mengganggu perpindahan otomatis.
    let isMoving = false;


    // -------------------------------------------------
    // HITUNG JARAK ANTAR CARD
    // -------------------------------------------------

    function getStep() {

        const children = track.children;

        if (children.length < 2) {
            return track.clientWidth;
        }

        return (
            children[1].offsetLeft -
            children[0].offsetLeft
        );
    }


    // -------------------------------------------------
    // HITUNG JUMLAH CARD YANG TERLIHAT
    // -------------------------------------------------

    function getVisibleItems() {

        const firstCard =
            track.children[0];

        if (!firstCard) {
            return 1;
        }

        return Math.max(
            1,
            Math.round(
                track.clientWidth /
                firstCard.offsetWidth
            )
        );
    }


    // -------------------------------------------------
    // POSISI CARD
    // -------------------------------------------------

    function scrollToIndex(
        index,
        smooth = true
    ) {

        const step = getStep();

        track.scrollTo({
            left: index * step,
            behavior: smooth
                ? "smooth"
                : "auto"
        });
    }


    // -------------------------------------------------
    // POSISI DOT
    // -------------------------------------------------

    function getDotIndex() {

        return (
            currentIndex -
            totalItems
        ) % totalItems;
    }


    // -------------------------------------------------
    // UPDATE DOT
    // -------------------------------------------------

    function updateDots() {

        const visible =
            getVisibleItems();


        const totalPages =
            Math.ceil(
                totalItems / visible
            );


        const current =
            Math.floor(
                Math.max(
                    0,
                    getDotIndex()
                ) / visible
            );


        $$("button", dots).forEach(
            (button, index) => {

                button.classList.toggle(
                    "on",
                    index ===
                    Math.min(
                        current,
                        totalPages - 1
                    )
                );

            }
        );

    }


    // -------------------------------------------------
    // BUAT DOTS
    // -------------------------------------------------

    function createDots() {

        dots.replaceChildren();


        const visible =
            getVisibleItems();


        const totalPages =
            Math.ceil(
                totalItems / visible
            );


        for (
            let page = 0;
            page < totalPages;
            page++
        ) {

            const button = h(
                "button",
                {
                    "aria-label":
                        `Slide ${page + 1}`,

                    onclick: () => {

                        const target =
                            totalItems +
                            (
                                page *
                                visible
                            );

                        currentIndex =
                            target;

                        scrollToIndex(
                            currentIndex
                        );

                        updateDots();

                    }
                }
            );


            dots.append(button);
        }


        updateDots();
    }


    // -------------------------------------------------
    // NEXT
    // -------------------------------------------------

    function next() {

        if (isMoving) {
            return;
        }


        isMoving = true;

        currentIndex++;


        scrollToIndex(
            currentIndex,
            true
        );


        // Jika sudah melewati produk terakhir,
        // pindahkan kembali ke produk asli.
        if (
            currentIndex >=
            totalItems * 2
        ) {

            setTimeout(() => {

                currentIndex =
                    totalItems;

                scrollToIndex(
                    currentIndex,
                    false
                );

                isMoving = false;

                updateDots();

            }, 500);

        }

        else {

            setTimeout(() => {

                isMoving = false;

                updateDots();

            }, 500);

        }

    }


    // -------------------------------------------------
    // PREVIOUS
    // -------------------------------------------------

    function previous() {

        if (isMoving) {
            return;
        }


        isMoving = true;

        currentIndex--;


        scrollToIndex(
            currentIndex,
            true
        );


        // Jika sudah melewati produk pertama,
        // pindahkan ke clone terakhir.
        if (
            currentIndex <
            totalItems
        ) {

            setTimeout(() => {

                currentIndex =
                    totalItems * 2 - 1;

                scrollToIndex(
                    currentIndex,
                    false
                );

                isMoving = false;

                updateDots();

            }, 500);

        }

        else {

            setTimeout(() => {

                isMoving = false;

                updateDots();

            }, 500);

        }

    }


    // -------------------------------------------------
    // BUTTON EVENTS
    // -------------------------------------------------

    nextButton.addEventListener(
        "click",
        next
    );


    prevButton.addEventListener(
        "click",
        previous
    );


    // -------------------------------------------------
    // NATIVE SCROLL / SWIPE
    // -------------------------------------------------

    track.addEventListener(
        "scroll",
        () => {

            if (!isMoving) {

                requestAnimationFrame(
                    updateDots
                );

            }

        }
    );


    // -------------------------------------------------
    // RESIZE
    // -------------------------------------------------

    window.addEventListener(
        "resize",
        () => {

            createDots();

            scrollToIndex(
                currentIndex,
                false
            );

        }
    );


    // -------------------------------------------------
    // AUTO SLIDE
    // -------------------------------------------------

    let timer = null;


    function stopAutoSlide() {

        clearInterval(timer);

        timer = null;
    }


    function startAutoSlide() {

        stopAutoSlide();


        if (!auto) {
            return;
        }


        timer = setInterval(
            next,
            auto
        );

    }


    // Pause ketika mouse berada
    // di atas carousel.
    root.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    root.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    // Pause ketika user menyentuh carousel.
    root.addEventListener(
        "touchstart",
        stopAutoSlide,
        {
            passive: true
        }
    );


    root.addEventListener(
        "touchend",
        startAutoSlide,
        {
            passive: true
        }
    );


    // Pause ketika carousel mendapat fokus.
    root.addEventListener(
        "focusin",
        stopAutoSlide
    );


    root.addEventListener(
        "focusout",
        startAutoSlide
    );


    // -------------------------------------------------
    // INITIAL POSITION
    // -------------------------------------------------

    createDots();


    requestAnimationFrame(() => {

        scrollToIndex(
            currentIndex,
            false
        );

    });


    startAutoSlide();

}


// =====================================================
// WHATSAPP BUTTON COMPONENT
// =====================================================

function waBtn(message, label) {

    return h(
        "button",
        {
            class: "wa",
            "aria-label": label,
            onclick: () =>
                openWhatsApp(message)
        },
        "WA"
    );

}


// =====================================================
// MODAL / OVERLAY
// =====================================================

function overlay(className, ...children) {

    const modal = h(
        "div",
        {
            class:
                "modal " +
                className,
            role: "dialog",
            "aria-modal": "true"
        },
        ...children
    );


    // -------------------------------------------------
    // CLOSE MODAL
    // -------------------------------------------------

    const close = () => {

        modal.remove();

        document.removeEventListener(
            "keydown",
            handleKey
        );

    };


    // -------------------------------------------------
    // KEYBOARD
    // -------------------------------------------------

    const handleKey = event => {

        if (event.key === "Escape") {
            close();
        }

        if (modal.onkey) {
            modal.onkey(event);
        }

    };


    // -------------------------------------------------
    // CLICK OUTSIDE
    // -------------------------------------------------

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                close();
            }

        }
    );


    // -------------------------------------------------
    // APPEND
    // -------------------------------------------------

    document.addEventListener(
        "keydown",
        handleKey
    );


    document.body.append(modal);


    return {
        m: modal,
        close
    };

}