import { useMemo } from "react";
import cx from "classnames";
import styles from "./Button.module.scss";
import { BUTTON_THEMES } from "./constants";

export default function Button({
    as = "button",
    theme = BUTTON_THEMES.dark,
    children,
    ...props
}) {
    let Component = as;
    const themeClassname = useMemo(() => {
        return styles[`button--${theme}`];
    }, [theme]);

    return (
        <Component
            className={cx("caption-regular", styles.button, themeClassname)}
            {...props}
        >
            <span className={styles.buttonText}>{children}</span>
            <span className={styles.buttonOutline}></span>
        </Component>
    );
}
