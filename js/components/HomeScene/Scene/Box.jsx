import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { dampQ } from "maath/easing";
import { useSceneContext } from "./useSceneContext";

export default function Box({ children, ...rest }) {
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
        <group ref={ref} {...rest}>
            {children}
        </group>
    );
}
