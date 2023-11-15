export const createLoaderSlice = (set, get) => ({
    loaderLogoAnimationComplete: false,
    setLoaderLogoAnimationComplete: (complete) =>
        set(() => ({ loaderLogoAnimationComplete: complete })),
    loaderProgress: 0.0,
    setLoaderProgress: (progress) => set(() => ({ loaderProgress: progress })),
    loaderPageLoaded: false,
    setLoaderPageLoaded: (loaded) => set(() => ({ loaderPageLoaded: loaded })),
});

export const createComputedLoaderSlice = (state) => ({
    loaderComplete:
        state.loaderPageLoaded &&
        state.loaderLogoAnimationComplete &&
        state.loaderProgress === 1.0,
});
