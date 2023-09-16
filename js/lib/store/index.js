import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createHomeSceneSlice } from "./homeSceneSlice";

export const useStore = create(
    devtools((...a) => ({
        ...createHomeSceneSlice(...a),
    })),
);
