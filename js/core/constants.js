// glbs
import box_locations_url from "@/assets/3d/box_locations_05.glb";

// textures
import cell_matcap_url from "@/assets/2d/cell_matcap_04.png";
import running_man_url from "@/assets/2d/running_man_01.mp4?url";

// shaders
import matcap_shader_url from "@/assets/2d/matcap_02.json?url";

export const GLB_ASSET_URLS = {
    // location meshes
    Locations: box_locations_url,
};

export const TEXTURE_ASSET_URLS = {
    matcap: cell_matcap_url,
    running_man: running_man_url,
};

export const SHADER_ASSET_URLS = {
    matcap: matcap_shader_url,
};

export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);
