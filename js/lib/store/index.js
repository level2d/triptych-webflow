import { create } from "zustand";
import { devtools } from "zustand/middleware";
import computed from "zustand-computed";

import {
    createHomeSceneSlice,
    createComputedHomeSceneSlice,
} from "./homeSceneSlice";
import { createModelSlice } from "./modelSlice";

export const useStore = create(
    devtools(
        computed(
            (...a) => ({
                ...createHomeSceneSlice(...a),
                ...createModelSlice(...a),
            }),
            (state) => ({
                ...createComputedHomeSceneSlice(state),
            }),
        ),
    ),
);
