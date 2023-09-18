import styles from "./HomeScene.module.scss";

import { Suspense, lazy } from "react";
import { Canvas, useInstanceHandle } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Leva } from "leva";
import { debug } from "@/js/core/constants";

const Scene = lazy(() => {
    return Promise.all([
        import("./Scene"),
        new Promise((resolve) => setTimeout(resolve, debug ? 0 : 1 * 1000)),
    ]).then(([moduleExports]) => moduleExports);
});

const Loading = () => {
    return (
        <Html center>
            <svg
                version="1.1"
                id="L4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 0 0"
                xmlSpace="preserve"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: "5rem", height: "auto" }}
            >
                <circle fill="#343434" stroke="none" cx="6" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"
                    />
                </circle>
                <circle fill="#343434" stroke="none" cx="26" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2"
                    />
                </circle>
                <circle fill="#343434" stroke="none" cx="46" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3"
                    />
                </circle>
            </svg>
        </Html>
    );
};

export default function HomeScene() {
    const wrapperProps = {};
    if (debug) {
        wrapperProps["data-lenis-prevent"] = true;
    }
    return (
        <div className={styles.wrapper} {...wrapperProps}>
            <Canvas shadows camera={{ position: [-4, -1.25, 4], fov: 55 }}>
                <Suspense fallback={<Loading />}>
                    <Scene />
                </Suspense>
            </Canvas>
            <div className={styles.levaWrapper}>
                <Leva hidden={!debug} fill />
            </div>
        </div>
    );
}
