// glbs
import triptych_locations_url from "@/assets/3d/triptych_locations_03.glb";
import triptych_mobile_locations_url from "@/assets/3d/triptych_mobile_locations_01.glb";
import careers_url from "@/assets/3d/careers_03.glb";
import cdm_url from "@/assets/3d/cdm_02.glb";
import contact_url from "@/assets/3d/contact_04.glb";
import culture_url from "@/assets/3d/culture_02.glb";
import epb_url from "@/assets/3d/epb_02.glb";
import eye_url from "@/assets/3d/eye_02.glb";
import gyro_url from "@/assets/3d/gyro_02.glb";
import key_url from "@/assets/3d/key_02.glb";
import methods_url from "@/assets/3d/methods_03.glb";
import northface_url from "@/assets/3d/northface_02.glb";
import phone_url from "@/assets/3d/phone_01.glb";
import showreel_url from "@/assets/3d/showreel_03.glb";
import skull_url from "@/assets/3d/skull_02.glb";
import sos_url from "@/assets/3d/sos_03.glb";
import stories_url from "@/assets/3d/stories_02.glb";
import work_url from "@/assets/3d/work_02.glb";

// textures
import hatching_matcap_url from "@/assets/img/hatching_matcap_02.png";
import matcap_rim_lit_url from "@/assets/img/matcap_rim_lit.jpg";

export const GLB_ASSET_URLS = {
    // location meshes
    Locations: triptych_locations_url,
    Locations_Mobile: triptych_mobile_locations_url,
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
    Stories: stories_url,
    Work: work_url,
};

export const TEXTURE_ASSET_URLS = {
    hatching_matcap: hatching_matcap_url,
    rim_lit_matcap: matcap_rim_lit_url,
};

export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);
