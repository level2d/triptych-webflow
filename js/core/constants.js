// sounds
import bump_url from "@/assets/audio/bump.mp3";
import click_url from "@/assets/audio/minimal_click.mp3";
import subpages_soundtrack_url from "@/assets/audio/subpages_triptych_soundtrack.mp3";

export const SOUNDS = {
    bump: bump_url,
    click: click_url,
    subpages: subpages_soundtrack_url,
};

export const debug = Boolean(
    new URLSearchParams(window.location.search).get("debug") === "true",
);
