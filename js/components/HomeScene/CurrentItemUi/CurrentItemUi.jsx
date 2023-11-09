import { useMemo, useLayoutEffect, useRef } from "react";
import { useStore } from "@/js/lib/store";
import gsap, { SplitText } from "@/js/lib/gsap";
import NavButton from "../NavButton";
import data from "./data.json";
import styles from "./CurrentItemUi.module.scss";

export default function CurrentItemUi() {
    const el = useRef(null);
    const metaEl = useRef(null);
    const titleEl = useRef(null);
    const descEl = useRef(null);
    const navEl = useRef(null);
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
                <span className="metadata" ref={metaEl}>
                    {modelData.subtitle}
                </span>
                <h1 className="hpe-header" ref={titleEl}>
                    {modelData.title}
                </h1>
            </div>
        );
    };

    const renderDescription = () => {
        if (!modelData || !modelData.description) {
            return null;
        }
        return (
            <div className="body-display" ref={descEl}>
                <p>{modelData.description}</p>
            </div>
        );
    };

    const renderNav = () => {
        return (
            <div className={styles.currentItemUiNav} ref={navEl}>
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
        const metaTarget = metaEl.current;
        const titleTarget = titleEl.current;
        const descTarget = descEl.current;
        const navTarget = navEl.current;
        if (!target) {
            return;
        }

        const tl = gsap.timeline({ paused: true });

        if (visible) {
            tl.fromTo(
                target,
                {
                    opacity: 0,
                    visibility: "hidden",
                },
                {
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.1,
                },
            );

            if (metaTarget) {
                tl.fromTo(
                    metaTarget,
                    {
                        opacity: 0,
                        y: 10,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                    },
                );
            }

            if (titleTarget) {
                const split = new SplitText(titleTarget, {
                    type: "chars, words",
                });
                tl.set(split.words, {
                    overflow: "hidden",
                });
                tl.fromTo(
                    split.chars,
                    {
                        opacity: 0,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                        stagger: (index) => {
                            return index * 0.03;
                        },
                        ease: "power2.outExpo",
                    },
                );
            }

            if (descTarget) {
                tl.fromTo(
                    descTarget,
                    {
                        opacity: 0,
                        y: 10,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                    },
                );
            }

            if (navTarget) {
                tl.fromTo(
                    navTarget,
                    {
                        opacity: 0,
                        y: 10,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                    },
                );
            }
        } else {
            tl.fromTo(
                target,
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                {
                    opacity: 0,
                    y: 10,
                    visibility: "hidden",
                    duration: 0.35,
                },
            );
        }

        tl.play();
        return () => {
            gsap.killTweensOf(target);

            if (metaTarget) {
                gsap.killTweensOf(metaTarget);
            }

            if (titleTarget) {
                gsap.killTweensOf(titleTarget);
                titleTarget.innerHtml = "";
            }

            if (descTarget) {
                gsap.killTweensOf(descTarget);
            }

            if (navTarget) {
                gsap.killTweensOf(navTarget);
            }
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
