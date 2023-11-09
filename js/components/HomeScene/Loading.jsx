import { useProgress } from "@react-three/drei";
import styles from "./Loading.module.scss";
import { useLayoutEffect, useMemo, useState } from "react";

export default function Loading() {
    const { progress } = useProgress();
    const [isVisible, setIsVisible] = useState(true);
    const loaded = useMemo(() => {
        return progress === 100;
    }, [progress]);
    useLayoutEffect(() => {
        if (loaded) {
            setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        } else {
            setIsVisible(true);
        }
        return () => {
            setIsVisible(true);
        };
    }, [loaded]);
    return (
        isVisible && (
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <svg
                        version="1.1"
                        id="L4"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 0 0"
                        xmlSpace="preserve"
                        preserveAspectRatio="xMidYMid meet"
                        style={{ width: "5rem", height: "auto" }}
                    >
                        <circle
                            fill="#ffffff"
                            stroke="none"
                            cx="6"
                            cy="50"
                            r="6"
                        >
                            <animate
                                attributeName="opacity"
                                dur="1s"
                                values="0;1;0"
                                repeatCount="indefinite"
                                begin="0.1"
                            />
                        </circle>
                        <circle
                            fill="#ffffff"
                            stroke="none"
                            cx="26"
                            cy="50"
                            r="6"
                        >
                            <animate
                                attributeName="opacity"
                                dur="1s"
                                values="0;1;0"
                                repeatCount="indefinite"
                                begin="0.2"
                            />
                        </circle>
                        <circle
                            fill="#ffffff"
                            stroke="none"
                            cx="46"
                            cy="50"
                            r="6"
                        >
                            <animate
                                attributeName="opacity"
                                dur="1s"
                                values="0;1;0"
                                repeatCount="indefinite"
                                begin="0.3"
                            />
                        </circle>
                    </svg>
                </div>
            </div>
        )
    );
}
