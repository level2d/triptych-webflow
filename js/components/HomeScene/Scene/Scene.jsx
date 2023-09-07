import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
import Model from "./Model";

const padding = 0.5;

export default function Scene() {
    const [mounted, setMounted] = useState(false);
    const { size } = useThree();
    const { width, height } = size;
    const camera = useRef(null);
    const cameraControls = useRef(null);
    const triptychRef = useRef(null);
    const currentSubjectRef = useRef(null);

    /**
     *
     * @param {'right'|'up'|'down'|'left'} direction
     */
    async function orbit(direction = "right") {
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(camera.current.position);
        console.log(cameraPosition);

        currentSubjectRef.current.geometry.computeBoundingSphere();
        const boundingSphere =
            currentSubjectRef.current.geometry.boundingSphere.clone();

        const boundingBox = new THREE.Box3();
        boundingSphere.getBoundingBox(boundingBox);

        const currentSubjectPosition = new THREE.Vector3();
        currentSubjectPosition.copy(currentSubjectRef.current.position);

        switch (direction) {
            case "up": {
                await cameraControls.current.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                await cameraControls.current.fitToBox(
                    currentSubjectRef.current,
                    true,
                    {
                        paddingTop: padding,
                        paddingRight: padding,
                        paddingBottom: padding,
                        paddingLeft: padding,
                    },
                );
                break;
            }
            case "down": {
                await cameraControls.current.rotate(
                    0,
                    THREE.MathUtils.degToRad(90),
                    true,
                );
                await cameraControls.current.fitToBox(
                    currentSubjectRef.current,
                    true,
                    {
                        paddingTop: padding,
                        paddingRight: padding,
                        paddingBottom: padding,
                        paddingLeft: padding,
                    },
                );
                break;
            }
            case "left": {
                await cameraControls.current.rotate(
                    THREE.MathUtils.degToRad(-45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
            case "right":
            default: {
                await cameraControls.current.rotate(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
        }
    }


    useEffect(() => {
        setMounted(true);
        currentSubjectRef.current = triptychRef.current;
        cameraControls.current.setOrbitPoint(
            currentSubjectRef.current.x,
            currentSubjectRef.current.y,
            currentSubjectRef.current.z,
        );
    }, []);

    useEffect(() => {
        if (!mounted) return;
        cameraControls.current.fitToBox(currentSubjectRef.current, true, {
            paddingTop: padding,
            paddingRight: padding,
            paddingBottom: padding,
            paddingLeft: padding,
        });
    }, [mounted, width, height, cameraControls]);

    return (
        <SceneContext.Provider value={{ cameraControls, camera }}>
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}
            {debug && <OrbitControls />}

            {/* camera */}
            <OrthographicCamera
                makeDefault
                position={[0, 0, 10]}
                ref={camera}
            />
            <CameraControls ref={cameraControls} />

            {/* environment */}
            <Environment preset="sunset" background blur={1} />
            <directionalLight
                castShadow
                position={[-1.5, 2.5, 1.8]}
                intensity={1.5}
            />
            <ambientLight intensity={0.5} />

            {/* models */}
            <Model ref={triptychRef} />
        </SceneContext.Provider>
    );
}
