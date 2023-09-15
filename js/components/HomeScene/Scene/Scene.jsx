import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import SceneContext from "./SceneContext";
import Rig from "./Rig";
import Model from "./Model";
import Actions from "./Actions";
import "./Shaders";

const padding = 0.5;

export default function Scene() {
    const [mounted, setMounted] = useState(false);
    const { size } = useThree();
    const { width, height } = size;
    const cameraControls = useRef(null);
    const intersectionPlane = useRef(null);
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
            value={{
                cameraControls,
                currentSubject,
                padding,
                intersectionPlane,
            }}
        >
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            <Rig />

            {/* environment */}
            <Environment preset="sunset" blur={1} />

            {/* models */}
            <Model ref={triptychRef} />

            <Actions />
        </SceneContext.Provider>
    );
}
