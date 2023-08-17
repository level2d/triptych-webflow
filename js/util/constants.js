import books_url from "@/assets/3d/books_01.glb";
import box_locations_url from "@/assets/3d/box_locations_04.glb";
import eye_url from "@/assets/3d/eye_02.glb";
import goldfish_url from "@/assets/3d/goldfish_01.glb";
import gumball_url from "@/assets/3d/gumball_01.glb";
import mobile_box_locationsGlbUrl from "@/assets/3d/mobile_box_locations_01.glb";
import mug_url from "@/assets/3d/mug_01.glb";
import switch_url from "@/assets/3d/switch_01.glb";
import tv_url from "@/assets/3d/tv_01.glb";

export const BOX_NAMES = {
    SWITCH: "Switch",
    EYE: "Eye",
    TV: "TV",
    GUMBALL: "Gumball",
    GOLDFISH: "Goldfish",
    BOOKS: "Books",
    MUG: "Mug",
};

export const GLB_NAMES = {
    ["Locations"]: "box_locations_04",
    [BOX_NAMES.SWITCH]: "switch_01",
    [BOX_NAMES.EYE]: "eye_02",
    [BOX_NAMES.TV]: "tv_01",
    [BOX_NAMES.GUMBALL]: "gumball_01",
    [BOX_NAMES.GOLDFISH]: "goldfish_01",
    [BOX_NAMES.BOOKS]: "books_01",
    [BOX_NAMES.MUG]: "mug_01",
};

export const GLB_ASSET_URLS = {
    Locations: box_locations_url,
    [BOX_NAMES.SWITCH]: switch_url,
    [BOX_NAMES.EYE]: eye_url,
    [BOX_NAMES.TV]: tv_url,
    [BOX_NAMES.GUMBALL]: gumball_url,
    [BOX_NAMES.GOLDFISH]: goldfish_url,
    [BOX_NAMES.BOOKS]: books_url,
    [BOX_NAMES.MUG]: mug_url,
};

// The length of this array should match how many placeholders there are.
// Currently there are only 16
export const BOX_MESHES = [
    null, // 1
    BOX_NAMES.TV, // 5
    BOX_NAMES.EYE, // 9
    null, // 13
    null, // 2
    BOX_NAMES.SWITCH, // 6
    null, // 10
    null, // 14
    null, // 3
    BOX_NAMES.GUMBALL, // 7
    BOX_NAMES.GOLDFISH, // 11
    null, // 15
    null, // 4
    null, // 8
    BOX_NAMES.BOOKS, // 12
    BOX_NAMES.MUG, // 16
];

export const ANIMATION_NAMES = {
    // books model
    ["book_01"]: "book_01",
    // eye model
    ["socket"]: "socket",
    ["eye"]: "eye",
    ["upper_lid"]: "upper_lid",
    ["lower_lid"]: "lower_lid",
    ["click_eye_01"]: "click_eye_01",
    ["click_eye_02"]: "click_eye_02",
    // goldfish model
    ["fish_01"]: "fish_01",
    // gumball model
    ["knob_01"]: "knob_01",
    ["gum_01"]: "gum_01",
    // switch model
    ["switch_01"]: "switch_01",
};

export const AUTOPLAY_ANIMATION_CONFIGS = [
    { name: ANIMATION_NAMES.socket, loop: true },
    { name: ANIMATION_NAMES.eye, loop: true },
    { name: ANIMATION_NAMES.upper_lid, loop: true },
    { name: ANIMATION_NAMES.lower_lid, loop: true },
    { name: ANIMATION_NAMES.fish_01, loop: true },
];
