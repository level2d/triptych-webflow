import { Outlines as _Outlines } from "@react-three/drei";

import { useControls, folder } from "leva";

export default function Outlines({ children }) {
    const { outlineThickness, outlineColor } = useControls({
        outlines: folder({
            outlineColor: {
                value: "#343434",
            },
            outlineThickness: {
                value: 0.02,
                step: 0.01,
                min: 0.01,
                max: 0.1,
            },
        }),
    });
    return (
        <_Outlines thickness={outlineThickness} color={outlineColor}>
            {children}
        </_Outlines>
    );
}
