// glbs
import box_locations_url from "@/assets/3d/box_locations_05.glb";
import careers_url from "@/assets/3d/careers_01.glb";
import cdm_url from "@/assets/3d/cdm_01.glb";

// textures
import hatching_matcap_url from "@/assets/img/hatching_matcap_02.png";
import matcap_rim_lit_url from "@/assets/img/matcap_rim_lit.jpg";

// shaders
import matcap_shader_url from "@/assets/2d/matcap_02.json?url";

export const GLB_ASSET_URLS = {
    // location meshes
    Locations: box_locations_url,
    Careers: careers_url,
    CDM: cdm_url,
};

export const TEXTURE_ASSET_URLS = {
    hatching_matcap: hatching_matcap_url,
    rim_lit_matcap: matcap_rim_lit_url,
};

export const SHADER_ASSET_URLS = {
    matcap: matcap_shader_url,
};

export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);
