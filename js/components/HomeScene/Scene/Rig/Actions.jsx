import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useControls, button } from "leva";

import { useSceneContext } from "../useSceneContext";
import { useStore } from "@/js/lib/store";

export default function Actions() {
    const { padding } = useSceneContext();
    const getThreeState = useThree((state) => state.get);
    const cameraPosition = new THREE.Vector3();
    const boundingBox = new THREE.Box3();

    /**
     *
     * @param {'right'|'up'|'down'|'left'} direction
     */
    const orbit = async (direction = "right") => {
        const cameraControls = getThreeState().controls;
        if (!cameraControls) return;

        const cameraTarget = useStore.getState().cameraTarget;
        if (!cameraTarget.geometry) return;

        // Store camera position to local Vector3
        cameraControls.getPosition(cameraPosition, true);
        // Calc bounds of camera target
        cameraTarget.geometry.computeBoundingSphere();

        // Store bounding box to local Box3
        const boundingSphere = cameraTarget.geometry.boundingSphere.clone();
        boundingSphere.getBoundingBox(boundingBox);

        switch (direction) {
            case "up": {
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                await cameraControls.fitToBox(cameraTarget, true, {
                    paddingTop: padding,
                    paddingRight: padding,
                    paddingBottom: padding,
                    paddingLeft: padding,
                });
                break;
            }
            case "down": {
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(90),
                    true,
                );
                await cameraControls.fitToBox(cameraTarget, true, {
                    paddingTop: padding,
                    paddingRight: padding,
                    paddingBottom: padding,
                    paddingLeft: padding,
                });
                break;
            }
            case "left": {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(-45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
            case "right":
            default: {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
        }
    };

    useControls("Camera Actions", {
        orbitRight: button(() => orbit("right")),
        orbitLeft: button(() => orbit("left")),
        orbitUp: button(() => orbit("up")),
        orbitDown: button(() => orbit("down")),
    });
    return null;
}
