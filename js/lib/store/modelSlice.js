export const createModelSlice = (set) => ({
    outlineThickness: 0.01,
    setOutlineThickness: (outlineThickness) =>
        set(() => ({ outlineThickness })),
    outlineColor: "#343434",
    setOutlineColor: (outlineColor) => set(() => ({ outlineColor })),
});
