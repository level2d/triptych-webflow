export const isTouchSupported =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

export const isDeviceMotionEventSupported =
    typeof DeviceMotionEvent === "function";

export const isGyroExperienceEnabled =
    isTouchSupported && isDeviceMotionEventSupported;
