import { create } from "zustand";
import { devtools } from "zustand/middleware";
import computed from "zustand-computed";

import { createLoaderSlice, createComputedLoaderSlice } from "./loaderSlice";

export const useStore = create(
    devtools(
        computed(
            (...a) => ({
                ...createLoaderSlice(...a),
            }),
            (state) => ({
                ...createComputedLoaderSlice(state),
            }),
        ),
    ),
);
