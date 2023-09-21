import { Outlines as _Outlines } from "@react-three/drei";

import { useStore } from "@/js/lib/store";

export default function Outlines({ children }) {
    const outlineThickness = useStore((state) => state.outlineThickness);

    return (
        <_Outlines thickness={outlineThickness} color={"#343434"}>
            {children}
        </_Outlines>
    );
}
