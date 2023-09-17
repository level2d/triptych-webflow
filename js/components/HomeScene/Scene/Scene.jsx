import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { debug } from "@/js/core/constants";
import SceneContext from "./SceneContext";
import Rig from "./Rig";
import Model from "./Model";
import "./Shaders";

const padding = 0.5;

export default function Scene() {
    const lookAtMesh = useRef(null);

    return (
        <SceneContext.Provider
            value={{
                padding,
                lookAtMesh,
            }}
        >
            {/* debug */}
            {debug && <Perf position="top-left" />}
            {debug && <axesHelper args={[5]} />}

            <Rig />

            {/* environment */}
            <Environment preset="sunset" blur={1} />

            {/* models */}
            <Model />
        </SceneContext.Provider>
    );
}
