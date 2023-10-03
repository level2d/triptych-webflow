import { useMemo } from "react";
import cx from "classnames";
import styles from "./Button.module.scss";
import { BUTTON_THEMES } from "./constants";

export default function Button({
    theme = BUTTON_THEMES.dark,
    children,
    ...props
}) {
    const themeClassname = useMemo(() => {
        return styles[`button--${theme}`];
    }, [theme]);

    return (
        <button className={cx(styles.button, themeClassname)} {...props}>
            {children}
        </button>
    );
}
