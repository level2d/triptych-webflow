import { useLayoutEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import { useDebounce } from "usehooks-ts";
import LoadingBar from "./LoaderBar";
import Logo from "./Logo";
import { dom } from "@/js/core";
import styles from "./Loader.module.scss";
import LoaderOverlay from "./LoaderOverlay";

export default function Loader() {
    const wrapper = useRef(null);
    const overlay1 = useRef(null);
    const overlay2 = useRef(null);
    const { progress: sceneProgress } = useProgress();
    const debouncedSceneProgress = useDebounce(sceneProgress, 50);
    const { loaderComplete, loaderProgress, setLoaderProgress } = useStore(
        (state) => ({
            loaderProgress: state.loaderProgress,
            setLoaderProgress: state.setLoaderProgress,
            loaderComplete: state.loaderComplete,
        }),
    );
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

    useLayoutEffect(() => {
        gsap.set([overlay1.current, overlay2.current], {
            yPercent: 100,
        });
        if (!loaderComplete) {
            return;
        }

        const timeline = gsap.timeline({
            paused: true,
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
