import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import { WaterMaterial } from "../../3D/Materials";

function WaterModelMobile(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations_Mobile);
    const meshRef = useRef(null);

    const opacity = useStore((state) => state.homeSceneOpacity);

    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    return (
        <group {...props} dispose={null}>
            <mesh
                name="WaterModel"
                geometry={nodes.horizon_dome.geometry}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={meshRef}
            >
                <WaterMaterial opacity={opacity} />
            </mesh>
        </group>
    );
}

export default WaterModelMobile;

useGLTF.preload(GLB_ASSET_URLS.Locations_Mobile);
