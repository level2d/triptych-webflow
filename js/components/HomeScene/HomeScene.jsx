import styles from "./HomeScene.module.scss";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { Leva } from "leva";
import { debug } from "@/js/core/constants";

import loadingLogoUrl from "@/assets/img/loading-logo.gif";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(([moduleExports]) => moduleExports);
});

export default function HomeScene() {
    return (
        <div className={styles.wrapper}>
            <Leva hidden={!debug} />
            <Canvas shadows camera={{ position: [-4, -1.25, 4], fov: 55 }}>
                <Suspense
                    fallback={
                        <Html
                            position={[0, 0, 0]}
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img src={loadingLogoUrl} />
                        </Html>
                    }
                >
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
