import { useContext } from "react";
import SceneContext from "./SceneContext";

export const useSceneContext = () => {
    const context = useContext(SceneContext);
    return context;
};
