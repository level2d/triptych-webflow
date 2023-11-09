import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import { ReflectionMaterial } from "../../3D/Materials";

function ReflectionModelMobile(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations_Mobile);
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
    }, [setBoundingBox, nodes.triptych_mobile.geometry, boundingBox]);

    return (
        <group {...props} dispose={null}>
            <mesh
                name="ReflectionModel"
                // material={nodes.water_mobile.material}
                geometry={nodes.water_mobile.geometry}
                position={[0, -11.044, 0]}
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

export default ReflectionModelMobile;

useGLTF.preload(GLB_ASSET_URLS.Locations_Mobile);
