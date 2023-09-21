import { create } from "zustand";
import { devtools } from "zustand/middleware";
import computed from "zustand-computed";

import {
    createHomeSceneSlice,
    createComputedHomeSceneSlice,
} from "./homeSceneSlice";

export const useStore = create(
    devtools(
        computed(
            (...a) => ({
                ...createHomeSceneSlice(...a),
            }),
            (state) => ({
                ...createComputedHomeSceneSlice(state),
            }),
        ),
    ),
);
