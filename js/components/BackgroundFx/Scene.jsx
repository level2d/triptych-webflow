import { Perf } from "r3f-perf";
import { debug } from "@/js/core/constants";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { RippleMaterial } from "../3D/Materials";

export default function Scene() {
    const planeRef = useRef(null);

    useFrame(({ viewport, camera }) => {
        const { height, width } = viewport.getCurrentViewport(
            camera,
            [0, 0, 0],
        );
        if (planeRef.current) {
            planeRef.current.scale = [width, height, 1];
        }
    });

    return (
        <>
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            {/* camera, controls, etc... */}
            <PerspectiveCamera makeDefault position={[0, 0, 1]} />
            {/* <OrbitControls makeDefault/> */}

            {/* meshes */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2, 2]} attach={"geometry"} />
                {/* <meshStandardMaterial
                        color={"red"}
                        attach={"material"}
                        side={THREE.DoubleSide}
                    /> */}
                <RippleMaterial opacity={1} />
            </mesh>

            <ambientLight intensity={1} />
        </>
    );
}
