import styles from "./HomeScene.module.scss";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports);
});

export default function HomeScene() {
    return (
        <div className={styles.wrapper}>
            <Canvas shadows camera={{ position: [-4, -1.25, 4], fov: 55 }}>
                <Suspense
                    fallback={
                        <Text
                            position={[0, 0, 0]}
                            rotation-y={-Math.PI * 0.25}
                        >{`Loading...`}</Text>
                    }
                >
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
