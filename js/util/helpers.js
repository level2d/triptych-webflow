import { Texture } from "@babylonjs/core";

export const zeroPad = (num, places) => String(num).padStart(places, "0");

export const whenAllReady = function (textures, resolve) {
    let numRemaining = textures.length;
    if (numRemaining === 0) {
        resolve();
        return;
    }

    for (var i = 0; i < textures.length; i++) {
        var texture = textures[i];

        if (texture.isReady()) {
            if (--numRemaining === 0) {
                resolve();
                return;
            }
        } else {
            var onLoadObservable = texture.onLoadObservable;

            if (onLoadObservable) {
                onLoadObservable.addOnce(() => {
                    if (--numRemaining === 0) {
                        resolve();
                    }
                });
            }
        }
    }
};

export const loadTexturesAsync = function (textureUrls = [], scene) {
    return new Promise((resolve, reject) => {
        if (textureUrls.length <= 0) reject();

        var textures = [];

        for (var url of textureUrls) {
            textures.push(new Texture(url, scene));
        }

        whenAllReady(textures, () => resolve(textures));
    });
};
