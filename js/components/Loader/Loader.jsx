import LoadingBar from "./LoaderBar";
import Logo from "./Logo";
import styles from "./Loader.module.scss";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderInner}>
                <div className={styles.loaderBarWrapper}>
                    <LoadingBar />
                </div>
                <div className={styles.loaderLogoWrapper}>
                    <Logo />
                </div>
            </div>
        </div>
    );
}
