import "./app.css";

const nodes = {
    btnEnterSite: null,
    splash: null,
};

const selectors = {
    btnEnterSite: ".js-btn-enter-site",
    splash: ".js-splash",
};

const renderExplorationItemHtml = (item) => {
    return `
        <div class="js-exploration-item">
            ${item.name}
        </div>
    `;
};

const renderPageHtml = (items) => `
    <div>
        <div class="js-splash">
            <div>
                <button class="js-btn-enter-site" type="button">
                    Enter Site
                </button>
            </div>
        </div>
        <div class="js-exploration">${items.map((item) =>
            renderExplorationItemHtml(item)
        )}</div>
    </div>
`;

const render = (el) => {
    const items = Array.from(document
        .querySelectorAll("#exploration-items > div"))
        .map((itemEl) => ({ ...itemEl.dataset }));
    el.innerHTML = renderPageHtml(items);
};

const createNodeCache = () => {
    nodes.btnEnterSite = document.querySelector(selectors.btnEnterSite);
    nodes.splash = document.querySelector(selectors.splash);
};

const bindEvents = () => {
    nodes.btnEnterSite.addEventListener("click", () => {
        nodes.splash.style.display = "none";
    });
};

const init = () => {
    const el = document.querySelector("#app");
    if (el) {
        render(el);
        createNodeCache();
        bindEvents();
    }
};

export default { init };
