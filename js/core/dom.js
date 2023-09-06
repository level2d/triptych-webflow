/**
 * @public
 * @namespace dom
 * @memberof core
 * @description Holds high-level cached nodes.
 *
 */
const dom = {
    /**
     *
     * @public
     * @member homeScene
     * @memberof core.dom
     * @description cached nodes for HomeScene module
     *
     */
    homeScene: $("[data-home-scene]"),

    /**
     *
     * @public
     * @member popQuote
     * @memberof core.dom
     * @description cached nodes for PopQuote module
     *
     */
    popQuote: $("[data-pop-quote]"),
};

export default dom;
