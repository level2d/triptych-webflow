import { useMemo, useRef } from "react";
import cx from "classnames";
import styles from "./Button2.module.scss";
import { BUTTON_THEMES } from "./constants";
import gsap from "@/js/lib/gsap";

export default function Button2({
    as = "button",
    theme = BUTTON_THEMES.dark,
    children,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ...props
}) {
    let outlineEl = useRef(null);
    let Component = as;
    const themeClassname = useMemo(() => {
        return styles[`button--${theme}`];
    }, [theme]);

    const handleMouseEnter = () => {
        gsap.to(outlineEl.current, {
            width: outlineEl.current.offsetHeight,
            duration: 0.35,
            ease: "Power2.inOut",
        });
        onMouseEnter();
    };

    const handleMouseLeave = () => {
        gsap.to(outlineEl.current, {
            width: "100%",
            duration: 0.35,
            ease: "Power2.inOut",
        });
        onMouseLeave();
    };

    return (
        <Component
            className={cx(styles.button, themeClassname)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span className={styles.buttonText}>{children}</span>
            <span className={cx(styles.buttonOutline)} ref={outlineEl}></span>
            <svg
                className={styles.buttonSvg}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M0.914282 11.0849L11.0843 0.914964M11.0843 0.914964L11.0843 8.07556M11.0843 0.914964L3.92366 0.914964"
                    stroke="white"
                />
            </svg>
        </Component>
    );
}
