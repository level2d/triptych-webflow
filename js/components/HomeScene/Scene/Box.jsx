import {
    cloneElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { dampQ } from "maath/easing";

import { useStore } from "@/js/lib/store";

export default function Box({ children, ...rest }) {
    const [mounted, setMounted] = useState(false);
    const scene = useThree((state) => state.scene);
    const setIsClickable = useStore((state) => state.setIsClickable);
    const setCurrentBoxUuid = useStore((state) => state.setCurrentBoxUuid);
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);
    const lookAtMeshUuid = useStore((state) => state.lookAtMeshUuid);
    const opacity = useStore((state) => state.homeSceneOpacity);
    const lookAtVector = useRef(new THREE.Vector3());
    const ref = useRef(null);

    const clickEnabled = useMemo(() => {
        return currentBoxUuid === null;
    }, [currentBoxUuid]);

    const isCurrentBox = useMemo(() => {
        return currentBoxUuid === ref.current?.children[0]?.uuid;
    }, [currentBoxUuid]);

    const handlePointerEnter = (e) => {
        e.stopPropagation();
        setIsClickable(true);
    };
    const handlePointerLeave = (e) => {
        e.stopPropagation();
        setIsClickable(false);
    };

    const Child = cloneElement(children, {
        opacity: isCurrentBox ? 1 : opacity, // override opacity when selected
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave,
    });

    const refClone = useMemo(() => {
        if (mounted) {
            return ref.current.clone();
        }
        return null;
    }, [mounted]);

    const lookAtMesh = useMemo(() => {
        if (mounted) {
            return scene.getObjectByProperty("uuid", lookAtMeshUuid);
        }
        return null;
    }, [mounted, scene, lookAtMeshUuid]);

    const handleClick = useCallback(
        (e) => {
            if (!clickEnabled) return;
            e.stopPropagation(); // prevent ray from hitting meshes behind this one
            // Use the first child's uuid.
            // Need to do this because camera controls can't target a group
            // only a mesh or object3d.
            setCurrentBoxUuid(ref.current.children[0].uuid);
        },
        [clickEnabled, setCurrentBoxUuid],
    );

    useFrame(({ delta }) => {
        if (!refClone) return;
        if (!lookAtMesh) return;

        lookAtMesh.getWorldPosition(lookAtVector.current);

        refClone.lookAt(lookAtVector.current);
        const toQuaternion = refClone.quaternion; // quaternion to lerp to
        dampQ(ref.current.quaternion, toQuaternion, 0.1, delta);
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <group ref={ref} {...rest} onClick={handleClick}>
            {Child}
        </group>
    );
}
