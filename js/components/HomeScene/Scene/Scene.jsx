import { Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import Rig from "./Rig";
import Model from "./Model";

export default function Scene() {
    return (
        <>
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            {/* camera, controls, etc... */}
            <Rig />

            {/* environment */}
            <Environment preset="sunset" blur={1} />

            {/* models */}
            <Model />
        </>
    );
}
