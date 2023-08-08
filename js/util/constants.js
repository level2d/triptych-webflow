export const BOX_NAMES = {
    BOX: "Box",
    BUTTON: "Button",
    EYE: "Eye",
    TV: "TV",
};

export const GLB_NAMES = {
    ["Locations"]: "box_locations_04",
    [BOX_NAMES.BOX]: "box_01",
    [BOX_NAMES.BUTTON]: "button_03",
    [BOX_NAMES.EYE]: "eye_02",
    [BOX_NAMES.TV]: "tv_01",
};

// The length of this array should match how many placeholders there are.
// Currently there are only 16
export const BOX_MESHES = [
    BOX_NAMES.BOX,
    BOX_NAMES.TV,
    BOX_NAMES.EYE,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BUTTON,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
    BOX_NAMES.BOX,
];

export const ANIMATION_NAMES = {
    ["button_01"]: "button_01",
    ["socket"]: "socket",
    ["eye"]: "eye",
    ["upper_lid"]: "upper_lid",
    ["lower_lid"]: "lower_lid",
    ["click_eye_01"]: "click_eye_01",
    ["click_eye_02"]: "click_eye_02",
};

export const AUTOPLAY_ANIMATION_CONFIGS = [
    { name: ANIMATION_NAMES.button_01, loop: false },
    { name: ANIMATION_NAMES.socket, loop: true },
    { name: ANIMATION_NAMES.eye, loop: true },
    { name: ANIMATION_NAMES.upper_lid, loop: true },
    { name: ANIMATION_NAMES.lower_lid, loop: true },
];
