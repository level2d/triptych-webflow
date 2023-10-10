import { Outlines as _Outlines } from "@react-three/drei";
import { useControls } from "leva";

import * as colors from "@/js/core/colors";

export default function Outlines({ children, opacity = 1 }) {
    const { outlineThickness, outlineColor } = useControls("Model Outlines", {
        outlineColor: {
            value: colors.black2,
        },
        outlineThickness: {
            value: 0.01,
            step: 0.01,
            min: 0.01,
            max: 0.1,
        },
    });
    return (
        <_Outlines
            thickness={outlineThickness}
            color={outlineColor}
            transparent
            opacity={opacity}
        >
            {children}
        </_Outlines>
    );
}
