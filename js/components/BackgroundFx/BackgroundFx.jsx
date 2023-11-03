import styles from "./BackgroundFx.module.scss";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { debug } from "@/js/core/constants";

import "../3D/Shaders";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, debug ? 0 : 1 * 500)),
    ]).then(([moduleExports]) => moduleExports);
});

export default function BgScene() {
    const wrapperProps = {};
    if (debug) {
        wrapperProps["data-lenis-prevent"] = true;
    }
    return (
        <div className={styles.bg}>
            <div className={styles.bgCanvasWrapper} {...wrapperProps}>
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 1] }}
                    onCreated={({ gl }) => {
                        gl.setClearAlpha(0);
                    }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >
                  				{/* <color args={["#6c87a1"]} attach="background" /> */}

                    <Suspense fallback={null}>
                        <Scene/>
                    </Suspense>
                </Canvas>
            </div>
            <Leva collapsed oneLineLabels />
        </div>
    );
}
