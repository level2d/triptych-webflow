# Setup

### Env

Create a `.env` file with the following contents

```
PRODUCTION_URL=https://MY-PROJECT.cdn.app
```

### Webflow

Add the following code block to your webflow global site footer
See [here](https://github.com/vitejs/vite/issues/1984#issuecomment-778403608) for why we need the extra `@react-refresh` script.

```
<!-- Script needed for @vitejs/plugin-react -->
<script type="module">
    import RefreshRuntime from "https://localhost:3000/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
</script>
<!-- Inject dev scripts or production script -->
<script>
(function () {
    const LOCALHOST_URL = [
        "https://localhost:3000/@vite/client",
        "https://localhost:3000/js/main.js",
    ];
    const PRODUCTION_URL = ["https://MY-PROJECT.cdn.app/main.js"];

    function createScripts(arr, isDevMode) {
        return arr.map(function (url) {
            const s = document.createElement("script");
            s.src = url;

            if (isDevMode) {
                s.type = "module";
            }

            return s;
        });
    }

    function insertScript(scriptArr) {
        scriptArr.forEach(function (script) {
            document.body.appendChild(script);
        });
    }

    const localhostScripts = createScripts(LOCALHOST_URL, true);
    const productionScripts = createScripts(PRODUCTION_URL, false);

    let chosenScripts = null;

    fetch(LOCALHOST_URL[0], {})
        .then(() => {
            chosenScripts = localhostScripts;
        })
        .catch((e) => {
            chosenScripts = productionScripts;
            console.error(e);
        })
        .finally(() => {
            if (chosenScripts) {
                insertScript(chosenScripts);

                return;
            }

            console.error("something went wrong, no scripts loaded");
        });
})();
</script>
```

# Modules

## Loader

Requirements:

-   This module can only be used once per page
-   Best approach is to add this to the `body` of the page you want it to show up on
-   Add the following styles to the global site header

```html
<style>
    [data-module="loader"] {
        background-color: #343434;
    }
    [data-module="loader"]:not(.is-ready) * {
        visibility: hidden;
    }
    [data-module="loader"] #loader,
    [data-module="loader"] #loader * {
        visibility: visible;
    }
</style>
```

**Attributes**
| name | required | value | default | description |
|------------- |---------- |---------- |--------- |--------------------------------------------------------- |
| data-module | yes | "loader" | n/a | Tells our custom code where to render the Loader module |

## Fancy Image

Requirements:

-   This module's attributes must exist on a Webflow image element.
-   The Webflow image element must have it's `load` setting set to `Eager:lLoads with page`.
-   This module only supports object-fit styles of "contain" or "cover". Make sure your root Webflow image element has the same `object-fit` style value as the `data-object-fit` attribute.
-   The Webflow image element must be inside a containing div. The containing div doesn't need to have any styling. It just needs to exist.

E.g. this is wrong:

```html
<img src="/image1-url.jpg" data-module="fancy-image" />
<img src="/image2-url.jpg" data-module="fancy-image" />
```

E.g. this is correct:

```
<div>
    <img src="/image1-url.jpg" data-module="fancy-image">
</div>
<div>
    <img src="/image2-url.jpg" data-module="fancy-image">
</div>
```

-   You must add the following code block to the site head code to prevent a FOUT on page load

```html
<style>
    img[data-module="fancy-image"] {
        visibility: hidden;
    }
</style>
```

**Attributes**
| name | required? | value | default | description |
| ---------------------------- | --------- | ------------------ | --------- | ----------------------------------------------------------------------------------- |
| data-module | yes | "fancy-image" | n/a | Tells our custom code that you want to create a fancy image. |
| data-object-fit | no | "contain"\|"cover" | "contain" | Tells our custom code what object-fit scaling behavior the fancy image should have. |
| data-dither-enabled | no | n/a | n/a | Tells our custom code that you want your fancy image to be dithered. |
| data-pixel-animation-enabled | no | n/a | n/a | Tells our custom code that you want this image to pixel animate in |
| data-hover | no | n/a | n/a | Enables a hover effect |

## Pop Quote

**Attributes**
| name | required? | value | description |
|------------- |----------- |------------- |------------------------------------------------------------------ |
| data-module | yes | "pop-quote" | Tells our custom code that you want to inject a pop-quote module |

## Lenis

**Attributes**
| name | required | value | description |
|-------------------- |---------- |------- |-------------------------------------------------------------------------------------------------------- |
| data-lenis-prevent | no | n/a | Add this to any element where lenis smooth scroll should be disabled. E.g. `<iframe>`, `<canvas>`,etc. |

## Home Experience

**Attributes**
| name | required | value | description |
|------------- |---------- |------------------- |------------------------------------------------------------------ |
| data-module | yes | "home-experience" | Tells our custom code where to render the Home Experience module |

## Background FX

**Attributes**
| name | required | value | description |
|------------- |---------- |------------------- |------------------------------------------------------------------ |
| data-module | yes | "background-fx" | Tells our custom code where to render the BackgroundFx module |

Requirements:

-   This should be applied to a `div` element at the top of any page that should include the background FX module. Refer to the example below for necessary styles.
-   All content for the page needs to be contained within a second `div`element as a sibling to the background FX element. Refer to the example below for necessary styles.

Here is the expected layout for the DOM elements:

```html
<!-- NOTE: navigation elements (menus, etc.) will go outside of the content-wrapper -->
<div class="background-fx" data-module="background-fx"></div>
<div class="content-wrapper">...{content in here}...</div>
```

-   In addition, apply the necessary css styles to the elements:

```html
<style>
    .background-fx {
        position: absolute;
        height: 100vh;
        (thismayhavetobetweakedtoaccountfortheentirepage...)width: 100vw;
        z-index: 0;
    }

    .content-wrapper {
        position: relative;
        pointer-events: none;
        height: 100vh;
        width: 100vw;
        z-index: 1;
    }
</style>
```

## Keep Scrolling

**Attributes**
| name | required | value | description |
|-------------|----------|------------------|-----------------------------------------------------------------|
| data-module | yes | "keep-scrolling" | Tells our custom code where to render the Keep Scrolling module |

## Scramble Text

Requirements:

-   You can only use this module on an empty node, or on a node that only contains text.

E.g.:

```html
<h1 data-module="scramble-text">My Heading</h1>
```

or

```html
<span data-module="scramble-text" data-text="Text to scramble"></span>
```

**Attributes**
| name | required | value | description |
|-------------|----------|-----------------|----------------------------------------------------------------|
| data-module | yes | "scramble-text" | Tells our custom code where to render the Scramble Text module |
| data-text. | no. | `string` | Optionally specify a string to scramble via a data attribute |

## Fade In Text

Requirements:

-   You need to use this module on a node that contains text

E.g.:

```html
<h1 data-module="fade-in-text">My Heading</h1>
```

**Attributes**
| name | required | value | description |
|-------------|----------|-----------------|----------------------------------------------------------------|
| data-module | yes | "fade-in-text" | Tells our custom code where to render the Fade In Text module |

## Sound Effects

E.g:

```html
<!-- You can combined multiple triggers -->
<button data-sfx-trigger="click hover">I'm a Buttong</button>
```

**Attributes**
| name | required | value | description |
|-------------|----------|-----------------|----------------------------------------------------------------|
| data-sfx-trigger | yes | "hover", "click" | Tells our custom code what sound interactions trigger sound effects |

## Soundtracks

E.g:

```html
<button data-sountrack-trigger="subpages_soundtrack">I'm a Button</button>
```

**Attributes**
| name | required | value | description |
|-------------|----------|-----------------|----------------------------------------------------------------|
| data-sountrack-trigger | yes | "subpages_soundtrack" | Tells our custom code what sound interactions trigger sound effects |
