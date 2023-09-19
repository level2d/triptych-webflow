import styles from "./HomeScene.module.scss";

import { Suspense, lazy, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { debug } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";
import Loading from "./Loading";
import Nav from "./Nav";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, debug ? 0 : 1 * 500)),
    ]).then(([moduleExports]) => moduleExports);
});

export default function HomeScene() {
    const ref = useRef(null);
    const setGetR3fStore = useStore((state) => state.setGetR3fStore);
    const wrapperProps = {};
    if (debug) {
        wrapperProps["data-lenis-prevent"] = true;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.canvasWrapper} {...wrapperProps} ref={ref}>
                <Canvas
                    shadows
                    onCreated={({ get }) => {
                        // Pass r3f store getter to our local store
                        setGetR3fStore(get);
                    }}
                >
                    <Suspense fallback={<Loading />}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
            <Nav />
            <div className={styles.levaWrapper}>
                <Leva hidden={!debug} fill />
            </div>
        </div>
    );
}
