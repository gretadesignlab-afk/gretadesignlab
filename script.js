document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CURSORE PERSONALIZZATO
  ========================= */

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  /* =========================
     MACCHIA
  ========================= */

  const macchia = document.createElement("div");
  macchia.className = "macchia";
  document.body.appendChild(macchia);

  let stainX = window.innerWidth / 2;
  let stainY = window.innerHeight / 2;
  let targetStainX = stainX;
  let targetStainY = stainY;

  document.addEventListener("mousemove", (e) => {
    targetStainX = e.clientX;
    targetStainY = e.clientY;
  });

  function animateMacchia() {
    stainX += (targetStainX - stainX) * 0.055;
    stainY += (targetStainY - stainY) * 0.055;

    macchia.style.left = `${stainX}px`;
    macchia.style.top = `${stainY}px`;

    requestAnimationFrame(animateMacchia);
  }

  animateMacchia();


  /* =========================
     HOVER INTERACTION
  ========================= */

  const interactiveElements = document.querySelectorAll(
    "a, button, .service-row, .portfolio-category, .contact-item, .floating-word"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });

  });


  /* =========================
     PAROLE FLOTTANTI
  ========================= */

  const floatingWords = document.querySelectorAll(".floating-word");

  floatingWords.forEach((word) => {

    word.addEventListener("mousemove", (e) => {

      const rect = word.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      word.style.transform = `
        translate(${x * 0.25}px, ${y * 0.25}px)
        rotate(${x * 0.02}deg)
      `;

    });

    word.addEventListener("mouseleave", () => {
      word.style.transform = "translate(0, 0) rotate(0)";
    });

  });

  /* =========================
     TRANSIZIONE TRA PAGINE
  ========================= */

  const transition = document.querySelector(".page-transition");

  const pageLinks = document.querySelectorAll(
    'a[href$=".html"], a[href*=".html#"]'
  );

  pageLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      const href = link.getAttribute("href");

      if (!href || href.startsWith("http")) {
        return;
      }

      e.preventDefault();

      if (!transition) {
        window.location.href = href;
        return;
      }

      let label = "GRETA DESIGN LAB";

      if (href.includes("portfolio")) {
        label = "PORTFOLIO";
      }

      if (href.includes("chi-sono")) {
        label = "CHI SONO";
      }

      if (href.includes("contatti")) {
        label = "CONTATTI";
      }

      if (href.includes("index")) {
        label = "HOME";
      }

      const transitionName =
        transition.querySelector(".transition-name");

      if (transitionName) {
        transitionName.textContent = label;
      }

      transition.classList.add("active");

      sessionStorage.setItem(
        "gdl-transition",
        "true"
      );

      setTimeout(() => {
        window.location.href = href;
      }, 800);

    });

  });


  /* =========================
     ENTRATA NELLA NUOVA PAGINA
  ========================= */

  const comingFromPage =
    sessionStorage.getItem("gdl-transition");

  if (comingFromPage && transition) {

    sessionStorage.removeItem("gdl-transition");

    const transitionName =
      transition.querySelector(".transition-name");

    if (transitionName) {
      transitionName.style.opacity = "1";
      transitionName.style.transform = "translateY(0)";
    }

    transition.style.opacity = "1";
    transition.style.visibility = "visible";

    transition.classList.add("revealing");

    setTimeout(() => {

      if (transitionName) {
        transitionName.style.opacity = "0";
        transitionName.style.transform = "translateY(-20px)";
      }

      transition.classList.remove("revealing");

      transition.style.opacity = "0";
      transition.style.visibility = "hidden";

    }, 750);

  }

  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(
    ".portfolio-section, .about-story, .about-manifesto, .about-final, .contact-details, .contact-final"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition =
      "opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1)";

    observer.observe(element);

  });


});

 
const ideaForm = document.getElementById("ideaForm");

if (ideaForm) {
  const ideaButton = document.getElementById("ideaSubmit");
  const ideaBox = document.getElementById("ideaBox");
  const ideaPlane = document.getElementById("ideaPlane");
    const ideaNote = ideaForm;

  function prepareIdeaFlight() {
    const planeRect = ideaPlane.getBoundingClientRect();
    const noteRect = ideaNote.getBoundingClientRect();
    const boxRect = ideaBox.getBoundingClientRect();

    const startX = noteRect.left + noteRect.width * 0.8;
    const startY = noteRect.top + noteRect.height * 0.65;

    const endX = boxRect.left + boxRect.width * 0.55;
    const endY = boxRect.top + boxRect.height * 0.18;
    const workspaceRect = ideaNote.parentElement.getBoundingClientRect();

ideaPlane.style.left = `${startX - workspaceRect.left - planeRect.width / 2}px`;
ideaPlane.style.top = `${startY - workspaceRect.top - planeRect.height / 2}px`;
    

    ideaPlane.style.setProperty("--flight-x1", `${(endX - startX) * 0.35}px`);
    ideaPlane.style.setProperty("--flight-y1", `${(endY - startY) * 0.35 - 80}px`);
    ideaPlane.style.setProperty("--flight-x2", `${(endX - startX) * 0.7}px`);
    ideaPlane.style.setProperty("--flight-y2", `${(endY - startY) * 0.7 - 35}px`);
    ideaPlane.style.setProperty("--flight-x3", `${endX - startX}px`);
    ideaPlane.style.setProperty("--flight-y3", `${endY - startY}px`);
  }
  const ideaStatus = document.getElementById("ideaStatus");

  ideaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!ideaForm.reportValidity()) return;

    ideaButton.disabled = true;
    ideaButton.textContent = "La tua idea è in viaggio...";
    ideaStatus.textContent = "";
 

    try {
      const response = await fetch(ideaForm.action, {
        method: "POST",
        body: new FormData(ideaForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Invio non riuscito");
      }

      ideaForm.reset();
      ideaForm.classList.add("idea-sent");
      ideaBox.classList.add("idea-received");
      ideaPlane.classList.remove("idea-flying");
      ideaPlane.style.opacity = "1";
      prepareIdeaFlight();
      void ideaPlane.offsetWidth;
      ideaPlane.classList.add("idea-flying");
      ideaStatus.textContent =
        "Idea ricevuta. Vediamo dove ci porta.";
      ideaButton.textContent = "Biglietto consegnato ✓";
    } catch (error) {
      ideaStatus.textContent =
        "Ops, il biglietto non è partito. Riprova tra poco.";
      ideaButton.textContent = "Riprova a inviare ↗";
      ideaButton.disabled = false;
    }
  });
}

