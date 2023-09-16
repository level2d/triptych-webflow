import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useControls, button } from "leva";

import { useSceneContext } from "./useSceneContext";

export default function Actions() {
    const { currentSubject, padding } = useSceneContext();
    const get = useThree((state) => state.get);
    const cameraPosition = new THREE.Vector3();

    /**
     *
     * @param {'right'|'up'|'down'|'left'} direction
     */
    const orbit = async (direction = "right") => {
        const cameraControls = get().controls;
        if (!cameraControls) return;

        cameraControls.getPosition(cameraPosition, true);
        currentSubject.current.geometry.computeBoundingSphere();
        const boundingSphere =
            currentSubject.current.geometry.boundingSphere.clone();

        const boundingBox = new THREE.Box3();
        boundingSphere.getBoundingBox(boundingBox);

        const currentSubjectPosition = new THREE.Vector3();
        currentSubjectPosition.copy(currentSubject.current.position);

        switch (direction) {
            case "up": {
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                await cameraControls.fitToBox(currentSubject.current, true, {
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
                await cameraControls.fitToBox(currentSubject.current, true, {
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
