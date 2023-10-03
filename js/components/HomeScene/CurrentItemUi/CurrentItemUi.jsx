import { useMemo, useLayoutEffect, useRef } from "react";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import NavButton from "../NavButton";
import styles from "./CurrentItemUi.module.scss";

export default function CurrentItemUi() {
    const el = useRef(null);
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);
    const resetCurrentBoxUuid = useStore((state) => state.resetCurrentBoxUuid);
    const visible = useMemo(() => {
        return typeof currentBoxUuid === "string";
    }, [currentBoxUuid]);

    useLayoutEffect(() => {
        const target = el.current;
        if (!target) {
            return;
        }

        gsap.fromTo(
            target,
            {
                opacity: visible ? 0 : 1,
                y: visible ? 50 : 0,
                visibility: visible ? "hidden" : "visible",
            },
            {
                opacity: visible ? 1 : 0,
                y: visible ? 0 : -50,
                visibility: visible ? "visible" : "hidden",
                duration: 0.2,
            },
        );
        return () => {
            gsap.killTweensOf(target);
        };
    }, [visible]);

    return (
        <div className={styles.currentItemUi} ref={el}>
            <div className={styles.currentItemUiInner}>
                <div className={styles.currentItemUiContent}>
                    {/* subtitle */}
                    <div>Subtitle</div>
                    {/* title */}
                    <div>Really Long Title With Letters</div>
                    {/* description */}
                    <div>
                        <p>
                            {
                                "The articles featured here provide a behind-the-scenes look at Triptych's work across strategy, development, and design."
                            }
                        </p>
                    </div>
                    {/* nav */}
                    <div className={styles.currentItemUiNav}>
                        <NavButton
                            direction="left"
                            onClick={() => {
                                resetCurrentBoxUuid();
                            }}
                            hotkey="esc"
                        ></NavButton>
                        <NavButton>Check it out ↗</NavButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
