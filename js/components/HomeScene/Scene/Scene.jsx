import { useLayoutEffect } from "react";
// import { Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { useStore } from "@/js/lib/store";
import { debug } from "@/js/core/constants";
import Rig from "./Rig";
import Model from "./Model";
import ModelMobile from "./ModelMobile";
import { useThree } from "@react-three/fiber";
import { isDesktop } from "@/js/core/detect";

export default function Scene() {
    const isClickable = useStore((state) => state.isClickable);
    const { gl } = useThree();
    useLayoutEffect(() => {
        if (!gl || !gl.domElement) return;
        if (isClickable) {
            gl.domElement.style.cursor = "pointer";
        } else {
            gl.domElement.style.cursor = "";
        }
    }, [isClickable, gl]);
    return (
        <>
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            {/* camera, controls, etc... */}
            <Rig />

            {/* environment */}
            {/* <Environment preset="sunset" blur={1} /> */}

            {/* models */}
            {isDesktop ? <Model /> : <ModelMobile />}
        </>
    );
}
