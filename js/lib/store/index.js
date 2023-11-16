import { create } from "zustand";
import { devtools } from "zustand/middleware";
import computed from "zustand-computed";

import { createLoaderSlice, createComputedLoaderSlice } from "./loaderSlice";
import {
    createHomeSceneSlice,
    createComputedHomeSceneSlice,
} from "./homeSceneSlice";

export const useStore = create(
    devtools(
        computed(
            (...a) => ({
                ...createLoaderSlice(...a),
                ...createHomeSceneSlice(...a),
            }),
            (state) => ({
                ...createComputedLoaderSlice(state),
                ...createComputedHomeSceneSlice(state),
            }),
        ),
    ),
);
