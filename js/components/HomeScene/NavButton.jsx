import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Button, { BUTTON_THEMES } from "@/js/components/HomeScene/Button";

const COLORS = [
    BUTTON_THEMES.yellow,
    BUTTON_THEMES.orange,
    BUTTON_THEMES.violet,
];
const ACTIVE_COLOR = BUTTON_THEMES.white;

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
const randomColorIndex = () => Math.floor(randomNumber(0, COLORS.length));

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

const ARROWS = {
    left: LeftArrow,
    up: UpArrow,
    right: RightArrow,
    down: DownArrow,
};

export default function NavButton({
    disabled = false,
    direction = "left",
    onClick = () => {},
    startingColorIndex = randomColorIndex(),
    hotkey = null,
    children,
}) {
    const [isActive, setIsActive] = useState(false);
    const [colorIndex, setColorIndex] = useState(null);
    const [lastColorIndex, setLastColorIndex] = useState(startingColorIndex);
    const Component = ARROWS[direction];
    const _hotkey = hotkey ?? direction;
    const hotKeyEnabled = !disabled;

    const theme = useMemo(() => {
        if (isActive) {
            return ACTIVE_COLOR;
        }
        if (typeof colorIndex === "number") {
            return COLORS[colorIndex];
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

    useHotkeys(
        _hotkey,
        () => {
            setIsActive(true);
            onClick();
            setTimeout(() => {
                setIsActive(false);
            }, 100);
        },
        { enabled: hotKeyEnabled },
        [hotKeyEnabled],
    );

    return (
        <Button
            theme={theme}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMousedown}
            onMouseUp={handleMouseup}
            disabled={disabled}
        >
            {children ?? <Component />}
        </Button>
    );
}
