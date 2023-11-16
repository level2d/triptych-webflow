import cx from "classnames";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import styles from "./LoaderPercentage.module.scss";
import { useLayoutEffect, useRef } from "react";

export default function LoaderPercentage() {
    const el = useRef(null);
    const progress = useStore((state) => state.loaderProgress);

    useLayoutEffect(() => {
        gsap.fromTo(
            el.current,
            {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.25,
                ease: "power2.inOut",
            },
        );
    }, []);
    return (
        <div className={styles.loaderPercentageWrapper} ref={el}>
            <div
                className={cx(
                    styles.loaderPercentageText,
                    "loading-percentage percentage",
                )}
            >
                {Math.round(progress * 100)}
            </div>
            <div className={cx(styles.loaderPercentageText, "percentage")}>
                %
            </div>
        </div>
    );
}
