import fallbackContent from "../../data/content.json";
import { renderApp } from "./app/App.js";
import type { ContactPayload, SiteContent } from "../shared/content.js";
import { setupInteractiveUi } from "./utils/animations.js";

const appRoot = document.querySelector<HTMLDivElement>("#app");

async function loadContent(): Promise<SiteContent> {
  try {
    const response = await fetch("/api/content");

    if (!response.ok) {
      throw new Error(`Falha ao carregar conteudo: ${response.status}`);
    }

    return (await response.json()) as SiteContent;
  } catch (error) {
    console.warn("Usando conteudo local de fallback.", error);
    return fallbackContent as SiteContent;
  }
}

function setContactStatus(message: string, isError = false) {
  const statusElement = document.querySelector<HTMLElement>("[data-contact-status]");

  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.style.color = isError ? "#9d2c2c" : "";
}

function bindContactForm() {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload: ContactPayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setContactStatus("Preencha todos os campos antes de enviar.", true);
      return;
    }

    setContactStatus("Enviando mensagem...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Falha ao enviar contato: ${response.status}`);
      }

      form.reset();
      setContactStatus("Mensagem enviada com sucesso. Em breve entraremos em contato.");
    } catch (error) {
      console.error(error);
      setContactStatus("Nao foi possivel enviar agora. Tente novamente em instantes.", true);
    }
  });
}

async function mountApp() {
  if (!appRoot) {
    throw new Error("Elemento #app nao encontrado.");
  }

  const content = await loadContent();
  appRoot.innerHTML = renderApp(content);
  setupInteractiveUi(document);
  bindContactForm();
}

void mountApp().catch((error) => {
  console.error(error);

  if (appRoot) {
    appRoot.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="card">
            <h1 class="card__title">Nao foi possivel carregar o site</h1>
            <p class="card__text">Tente atualizar a pagina em alguns instantes.</p>
          </div>
        </div>
      </section>
    `;
  }
});
