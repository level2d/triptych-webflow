import styles from "./HomeScene.module.scss";

import { Suspense, lazy, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { debug } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";
import Loading from "./Loading";
import Nav from "./Nav";
import CurrentItemUi from "./CurrentItemUi";
import useQueryVariable from "@/js/hooks/useQueryVariable";

import "../3D/Shaders";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, debug ? 0 : 1 * 500)),
    ]).then(([moduleExports]) => moduleExports);
});
const DebugModelScene = lazy(() => import("./DebugModelScene"));

export default function HomeScene() {
    const setGetR3fStore = useStore((state) => state.setGetR3fStore);
    const wrapperProps = {};
    const debugModel = useQueryVariable("debugModel");
    if (debug) {
        wrapperProps["data-lenis-prevent"] = true;
    }
    return (
        <div className={styles.homeScene}>
            <div className={styles.homeSceneCanvasWrapper} {...wrapperProps}>
                <Canvas
                    shadows
                    onCreated={({ get, gl }) => {
                        // Pass r3f store getter to our local store
                        setGetR3fStore(get);
                        gl.setClearAlpha(0);
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >
                    <Suspense fallback={<Loading />}>
                        {debug && debugModel ? (
                            <DebugModelScene model={debugModel} />
                        ) : (
                            <Scene />
                        )}
                    </Suspense>
                </Canvas>
            </div>
            {!debugModel && <Nav />}
            {!debugModel && <CurrentItemUi />}
            <Leva hidden={!debug} collapsed oneLineLabels />
        </div>
    );
}
