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
import { dampE, dampQ } from "maath/easing";

import { useStore } from "@/js/lib/store";

export default function Box({ children, ...rest }) {
    const [mounted, setMounted] = useState(false);
    const ref = useRef(null);

    const scene = useThree((state) => state.scene);
    const setIsClickable = useStore((state) => state.setIsClickable);
    const setCurrentBoxFromObject3d = useStore(
        (state) => state.setCurrentBoxFromObject3d,
    );
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);
    const lookAtMeshUuid = useStore((state) => state.lookAtMeshUuid);
    const opacity = useStore((state) => state.homeSceneOpacity);
    const lookAtVector = useRef(new THREE.Vector3());

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
            setCurrentBoxFromObject3d(ref.current.children[0]);
        },
        [clickEnabled, setCurrentBoxFromObject3d],
    );

    useFrame(({ delta }) => {
        if (!refClone) return;
        if (!lookAtMesh) return;

        lookAtMesh.getWorldPosition(lookAtVector.current);

        refClone.lookAt(lookAtVector.current);
        const toQuaternion = refClone.quaternion; // quaternion to lerp to
        dampQ(ref.current.quaternion, toQuaternion, 0.1, delta);

        let rotationY = ref.current.children[0].rotation.y;
        if (isCurrentBox) {
            rotationY += 0.1;
        } else {
            rotationY = 0;
        }
        dampE(ref.current.children[0].rotation, [0, rotationY, 0], delta);
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
