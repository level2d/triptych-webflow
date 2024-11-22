import { useLayoutEffect, useMemo, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import LoadingBar from "./LoaderBar";
import Logo from "./Logo";
import { dom } from "@/js/core";
import styles from "./Loader.module.scss";
import App from "@/js/App";

export default function Loader() {
    const app = useRef(new App());
    const wrapper = useRef(null);
    const { progress } = useProgress();

    const { loaderComplete, loaderProgress, setLoaderProgress } = useStore(
        (state) => ({
            loaderProgress: state.loaderProgress,
            setLoaderProgress: state.setLoaderProgress,
            loaderComplete: state.loaderComplete,
        }),
    );

    const pageHasScene = dom.backgroundFx.length > 0;

    const sceneProgress = useMemo(() => Math.round(progress) / 100, [progress]);

    useLayoutEffect(() => {
        if (pageHasScene && sceneProgress < 1.0) {
            setLoaderProgress(sceneProgress * 0.75);
        } else if (loaderProgress < 1.0) {
            const progressRef = { current: loaderProgress };
            let animationFrame;

            const updateProgress = () => {
                progressRef.current = Math.min(progressRef.current + 0.1, 1.0);
                setLoaderProgress(progressRef.current);
                if (progressRef.current < 1.0) {
                    animationFrame = requestAnimationFrame(updateProgress);
                }
            };

            animationFrame = requestAnimationFrame(updateProgress);

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [loaderProgress, setLoaderProgress, sceneProgress, pageHasScene]);

    useLayoutEffect(() => {
        if (!loaderComplete) {
            return;
        }

        const timeline = gsap.timeline({
            paused: true,
            onStart: () => {
                setTimeout(() => {
                    app.current.bus.emit("App: loaded");
                }, 500);
            },
            onComplete: () => {
                gsap.set(wrapper.current, {
                    display: "none",
                });
            },
        });

        timeline
            .to(wrapper.current, {
                yPercent: -100,
                duration: 0.5,
                ease: "power2.inOut",
            })
            .play();

        return () => timeline.kill();
    }, [loaderComplete]);

    return (
        <div className={styles.loader} ref={wrapper}>
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
