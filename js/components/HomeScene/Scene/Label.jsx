import cx from "classnames";
import styles from "./styles/Label.module.scss";

const Label = ({ className = "", labelType = "right", title = "" }) => {
    const getLabelClassName = () => {
        switch (labelType) {
            case "right":
                return styles.labelRight;
            case "inner-right":
                return styles.labelInnerRight;
            case "inner-left":
                return styles.labelInnerLeft;
            case "left":
                return styles.labelLeft;
        }
    };
    return (
        <div className={cx(styles.label, getLabelClassName(), className)}>
            <div className={cx(styles.labelText, getLabelClassName())}>
                {title}
            </div>
            {labelType === "right" || labelType === "left" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="193.505 130.657 108.351 97.266"
                >
                    <g>
                        <path
                            d="m212.136 204.717 54.953-73.398M266.866 130.657l34.99.167"
                            style={{
                                fill: "#d8d8d8",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                        <ellipse
                            cx="205.749"
                            cy="215.089"
                            rx="12.244"
                            ry="12.834"
                            style={{
                                fill: "transparent",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                        <ellipse
                            cx="205.394"
                            cy="215.078"
                            rx="4.229"
                            ry="4.423"
                            style={{
                                fill: "black",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                    </g>
                </svg>
            ) : labelType === "inner-right" || labelType === "inner-left" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="184.472 254.254 172.073 25.668"
                >
                    <g transform="translate(-9.033 52)">
                        <path
                            d="M218.492 214.036c-.048.051 147.065.33 147.086.308"
                            style={{
                                fill: "#d8d8d8",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                        <ellipse
                            cx="205.749"
                            cy="215.089"
                            rx="12.244"
                            ry="12.834"
                            style={{
                                fill: "transparent",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                        <ellipse
                            cx="205.394"
                            cy="215.078"
                            rx="4.229"
                            ry="4.423"
                            style={{
                                fill: "black",
                                stroke: "grey",
                                strokeWidth: "2px",
                            }}
                        />
                    </g>
                </svg>
            ) : (
                <></>
            )}
        </div>
    );
};

Label.displayName = "Label";

export default Label;
