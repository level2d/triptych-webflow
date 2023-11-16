import { useLayoutEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "@/js/lib/store";
import { useDebounce } from "usehooks-ts";
import LoadingBar from "./LoaderBar";
import Logo from "./Logo";
import { dom } from "@/js/core";
import styles from "./Loader.module.scss";

export default function Loader() {
    const { progress: sceneProgress } = useProgress();
    const debouncedSceneProgress = useDebounce(sceneProgress, 50);
    const { loaderProgress, setLoaderProgress } = useStore((state) => ({
        loaderProgress: state.loaderProgress,
        setLoaderProgress: state.setLoaderProgress,
    }));
    const pageHasScene =
        dom.homeExperience.length > 0 || dom.backgroundFx.length > 0;

    useLayoutEffect(() => {
        if (!pageHasScene || typeof debouncedSceneProgress !== "number") {
            return;
        }

        setLoaderProgress(debouncedSceneProgress / 100);
    }, [debouncedSceneProgress, pageHasScene, setLoaderProgress]);

    useLayoutEffect(() => {
        if (pageHasScene) {
            return;
        }
        if (loaderProgress < 1.0) {
            const interval = setInterval(() => {
                const currentProgress = loaderProgress;
                let nextProgress = currentProgress + 0.1;
                nextProgress = Math.round(nextProgress * 10) / 10;
                setLoaderProgress(nextProgress);
            }, 100);

            return () => {
                clearInterval(interval);
            };
        }
    }, [loaderProgress, setLoaderProgress, pageHasScene]);

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
