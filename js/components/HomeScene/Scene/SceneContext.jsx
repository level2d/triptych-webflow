import { createContext, useContext } from "react";

export const SceneContext = createContext();

export const useSceneContext = () => {
    const context = useContext(SceneContext);
    return context;
};
