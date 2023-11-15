import cx from "classnames";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import { useLayoutEffect, useRef } from "react";
import LoadingPercentage from "./LoaderPercentage";
import styles from "./LoaderBar.module.scss";

export default function LoadingBar() {
    const xBar = useRef(null);
    const yBar = useRef(null);
    const progress = useStore((state) => state.loaderProgress);

    useLayoutEffect(() => {
        const target = xBar.current;
        if (!target) {
            return;
        }
        gsap.to(target, {
            width: `${progress * 100}%`,
            duration: 0.5,
            ease: "Power2.inOutExpo",
        });
        return () => {
            gsap.killTweensOf(target);
        };
    }, [progress]);

    useLayoutEffect(() => {
        const target = yBar.current;
        if (!target) {
            return;
        }
        gsap.to(target, {
            height: `${progress * 100}%`,
            duration: 0.5,
            ease: "Power2.inOutExpo",
        });
        return () => {
            gsap.killTweensOf(target);
        };
    }, [progress]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.loaderBarWrapper}>
                <div
                    className={cx(styles.loaderBar, styles.loaderBarHorizontal)}
                    ref={xBar}
                >
                    <LoadingPercentage />
                </div>
                <div
                    className={cx(styles.loaderBar, styles.loaderBarVertical)}
                    ref={yBar}
                >
                    <LoadingPercentage />
                </div>
            </div>
        </div>
    );
}
