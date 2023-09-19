// glbs
import box_locations_url from "@/assets/3d/box_locations_05.glb";
import careers_url from "@/assets/3d/careers_01.glb";
import cdm_url from "@/assets/3d/cdm_01.glb";
import contact_url from "@/assets/3d/contact_01.glb";
import culture_url from "@/assets/3d/culture_01.glb";
import epb_url from "@/assets/3d/epb_01.glb";
import eye_url from "@/assets/3d/eye_01.glb";
import gyro_url from "@/assets/3d/gyro_01.glb";
import key_url from "@/assets/3d/key_01.glb";
import methods_url from "@/assets/3d/methods_01.glb";
import northface_url from "@/assets/3d/northface_01.glb";
import phone_url from "@/assets/3d/phone_01.glb";
import showreel_url from "@/assets/3d/showreel_01.glb";
import skull_url from "@/assets/3d/skull_01.glb";
import sos_url from "@/assets/3d/sos_01.glb";
import stories_url from "@/assets/3d/stories_01.glb";
import work_url from "@/assets/3d/work_01.glb";

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
    Contact: contact_url,
    Culture: culture_url,
    EPB: epb_url,
    Eye: eye_url,
    Gyro: gyro_url,
    Key: key_url,
    Methods: methods_url,
    Northface: northface_url,
    Phone: phone_url,
    Showreel: showreel_url,
    Skull: skull_url,
    SOS: sos_url,
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
