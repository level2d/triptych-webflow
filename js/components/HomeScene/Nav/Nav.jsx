import styles from "./Nav.module.scss";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import cx from "classnames";

import gsap from "@/js/lib/gsap";
import { useStore } from "@/js/lib/store";
import Actions from "./Actions";

const LeftArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
        >
            <path
                d="M16 5.99995L1.61749 5.99995M1.61749 5.99995L6.68079 11.0633M1.61749 5.99995L6.68079 0.936645"
                stroke="currentColor"
            />
        </svg>
    );
};

const UpArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
        >
            <path
                d="M5.99919 16L5.99919 1.61749M5.99919 1.61749L0.935891 6.68079M5.99919 1.61749L11.0625 6.68079"
                stroke="currentColor"
            />
        </svg>
    );
};

const DownArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            transform="rotate(180 0 0)"
        >
            <path
                d="M5.99919 16L5.99919 1.61749M5.99919 1.61749L0.935891 6.68079M5.99919 1.61749L11.0625 6.68079"
                stroke="currentColor"
            />
        </svg>
    );
};

const RightArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
        >
            <path
                d="M6.03793e-08 5.99995L14.3825 5.99995M14.3825 5.99995L9.31921 11.0633M14.3825 5.99995L9.31921 0.936645"
                stroke="currentColor"
            />
        </svg>
    );
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const ARROWS = {
    left: LeftArrow,
    up: UpArrow,
    right: RightArrow,
    down: DownArrow,
};

const COLORS = ["yellow", "orange", "violet"];
const ACTIVE_COLOR = "white";

const randomColorIndex = () => Math.floor(randomNumber(0, COLORS.length));

const Button = ({
    direction = "left",
    onClick = () => {},
    startingColorIndex = randomColorIndex(),
    hotkey = null,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [colorIndex, setColorIndex] = useState(null);
    const [lastColorIndex, setLastColorIndex] = useState(startingColorIndex);
    const Component = ARROWS[direction];
    const _hotkey = hotkey ?? direction;

    const colorClassname = useMemo(() => {
        if (isActive) {
            return styles[`button--${ACTIVE_COLOR}`];
        }
        if (typeof colorIndex === "number") {
            return styles[`button--${COLORS[colorIndex]}`];
        }
        return null;
    }, [colorIndex, isActive]);

    const handleMouseEnter = () => {
        const newColorIndex =
            lastColorIndex + 1 >= COLORS.length ? 0 : lastColorIndex + 1;
        setColorIndex(newColorIndex);
    };

    const handleMouseLeave = () => {
        setLastColorIndex(colorIndex);
        setColorIndex(null);
    };

    const handleMousedown = () => {
        setIsActive(true);
    };

    const handleMouseup = () => {
        setTimeout(() => {
            setIsActive(false);
        }, 100);
    };

    useHotkeys(_hotkey, () => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
        }, 100);
    });

    return (
        <button
            className={cx(styles.button, colorClassname)}
            onClick={() => {
                onClick(direction);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMousedown}
            onMouseUp={handleMouseup}
        >
            <Component />
        </button>
    );
};

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
                <Button direction="left" onClick={orbit} />
                <div className={styles.middleButtons}>
                    <Button direction="up" onClick={orbit} />
                    <Button direction="down" onClick={orbit} />
                </div>
                <Button direction="right" onClick={orbit} />
            </div>
        </div>
    );
};

const NavBack = ({ visible }) => {
    const el = useRef(null);
    const resetCurrentBoxUuid = useStore((state) => state.resetCurrentBoxUuid);
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
        <div className={styles.backWrapper} ref={el}>
            <Button
                direction="left"
                onClick={() => {
                    resetCurrentBoxUuid();
                }}
                hotkey="esc"
            />
        </div>
    );
};

const NavUi = () => {
    const interactable = useStore((state) => state.interactable);
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);

    const isNavBackVisible = useMemo(() => {
        return typeof currentBoxUuid === "string";
    }, [currentBoxUuid]);

    const isNavArrowsVisible = useMemo(() => {
        return currentBoxUuid === null;
    }, [currentBoxUuid]);

    if (!interactable) {
        return null;
    }

    return (
        <>
            <NavBack visible={isNavBackVisible} />
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
