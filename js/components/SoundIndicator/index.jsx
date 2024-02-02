import { useLayoutEffect, useRef } from "react";
import styles from "./SoundIndicator.module.scss";
import { useLocalStorage } from "usehooks-ts";
import { Player } from "@lottiefiles/react-lottie-player";

import audioAnimationJSON from "@/assets/data/audio_play_lottie_01.json";
import App from "@/js/App";

const MutedIcon = () => {
    return (
        <svg
            width="78"
            height="78"
            viewBox="0 0 78 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                x1="47.5"
                y1="50.2857"
                x2="47.5"
                y2="53"
                stroke="currentColor"
            />
            <line x1="39.5" y1="49" x2="39.5" y2="53" stroke="currentColor" />
            <line
                x1="31.5"
                y1="50.2857"
                x2="31.5"
                y2="53"
                stroke="currentColor"
            />
            <line x1="35.5" y1="51" x2="35.5" y2="53" stroke="currentColor" />
            <line
                x1="43.5"
                y1="50.5714"
                x2="43.5"
                y2="53"
                stroke="currentColor"
            />
        </svg>
    );
};

export default function SoundIndicator() {
    const app = useRef(new App());
    const [muted, setMuted] = useLocalStorage("muted", false);

    const handleChange = () => {
        setMuted(!muted);
    };

    useLayoutEffect(() => {
        if (muted) {
            app.current.bus.emit("Module: Soundboard: mute");
        } else {
            app.current.bus.emit("Module: Soundboard: unmute");
        }
    }, [muted]);

    return (
        <div className={styles.wrapper}>
            <label htmlFor="audio-toggle-input" className={styles.label}>
                <input
                    type="checkbox"
                    id="audio-toggle-input"
                    className={styles.input}
                    checked={muted}
                    onChange={handleChange}
                />
                <span className={styles.text}>{muted ? "Unmute" : "Mute"}</span>
                {muted ? (
                    <MutedIcon />
                ) : (
                    <Player
                        autoplay
                        loop
                        className={styles.logoPlayer}
                        src={audioAnimationJSON}
                    ></Player>
                )}
            </label>
        </div>
    );
}
