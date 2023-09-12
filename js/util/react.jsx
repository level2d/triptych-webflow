import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

/**
 *
 * @function renderToDOMElement
 * @param {HTMLElement} el root node to render component to
 * @param {import("react").ReactElement} Component React component
 * @returns {ReactDOM.Root}
 */
export const renderToDOMElement = (el, Component) => {
    const root = ReactDOM.createRoot(el);
    root.render(
        <StrictMode>
            <Component />
        </StrictMode>,
    );
    return root;
};
