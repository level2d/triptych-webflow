import styles from "./Nav.module.scss";

import cx from "classnames";
import { useStore } from "@/js/lib/store";
import Actions from "./Actions";
import { useMemo, useState } from "react";

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

const randomColorIndex = () => Math.floor(randomNumber(0, COLORS.length));

const Button = ({
    direction = "left",
    onClick = () => {},
    startingColorIndex = randomColorIndex(),
}) => {
    const [colorIndex, setColorIndex] = useState(null);
    const [lastColorIndex, setLastColorIndex] = useState(startingColorIndex);
    const Component = ARROWS[direction];

    const handleMouseEnter = () => {
        const newColorIndex =
            lastColorIndex + 1 >= COLORS.length ? 0 : lastColorIndex + 1;
        setColorIndex(newColorIndex);
    };

    const handleMouseLeave = () => {
        setLastColorIndex(colorIndex);
        setColorIndex(null);
    };

    const colorClassname = useMemo(() => {
        if (typeof colorIndex === "number") {
            return styles[`button--${COLORS[colorIndex]}`];
        }
        return null;
    }, [colorIndex]);

    return (
        <button
            className={cx(styles.button, colorClassname)}
            onClick={() => {
                onClick(direction);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Component />
        </button>
    );
};

const NavUi = () => {
    const interactable = useStore((state) => state.interactable);
    const orbit = useStore((state) => state.orbit);
    const resetCurrentBoxUuid = useStore((state) => state.resetCurrentBoxUuid);
    const currentBoxUuid = useStore((state) => state.currentBoxUuid);

    if (!interactable) {
        return null;
    }

    return (
        <>
            {typeof currentBoxUuid === "string" ? (
                <div className={styles.backWrapper}>
                    <Button direction="left" onClick={resetCurrentBoxUuid} />
                </div>
            ) : (
                <div className={styles.arrowsWrapper}>
                    <div className={styles.buttonWrapper}>
                        <Button direction="left" onClick={orbit} />
                        <div className={styles.middleButtons}>
                            <Button direction="up" onClick={orbit} />
                            <Button direction="down" onClick={orbit} />
                        </div>
                        <Button direction="right" onClick={orbit} />
                    </div>
                </div>
            )}
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
