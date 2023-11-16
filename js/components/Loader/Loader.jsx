import { useLayoutEffect, useMemo, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import LoadingBar from "./LoaderBar";
import Logo from "./Logo";
import { dom } from "@/js/core";
import styles from "./Loader.module.scss";
import LoaderOverlay from "./LoaderOverlay";
import App from "@/js/App";

export default function Loader() {
    const app = useRef(new App());
    const wrapper = useRef(null);
    const overlay1 = useRef(null);
    const overlay2 = useRef(null);
    const { progress } = useProgress();

    const { loaderComplete, loaderProgress, setLoaderProgress } = useStore(
        (state) => ({
            loaderProgress: state.loaderProgress,
            setLoaderProgress: state.setLoaderProgress,
            loaderComplete: state.loaderComplete,
        }),
    );

    const pageHasScene =
        dom.homeExperience.length > 0 || dom.backgroundFx.length > 0;

    const sceneProgress = useMemo(() => {
        const _progress = Math.round((progress / 100) * 100) / 100;
        return _progress;
    }, [progress]);

    useLayoutEffect(() => {
        if (pageHasScene && sceneProgress < 1.0) {
            setLoaderProgress(sceneProgress * 0.75);
        } else if (loaderProgress < 1.0) {
            const interval = setInterval(() => {
                const currentProgress = loaderProgress;
                let nextProgress = currentProgress + 0.01;
                nextProgress = Math.round(nextProgress * 100) / 100;
                setLoaderProgress(nextProgress);
            }, 10);
            return () => {
                clearInterval(interval);
            };
        }
    }, [loaderProgress, setLoaderProgress, sceneProgress, pageHasScene]);

    useLayoutEffect(() => {
        gsap.set([overlay1.current, overlay2.current], {
            yPercent: 100,
        });
        if (!loaderComplete) {
            return;
        }

        const timeline = gsap.timeline({
            paused: true,
            onStart: () => {
                app.current.bus.emit("App: loaded");
            },
            onComplete: () => {
                gsap.set(wrapper.current, {
                    display: "none",
                });
            },
        });

        timeline.to(
            wrapper.current,
            {
                yPercent: -100,
                duration: 0.5,
                ease: "power2.inOut",
            },
            0,
        );

        timeline.to(
            [overlay1.current, overlay2.current],
            {
                yPercent: -100,
                duration: 0.5,
                ease: "power2.inOut",
                stagger: 0.25,
            },
            "<0.025",
        );

        timeline.play();

        return () => {
            timeline.kill();
        };
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
                <LoaderOverlay color="violet" ref={overlay1} />
                <LoaderOverlay color="yellow" ref={overlay2} />
            </div>
        </div>
    );
}
