import { useControls, button } from "leva";
import { useHotkeys } from "react-hotkeys-hook";

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
    useHotkeys("esc", () => {
        resetCurrentBoxUuid();
    });
    useHotkeys("up", async () => {
        await orbit("up");
    });
    useHotkeys("down", async () => {
        await orbit("down");
    });
    useHotkeys("right", async () => {
        await orbit("right");
    });
    useHotkeys("left", async () => {
        await orbit("left");
    });

    return null;
}
