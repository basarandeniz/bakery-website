// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close menu after clicking a link (mobile)
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Compare tabs (interactive control)
const tabButtons = document.querySelectorAll(".tab");
const compareTitle = document.getElementById("compareTitle");
const compareDesc = document.getElementById("compareDesc");
const compareList = document.getElementById("compareList");

const compareData = {
  sourdough: {
    title: "Sourdough",
    desc: "Our signature sourdough is naturally leavened using a 100-year-old starter culture.",
    bullets: [
      "24-hour natural fermentation",
      "Tangy, complex flavor",
      "Crispy crust, chewy interior",
      "Easier to digest",
      "Long shelf life"
    ]
  },
  artisan: {
    title: "Artisan White",
    desc: "A classic white loaf with a soft crumb and golden crust — perfect for every day.",
    bullets: [
      "Light, airy texture",
      "Mild flavor and soft crumb",
      "Great for sandwiches",
      "Kid-friendly favorite",
      "Fresh-baked daily"
    ]
  }
};

function renderCompare(key){
  const d = compareData[key];
  compareTitle.textContent = d.title;
  compareDesc.textContent = d.desc;

  compareList.innerHTML = "";
  d.bullets.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    compareList.appendChild(li);
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderCompare(btn.dataset.tab);
  });
});

// Start with sourdough
renderCompare("sourdough");
