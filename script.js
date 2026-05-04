const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");
const dateInput = document.querySelector("#date");

if (window.lucide) {
  window.lucide.createIcons();
}

if (dateInput) {
  const today = new Date();
  const isoDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  dateInput.min = isoDate;
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const guests = formData.get("guests");
  const date = formData.get("date");
  const time = formData.get("time");

  formMessage.textContent = `Thanks, ${name}. Your table for ${guests} is requested for ${date} at ${time}.`;
  bookingForm.reset();

  if (dateInput) {
    const today = new Date();
    dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  }
});
