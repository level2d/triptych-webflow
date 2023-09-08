import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
    CameraControls,
    Environment,
    OrthographicCamera,
    OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import { SceneContext } from "./SceneContext";
import Actions from "./Actions";
import Model from "./Model";

const padding = 0.5;

export default function Scene() {
    const [mounted, setMounted] = useState(false);
    const { size } = useThree();
    const { width, height } = size;
    const camera = useRef(null);
    const cameraControls = useRef(null);
    const triptychRef = useRef(null);
    const currentSubject = useRef(null);

    useEffect(() => {
        setMounted(true);
        currentSubject.current = triptychRef.current;
        cameraControls.current.setOrbitPoint(
            currentSubject.current.x,
            currentSubject.current.y,
            currentSubject.current.z,
        );
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!debug) {
            cameraControls.current.disconnect();
        }
        cameraControls.current.fitToBox(currentSubject.current, true, {
            paddingTop: padding,
            paddingRight: padding,
            paddingBottom: padding,
            paddingLeft: padding,
        });
    }, [mounted, width, height, cameraControls]);

    return (
        <SceneContext.Provider
            value={{ cameraControls, camera, currentSubject, padding }}
        >
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            {/* camera */}
            <OrthographicCamera
                makeDefault
                position={[0, 0, 10]}
                ref={camera}
            />
            <CameraControls ref={cameraControls} />

            {/* environment */}
            <Environment preset="sunset" blur={1} />

            {/* models */}
            <Model ref={triptychRef} />

            <Actions />
        </SceneContext.Provider>
    );
}
