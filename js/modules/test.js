import Test from "@/js/components/Test";
import { renderToDOMElement } from "@/js/util/react";

let rootEl = null;

const init = () => {
    rootEl = document.getElementById("root");
    if (rootEl) {
        renderToDOMElement(rootEl, Test);
    }
};

export { init };
