import { useControls, button } from "leva";
import { useHotkeys } from "react-hotkeys-hook";

import { useStore } from "@/js/lib/store";

export default function Actions() {
    const orbit = useStore((state) => state.orbit);
    const resetCurrentBoxState = useStore(
        (state) => state.resetCurrentBoxState,
    );

    const resetCameraTarget = () => {
        resetCurrentBoxState();
    };

    useControls("Camera Actions", {
        orbitRight: button(async () => await orbit("right")),
        orbitLeft: button(async () => await orbit("left")),
        orbitUp: button(async () => await orbit("up")),
        orbitDown: button(async () => await orbit("down")),
        resetCameraTarget: button(() => resetCameraTarget()),
    });

    useHotkeys("ctrl+shift+d", () => {
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.has("debug")) {
            window.location.search = "";
        } else {
            window.location.search = "debug=true";
        }
    });

    return null;
}
