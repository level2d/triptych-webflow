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
     * @member homeExperience
     * @memberof core.dom
     * @description cached nodes for homeExperience module
     *
     */
    homeExperience: $("[data-module='home-experience']"),

    /**
     *
     * @public
     * @member popQuote
     * @memberof core.dom
     * @description cached nodes for PopQuote module
     *
     */
    popQuote: $("[data-module='pop-quote']"),
};

export default dom;
