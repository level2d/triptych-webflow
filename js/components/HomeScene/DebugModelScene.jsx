import { CameraControls, Center } from "@react-three/drei";

import * as Models from "./Models";

export default function DebugModelScene({ model = "CareersModel" }) {
    const Component = Models[model];
    return (
        <>
            <CameraControls makeDefault />
            <Center>
                <Component />
            </Center>
        </>
    );
}
