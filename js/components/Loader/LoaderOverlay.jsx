import { forwardRef } from "react";
import styles from "./LoaderOverlay.module.scss";

const COLORS = {
    yellow: "--color-yellow",
    "yellow-2": "--color-yellow-2",
    orange: "--color-orange",
    "orange-2": "--color-orange-2",
    violet: "--color-violet",
    "violet-2": "--color-violet-2",
    green: "--color-green",
    black: "--color-black",
    "black-2": "--color-black-2",
    "black-3": "--color-black-3",
    white: "--color-white",
};

const LoaderOverlay = forwardRef(({ color = "black" }, ref) => {
    const overlayStyles = {
        backgroundColor: `var(${COLORS[color]})`,
    };
    return <div className={styles.overlay} ref={ref} style={overlayStyles} />;
});

LoaderOverlay.displayName = "LoaderOverlay";

export default LoaderOverlay;
