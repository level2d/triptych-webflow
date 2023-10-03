import styles from "./Nav.module.scss";

import { useLayoutEffect, useMemo, useRef } from "react";

import gsap from "@/js/lib/gsap";
import { useStore } from "@/js/lib/store";
import Actions from "./Actions";
import NavButton from "../NavButton";

const NavArrows = ({ visible }) => {
    const el = useRef(null);
    const orbit = useStore((state) => state.orbit);
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
                zIndex: visible ? -1 : 1,
                visibility: visible ? "hidden" : "visible",
            },
            {
                opacity: visible ? 1 : 0,
                y: visible ? 0 : -50,
                zIndex: visible ? 1 : -1,
                visibility: visible ? "visible" : "hidden",
                duration: 0.2,
            },
        );
        return () => {
            gsap.killTweensOf(target);
        };
    }, [visible]);
    return (
        <div className={styles.arrowsWrapper} ref={el}>
            <div className={styles.buttonWrapper}>
                <NavButton
                    direction="left"
                    onClick={() => {
                        orbit("left");
                    }}
                />
                <div className={styles.middleButtons}>
                    <NavButton
                        direction="up"
                        onClick={() => {
                            orbit("up");
                        }}
                    />
                    <NavButton
                        direction="down"
                        onClick={() => {
                            orbit("down");
                        }}
                    />
                </div>
                <NavButton
                    direction="right"
                    onClick={() => {
                        orbit("right");
                    }}
                />
            </div>
        </div>
    );
};

const NavUi = () => {
    const interactable = useStore((state) => state.interactable);
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);

    const isNavArrowsVisible = useMemo(() => {
        return currentBoxUuid === null;
    }, [currentBoxUuid]);

    if (!interactable) {
        return null;
    }

    return (
        <>
            <NavArrows visible={isNavArrowsVisible} />
        </>
    );
};

export default function Nav() {
    return (
        <>
            <NavUi />
            <Actions />
        </>
    );
}
