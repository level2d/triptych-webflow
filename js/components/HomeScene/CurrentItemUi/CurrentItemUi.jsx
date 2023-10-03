import { useStore } from "@/js/lib/store";
import NavButton from "../NavButton";
import styles from "./CurrentItemUi.module.scss";

export default function CurrentItemUi() {
    const resetCurrentBoxUuid = useStore((state) => state.resetCurrentBoxUuid);
    return (
        <div className={styles.currentItemUi}>
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
