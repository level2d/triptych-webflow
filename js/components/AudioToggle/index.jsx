import { useLayoutEffect, useRef } from "react";
import styles from "./AudioToggle.module.scss";
import { useLocalStorage } from "usehooks-ts";
import App from "@/js/App";

export default function AudioToggle() {
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
            <div className={styles.inner}>
                <label htmlFor="audio-toggle-input" className={styles.label}>
                    <input
                        type="checkbox"
                        id="audio-toggle-input"
                        className={styles.input}
                        checked={muted}
                        onChange={handleChange}
                    />
                    muted
                </label>
            </div>
        </div>
    );
}
