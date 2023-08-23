import EventEmitter from "events";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Resources extends EventEmitter {
    loaders = {};
    sources = [];
    items = {};
    toLoad = 0;
    loaded = 0;

    constructor(sources) {
        super();

        // options
        if (Array.isArray(sources)) {
            this.sources = sources;
            // setup
            this.toLoad = this.sources.length;
        }

        this.init();
    }

    startLoading() {
        this.sources.forEach((source) => {
            const { type, path } = source;

            switch (type) {
                case "gltfModel": {
                    this.loaders.gltfLoader.load(path, (file) => {
                        this.handleSourceLoaded(source, file);
                    });
                    break;
                }
                case "texture":
                    {
                        this.loaders.textureLoader.load(path, (file) => {
                            this.handleSourceLoaded(source, file);
                        });
                    }
                    break;
                default:
                    console.error("No loader configured for source:", source);
                    break;
            }
        });
    }

    handleSourceLoaded(source, file) {
        const { name } = source;
        this.items[name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.emit("ready");
        }
    }

    initLoaders() {
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
    }

    init() {
        this.initLoaders();
        this.startLoading();
    }
}
