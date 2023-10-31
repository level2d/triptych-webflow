import dom from "./dom";

const ua = navigator.userAgent;
export const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
export const isTablet = /iPad/i.test(ua);
export const isDesktop = !isMobile && !isTablet;

export const init = () => {
    if (isMobile) dom.document[0].classList.add("is-mobile");
    if (isTablet) dom.document[0].classList.add("is-tablet");
    if (isDesktop) dom.document[0].classList.add("is-desktop");
};
