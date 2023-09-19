import { useControls, button } from "leva";

import { useStore } from "@/js/lib/store";

export default function Actions() {
    const orbit = useStore((state) => state.orbit);
    const resetCurrentBoxUuid = useStore((state) => state.resetCurrentBoxUuid);

    const resetCameraTarget = () => {
        resetCurrentBoxUuid();
    };

    useControls("Camera Actions", {
        orbitRight: button(async () => await orbit("right")),
        orbitLeft: button(async () => await orbit("left")),
        orbitUp: button(async () => await orbit("up")),
        orbitDown: button(async () => await orbit("down")),
        resetCameraTarget: button(() => resetCameraTarget()),
    });

    return null;
}
