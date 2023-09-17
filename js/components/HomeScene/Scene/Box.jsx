import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { dampQ } from "maath/easing";
import { useSceneContext } from "./useSceneContext";
import { useStore } from "@/js/lib/store";

export default function Box({ children, ...rest }) {
    const setCurrentBoxUuid = useStore((state) => state.setCurrentBoxUuid);
    const [mounted, setMounted] = useState(false);
    const { lookAtMesh } = useSceneContext();
    const lookAtVector = useRef(new THREE.Vector3());
    const ref = useRef(null);

    const refClone = useMemo(() => {
        if (mounted) {
            return ref.current.clone();
        }
        return null;
    }, [mounted]);

    const handleClick = () => {
        // Use the first child's uuid as camera targets selector
        // Need to do this because camera controls can't target a group
        // only a mesh or object3d.
        setCurrentBoxUuid(ref.current.children[0].uuid);
    };

    useFrame(({ delta }) => {
        if (!refClone) return;

        lookAtMesh.current.getWorldPosition(lookAtVector.current);

        refClone.lookAt(lookAtVector.current);
        const toQuaternion = refClone.quaternion; // quaternion to lerp to
        dampQ(ref.current.quaternion, toQuaternion, 0.1, delta);
    });

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <group ref={ref} {...rest} onClick={handleClick}>
            {children}
        </group>
    );
}
