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
     * @member document
     * @memberof core.dom
     * @description root page document
     *
     */
    document: $(document.documentElement),

    /**
     *
     * @public
     * @member body
     * @memberof core.dom
     * @description page body
     *
     */
    body: $(document.body),

    /**
     * @public
     * @member loader
     * @memberof core.dom
     * @description cached node for Loader module
     */
    loader: $("[data-module='loader']"),

    /**
     *
     * @public
     * @member fancyImage
     * @memberof core.dom
     * @description cached nodes for fancyImage module
     *
     */
    fancyImage: $("[data-module='fancy-image']"),

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
     * @member backgroundFx
     * @memberof core.dom
     * @description cached nodes for backgroundFx module
     *
     */
    backgroundFx: $("[data-module='background-fx']"),

    /**
     *
     * @public
     * @member keepScrolling
     * @memberof core.dom
     * @description cached nodes for keepScrolling module
     *
     */
    keepScrolling: $("[data-module='keep-scrolling']"),

    /**
     *
     * @public
     * @member popQuote
     * @memberof core.dom
     * @description cached nodes for PopQuote module
     *
     */
    popQuote: $("[data-module='pop-quote']"),

    /**
     *
     * @public
     * @member scrambleText
     * @memberof core.dom
     * @description cached nodes for ScrambleText module
     *
     */
    scrambleText: $("[data-module='scramble-text']"),
};

export default dom;
