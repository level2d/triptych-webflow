import { useMemo, useLayoutEffect, useRef } from "react";
import { useStore } from "@/js/lib/store";
import gsap from "@/js/lib/gsap";
import NavButton from "../NavButton";
import data from "./data.json";
import styles from "./CurrentItemUi.module.scss";

export default function CurrentItemUi() {
    const el = useRef(null);
    const currentBoxModelName = useStore((state) => state.currentBoxModelName);
    const visible = useStore((state) => state.currentItemUiVisible);
    const resetCurrentBoxState = useStore(
        (state) => state.resetCurrentBoxState,
    );

    const modelData = useMemo(() => {
        if (Object.keys(data).includes(currentBoxModelName)) {
            return data[currentBoxModelName];
        } else {
            return null;
        }
    }, [currentBoxModelName]);

    const renderTitle = () => {
        if (!modelData || !modelData.subtitle || !modelData.title) {
            return null;
        }
        return (
            <div>
                <span className="metadata">{modelData.subtitle}</span>
                <h1 className="h1">{modelData.title}</h1>
            </div>
        );
    };

    const renderDescription = () => {
        if (!modelData || !modelData.description) {
            return null;
        }
        return (
            <div className="body-display">
                <p>{modelData.description}</p>
            </div>
        );
    };

    const renderNav = () => {
        return (
            <div className={styles.currentItemUiNav}>
                <NavButton
                    direction="left"
                    disabled={!visible}
                    onClick={() => {
                        resetCurrentBoxState();
                    }}
                    hotkey={["esc", "left"]}
                ></NavButton>
                {modelData && modelData.cta && (
                    <NavButton
                        href={modelData.cta.url}
                        hotkey="enter"
                        disabled={!visible}
                        isLink
                    >
                        {modelData.cta.text}
                    </NavButton>
                )}
            </div>
        );
    };

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
        <div className={styles.currentItemUi} ref={el} data-lenis-prevent>
            <div className={styles.currentItemUiInner}>
                <div className={styles.currentItemUiContent}>
                    {/* titles */}
                    {renderTitle()}
                    {/* description */}
                    {renderDescription()}
                    {/* nav */}
                    {renderNav()}
                </div>
            </div>
        </div>
    );
}
