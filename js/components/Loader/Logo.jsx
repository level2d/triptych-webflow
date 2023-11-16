import { Player } from "@lottiefiles/react-lottie-player";
import logoAnimationJSON from "@/assets/data/logo-animation.json";
import { useStore } from "@/js/lib/store";

import styles from "./Logo.module.scss";

export default function Logo() {
    const setLoaderLogoAnimationComplete = useStore(
        (state) => state.setLoaderLogoAnimationComplete,
    );

    const handleEvent = (e) => {
        switch (e) {
            case "complete":
                setLoaderLogoAnimationComplete(true);
                return;
            default:
                return;
        }
    };

    return (
        <div className={styles.logo}>
            <Player
                className={styles.logoPlayer}
                autoplay
                keepLastFrame
                src={logoAnimationJSON}
                onEvent={handleEvent}
            ></Player>
        </div>
    );
}
