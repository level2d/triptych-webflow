import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";
import SceneContext from "./SceneContext";
import Rig from "./Rig";
import Model from "./Model";
import "./Shaders";

const padding = 0.5;

export default function Scene() {
    const [mounted, setMounted] = useState(false);
    const cameraTarget = useStore((state) => state.cameraTarget);
    const { size, get } = useThree();
    const { width, height } = size;
    const intersectionPlane = useRef(null);
    const triptychRef = useRef(null);
    const currentSubject = useRef(null);
    const lookAtMesh = useRef(null);

    useEffect(() => {
        // Immediately focus the triptych model
        currentSubject.current = triptychRef.current;
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const cameraControls = get().controls;
        if (!cameraControls) return;
        if (!debug) {
            cameraControls.disconnect();
        }
        const focusCamera = async () => {
            await cameraControls.setOrbitPoint(
                cameraTarget.position.x,
                cameraTarget.position.y,
                cameraTarget.position.z,
            );
            await cameraControls.fitToBox(cameraTarget, true, {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding,
            });
        };
        focusCamera();
    }, [mounted, width, height, get, cameraTarget]);

    return (
        <SceneContext.Provider
            value={{
                currentSubject,
                padding,
                intersectionPlane,
                lookAtMesh,
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
        </SceneContext.Provider>
    );
}
