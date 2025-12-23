// --------------------
// Mobile menu
// --------------------
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

// --------------------
// Footer year
// --------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --------------------
// Compare section (tabs + image switch)
// --------------------
const compareData = {
  sourdough: {
    title: "Sourdough",
    img: "assets/sourdough.jpg",
    alt: "Sourdough loaf",
    desc: "Our signature sourdough is naturally leavened using a 100-year-old starter culture.",
    list: [
      "24-hour natural fermentation",
      "Tangy, complex flavor",
      "Crispy crust, chewy interior",
      "Easier to digest",
      "Long shelf life"
    ]
  },
  artisan: {
    title: "Artisan White",
    img: "assets/artisan-white.jpg",   // make sure this file exists in assets
    alt: "Artisan white bread",
    desc: "Soft, lightly crusted, and perfect for everyday enjoyment.",
    list: [
      "Soft, airy crumb",
      "Mild, comforting flavor",
      "Great for sandwiches",
      "Baked fresh daily",
      "Family favorite"
    ]
  }
};

const tabs = document.querySelectorAll(".tab");
const compareImg = document.getElementById("compareImg");
const compareTitle = document.getElementById("compareTitle");
const compareDesc = document.getElementById("compareDesc");
const compareList = document.getElementById("compareList");

function renderCompare(key) {
  const d = compareData[key];
  if (!d) return;

  if (compareImg) {
    compareImg.src = d.img;
    compareImg.alt = d.alt;
  }
  if (compareTitle) compareTitle.textContent = d.title;
  if (compareDesc) compareDesc.textContent = d.desc;

  if (compareList) {
    compareList.innerHTML = "";
    d.list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      compareList.appendChild(li);
    });
  }
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    renderCompare(tab.dataset.tab);
  });
});

// --------------------
// Contact form validation (email warning)
// --------------------
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function showError(fieldName, message) {
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (error) error.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    if (successMsg) successMsg.textContent = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    if (name.length < 2) {
      showError("name", "Please enter your name.");
      valid = false;
    }

    if (!email) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address (example@domain.com).");
      valid = false;
    }

    // you wanted 1 character minimum
    if (message.length < 1) {
      showError("message", "Please write a message.");
      valid = false;
    }

    if (valid) {
      if (successMsg) successMsg.textContent = "✅ Message ready! (No server connected.)";
      form.reset();
    }
  });
}

// Scroll-based animation controller (IntersectionObserver)
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));
