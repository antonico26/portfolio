const profile = {
  name: "Antonio Hidalgo Vicente",
  role: "Guionista y Filmmaker",
  email: "antoniohidalgovicente@gmail.com",
  phone: "600 00 00 00",
};

const images = {
  hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=82",
  contact: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=82",
};

const projects = [
  {
    slug: "la-procesion-de-las-animas",
    title: "La procesion de las animas",
    type: "Guion de largometraje",
    date: "Diciembre de 2023",
    role: "Guionista",
    sample: "Primeras paginas bajo solicitud",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    description:
      "Una propuesta de terror gotico con atmosfera rural, misterio familiar y una presencia sobrenatural que avanza como una procesion. La ficha queda preparada para sustituir sin esfuerzo la sinopsis, los creditos y las muestras reales de Antonio.",
    links: [],
  },
  {
    slug: "matthieu-six-dix",
    title: "Matthieu Six: Dix",
    type: "Cortometraje",
    date: "Noviembre de 2021",
    role: "Guion, produccion y apoyo artistico",
    sample: "Pieza audiovisual",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=82",
    description:
      "Cortometraje de terror construido desde la inventiva, la tension de pocos recursos y una puesta en escena directa. El detalle del proyecto permite enlazar una pieza publicada, un teaser o un dossier externo.",
    links: [
      {
        label: "Ver proyecto",
        url: "https://www.youtube.com/",
      },
    ],
  },
  {
    slug: "fotografias",
    title: "Fotografias",
    type: "Fotografia",
    date: "Serie abierta",
    role: "Fotografo",
    sample: "Seleccion editorial",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=82",
    description:
      "Seleccion visual pensada para reunir retratos, espacios, textura documental y ejercicios de mirada. La pagina funciona como escaparate para series analogicas, digitales o materiales de rodaje.",
    links: [],
  },
  {
    slug: "el-otro-lado-del-puente",
    title: "El otro lado del Puente",
    type: "Documental",
    date: "Mayo de 2022",
    role: "Guion, montaje y continuidad",
    sample: "Documental breve",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=82",
    description:
      "Proyecto documental centrado en territorio, memoria y comunidad. Esta ficha deja sitio para explicar el enfoque, las entrevistas, el proceso de montaje y los aprendizajes del rodaje.",
    links: [
      {
        label: "Ver documental",
        url: "https://www.youtube.com/",
      },
    ],
  },
  {
    slug: "bait",
    title: "BAIT",
    type: "Proyecto transmedia",
    date: "Mayo de 2023",
    role: "Codireccion, guion y montaje",
    sample: "Corto, podcast y contenidos extra",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&q=82",
    description:
      "Proyecto expandido con pieza audiovisual, audio, entrevistas y materiales complementarios. La estructura esta preparada para agrupar varios enlaces y ordenar las distintas partes del universo narrativo.",
    links: [
      {
        label: "Ver corto",
        url: "https://www.youtube.com/",
      },
      {
        label: "Escuchar podcast",
        url: "https://www.youtube.com/",
      },
    ],
  },
];

const app = document.querySelector("[data-app]");
const nav = document.querySelector("[data-site-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

function setDocumentTitle(label) {
  document.title = `${label} | ${profile.name}`;
}

function routeParts() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  return parts.length ? parts : ["inicio"];
}

function closeMenu() {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function updateActiveNav(route) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === route);
  });
}

function picture(src, alt) {
  return `<img src="${src}" alt="${alt}" loading="lazy">`;
}

function renderHome() {
  setDocumentTitle("Inicio");
  updateActiveNav("inicio");

  app.innerHTML = `
    <section class="page hero" aria-labelledby="home-title">
      <div class="hero-media">
        ${picture(images.hero, "Camara de cine y ambiente de rodaje en blanco y negro")}
      </div>
      <div class="hero-copy">
        <span class="eyebrow">${profile.name}</span>
        <h1 id="home-title">${profile.role}</h1>
        <p class="lead">
          Descubre mi portafolio, una ventana a mi recorrido creativo.
          Aqui encontraras proyectos que reflejan oficio, aprendizaje y dedicacion,
          desde el guion hasta la imagen final.
        </p>
        <div class="button-row">
          <a class="button" href="#/portfolio">Empieza ahora</a>
          <a class="button button--ghost" href="#/contacto">Contacto</a>
        </div>
      </div>
    </section>
  `;
}

function renderPortfolio() {
  setDocumentTitle("Portafolio");
  updateActiveNav("portfolio");

  app.innerHTML = `
    <section class="page" aria-labelledby="portfolio-title">
      <div class="page-heading">
        <h1 id="portfolio-title">Portafolio</h1>
        <p class="lead">
          Una ventana al viaje creativo de ${profile.name}. Proyectos de guion,
          cine, fotografia, documental y narrativa expandida.
        </p>
      </div>
      <div class="portfolio-grid">
        ${projects.map(projectCard).join("")}
      </div>
    </section>
  `;
}

function projectCard(project) {
  return `
    <button class="project-card" type="button" data-project="${project.slug}">
      <span class="project-cover" aria-hidden="true">
        ${picture(project.image, "")}
      </span>
      <span class="project-card__body">
        <span class="project-meta">${project.type}</span>
        <h2>${project.title}</h2>
        <p>${project.role}</p>
      </span>
    </button>
  `;
}

function renderProject(slug) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    renderNotFound();
    return;
  }

  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  setDocumentTitle(project.title);
  updateActiveNav("portfolio");

  app.innerHTML = `
    <article class="page detail" aria-labelledby="project-title">
      <div class="detail-cover">
        ${picture(project.image, project.title)}
      </div>
      <div class="detail-copy">
        <a class="back-link" href="#/portfolio" aria-label="Volver al portafolio">&larr; Portafolio</a>
        <span class="eyebrow">${project.type}</span>
        <h1 id="project-title">${project.title}</h1>
        <p class="description">${project.description}</p>
        <dl class="facts">
          <div class="fact">
            <dt>Tipo de proyecto</dt>
            <dd>${project.type}</dd>
          </div>
          <div class="fact">
            <dt>Fecha</dt>
            <dd>${project.date}</dd>
          </div>
          <div class="fact">
            <dt>Rol</dt>
            <dd>${project.role}</dd>
          </div>
          <div class="fact">
            <dt>Muestra</dt>
            <dd>${project.sample}</dd>
          </div>
        </dl>
        <div class="button-row">
          ${project.links.map(projectLink).join("")}
        </div>
        <nav class="project-nav" aria-label="Navegacion entre proyectos">
          <a class="button button--ghost" href="#/portfolio/${previous.slug}">Anterior</a>
          <a class="button button--ghost" href="#/portfolio/${next.slug}">Siguiente</a>
        </nav>
      </div>
    </article>
  `;
}

function projectLink(link) {
  return `<a class="button" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`;
}

function renderContact() {
  setDocumentTitle("Contacto");
  updateActiveNav("contacto");

  app.innerHTML = `
    <section class="page contact" aria-labelledby="contact-title">
      <div class="contact-card">
        <span class="eyebrow">Contacto</span>
        <h1 id="contact-title">${profile.name}</h1>
        <div class="contact-list">
          <p>
            <strong>Mail</strong>
            <a href="mailto:${profile.email}">${profile.email}</a>
          </p>
          <p>
            <strong>Tel.</strong>
            <a href="tel:${profile.phone.replaceAll(" ", "")}">${profile.phone}</a>
          </p>
        </div>
      </div>
      <div class="contact-photo">
        ${picture(images.contact, "Equipo fotografico sobre una mesa de trabajo")}
      </div>
    </section>
  `;
}

function renderNotFound() {
  setDocumentTitle("Pagina no encontrada");
  updateActiveNav("");

  app.innerHTML = `
    <section class="page not-found" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Pagina no encontrada</h1>
      <p class="lead">La ruta solicitada no existe dentro de este portfolio.</p>
      <div class="button-row">
        <a class="button" href="#/inicio">Volver al inicio</a>
      </div>
    </section>
  `;
}

function render() {
  const [route, slug] = routeParts();
  closeMenu();

  if (route === "inicio") {
    renderHome();
  } else if (route === "portfolio" && slug) {
    renderProject(slug);
  } else if (route === "portfolio") {
    renderPortfolio();
  } else if (route === "contacto") {
    renderContact();
  } else {
    renderNotFound();
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  app.focus({ preventScroll: true });
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

app.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project]");
  if (!card) {
    return;
  }

  window.location.hash = `#/portfolio/${card.dataset.project}`;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("hashchange", render);
render();
