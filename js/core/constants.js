// sounds
import bump_url from "@/assets/audio/bump.mp3";
import click_url from "@/assets/audio/minimal_click.mp3";
import subpages_soundtrack_url from "@/assets/audio/subpages_triptych_soundtrack.mp3";
import triptych_soundtrack_url from "@/assets/audio/triptych_soundtrack.mp3";
import _404_soundtrack_url from "@/assets/audio/404.mp3";

export const SOUNDS = {
    bump: bump_url,
    click: click_url,
    subpages: subpages_soundtrack_url,
    four_oh_four: _404_soundtrack_url,
    triptych: triptych_soundtrack_url,
};

export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);

export const VALID_DOMAINS = ["localhost", "triptych.co"];
