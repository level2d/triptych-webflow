import { CameraControls, Center, Environment } from "@react-three/drei";

import * as Models from "./Models";

export default function DebugModelScene({ model = "CareersModel" }) {
    const Component = Models[model];
    return (
        <>
            <CameraControls makeDefault />
            <Environment preset="sunset" blur={1} />
            <Center>
                <Component />
            </Center>
        </>
    );
}
