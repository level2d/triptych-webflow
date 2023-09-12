import styles from "./HomeScene.module.scss";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import { Leva } from "leva";
import { debug } from "@/js/core/constants";

import loadingLogoUrl from "@/assets/img/loading-logo.gif";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, debug ? 0 : 2.4 * 1000)),
    ]).then(([moduleExports]) => moduleExports);
});

const Loading = () => {
    return debug ? (
        <Text position={[0, 0, 0]} rotation={[0, Math.PI * -0.25, 0]}>
            {"Loading..."}
        </Text>
    ) : (
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
    );
};

export default function HomeScene() {
    return (
        <div className={styles.wrapper} data-lenis-prevent>
            <Leva hidden={!debug} />
            <Canvas shadows camera={{ position: [-4, -1.25, 4], fov: 55 }}>
                <Suspense fallback={<Loading />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
