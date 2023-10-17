import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import { StarsMaterial } from "../../3D/Materials";

function StarsModel(props) {
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
                name="StarsModel"
                geometry={nodes.stars.geometry}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={meshRef}
            >
                {/* <StarsMaterial boundingBox={boundingBox} opacity={opacity} /> */}
                <meshBasicMaterial
                    color="#000000"
                    opacity={opacity}
                    transparent
                />
            </mesh>
        </group>
    );
}

export default StarsModel;

useGLTF.preload(GLB_ASSET_URLS.Locations);
