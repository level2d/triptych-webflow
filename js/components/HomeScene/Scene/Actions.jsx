import * as THREE from "three";
import { useControls, button } from "leva";

import { useSceneContext } from "./SceneContext";

export default function Actions() {
    const { camera, cameraControls, currentSubject, padding } =
        useSceneContext();

    /**
     *
     * @param {'right'|'up'|'down'|'left'} direction
     */
    async function orbit(direction = "right") {
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(camera.current.position);

        currentSubject.current.geometry.computeBoundingSphere();
        const boundingSphere =
            currentSubject.current.geometry.boundingSphere.clone();

        const boundingBox = new THREE.Box3();
        boundingSphere.getBoundingBox(boundingBox);

        const currentSubjectPosition = new THREE.Vector3();
        currentSubjectPosition.copy(currentSubject.current.position);

        switch (direction) {
            case "up": {
                await cameraControls.current.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                await cameraControls.current.fitToBox(
                    currentSubject.current,
                    true,
                    {
                        paddingTop: padding,
                        paddingRight: padding,
                        paddingBottom: padding,
                        paddingLeft: padding,
                    },
                );
                break;
            }
            case "down": {
                await cameraControls.current.rotate(
                    0,
                    THREE.MathUtils.degToRad(90),
                    true,
                );
                await cameraControls.current.fitToBox(
                    currentSubject.current,
                    true,
                    {
                        paddingTop: padding,
                        paddingRight: padding,
                        paddingBottom: padding,
                        paddingLeft: padding,
                    },
                );
                break;
            }
            case "left": {
                await cameraControls.current.rotate(
                    THREE.MathUtils.degToRad(-45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
            case "right":
            default: {
                await cameraControls.current.rotate(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
        }
    }

    useControls({
        orbitRight: button(() => orbit("right")),
        orbitLeft: button(() => orbit("left")),
        orbitUp: button(() => orbit("up")),
        orbitDown: button(() => orbit("down")),
    });
    return null;
}
