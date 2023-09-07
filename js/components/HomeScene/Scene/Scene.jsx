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
import Cube from "./Cube";

const padding = 0.5;

export default function Scene() {
    const [mounted, setMounted] = useState(false);
    const { size } = useThree();
    const { width, height } = size;
    const cameraControls = useRef(null);
    const groupRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!cameraControls.current) return;
        if (mounted) {
            cameraControls.current.fitToBox(groupRef.current, true, {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding,
            });
        }
    }, [mounted, width, height, cameraControls]);

    return (
        <SceneContext.Provider value={{ cameraControls }}>
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <OrbitControls />}

            {/* camera */}
            <OrthographicCamera makeDefault zoom={200} position={[0, 0, 10]} />
            <CameraControls ref={cameraControls} />

            {/* environment */}
            <Environment preset="city" background blur={1} />
            <directionalLight
                castShadow
                position={[-1.5, 2.5, 1.8]}
                intensity={1.5}
            />
            <ambientLight intensity={0.5} />

            {/* models */}
            <group ref={groupRef}>
                <Cube />
            </group>

            {/* Plane */}
            <mesh
                position-y={-1}
                scale={10}
                rotation={[-Math.PI * 0.5, 0, 0]}
                receiveShadow
            >
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </SceneContext.Provider>
    );
}
