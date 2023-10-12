import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import { ReflectionMaterial } from "../../3D/Materials";

function ReflectionModel(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const meshRef = useRef(null);

    const opacity = useStore((state) => state.homeSceneOpacity);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });

    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    useLayoutEffect(() => {
        meshRef.current.geometry.computeBoundingBox();
        setBoundingBox(meshRef.current.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry, boundingBox]);

    return (
        <group {...props} dispose={null}>
            <mesh
                name="ReflectionModel"
                // material={nodes.water.material}
                geometry={nodes.water.geometry}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={meshRef}
            >
                <ReflectionMaterial
                    boundingBox={boundingBox}
                    opacity={opacity}
                />
            </mesh>
        </group>
    );
}

export default ReflectionModel;

useGLTF.preload(GLB_ASSET_URLS.Locations);
