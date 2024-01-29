export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);
