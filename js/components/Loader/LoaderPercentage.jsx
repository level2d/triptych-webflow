import cx from "classnames";
import { useStore } from "@/js/lib/store";
import styles from "./LoaderPercentage.module.scss";

export default function LoaderPercentage() {
    const progress = useStore((state) => state.loaderProgress);
    return (
        <div className={styles.loaderPercentageWrapper}>
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
