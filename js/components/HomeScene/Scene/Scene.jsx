import { OrbitControls, Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import Cube from "./Cube";

export default function Scene() {
    return (
        <>
            {/* controls */}
            {debug && <Perf position="top-left" />}
            <OrbitControls makeDefault />

            {/* environment */}
            <Environment preset="city" background blur={1} />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            {/* models */}
            <Cube />

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
        </>
    );
}
