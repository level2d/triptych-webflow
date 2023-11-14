import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import { StarsMaterial } from "../../3D/Materials";

function StarsModel(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const meshRef = useRef(null);

    const opacity = useStore((state) => state.homeSceneOpacity);
    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    return (
        <group {...props} dispose={null}>
            <mesh
                name="StarsModel"
                geometry={nodes.stars.geometry}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                position={[0, 3.542, 0]}
                ref={meshRef}
            >
                <StarsMaterial opacity={opacity} />
            </mesh>
        </group>
    );
}

export default StarsModel;

useGLTF.preload(GLB_ASSET_URLS.Locations);
