// เพิ่ม class ให้ body เพื่อเปิดใช้เอฟเฟ็กต์ที่พึ่ง JavaScript
document.body.classList.add("js-ready");

// เลือก element ที่ต้องใช้งานบ่อย
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const yearTarget = document.querySelector("#current-year");

// อัปเดตปีปัจจุบันใน footer อัตโนมัติ
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

// เปิด-ปิดเมนูบนหน้าจอมือถือ
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navMenu.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// เมื่อกดเมนูแล้ว ให้ปิดเมนูมือถืออัตโนมัติ
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("is-open");
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ทำ animation ให้ section ค่อย ๆ ปรากฏตอนเลื่อนถึง
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.22,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // เปลี่ยนสถานะเมนูให้ active ตาม section ที่กำลังดูอยู่
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
