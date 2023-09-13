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

## Fancy Image

Requirements:

-   This module's attributes must exist on a Webflow image element.
-   This module only supports object-fit styles of "contain" or "cover". Make sure your root Webflow image element has the same `object-fit` style value as the `data-object-fit` attribute.
-   The Webflow image element must be inside a containing div. The containing div doesn't need to have any styling. It just needs to exist.

E.g. this is wrong:

```
<img src="/image1-url.jpg" data-module="fancy-image">
<img src="/image2-url.jpg" data-module="fancy-image">
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

**Attributes**
| name | required? | value | default | description |
|----------------------- |----------- |-------------------- |----------- |------------------------------------------------------------------------------------- |
| data-module | yes | "fancy-image" | n/a | Tells our custom code that you want to create a fancy image. |
| data-object-fit | no | "contain"\|"cover" | "contain" | Tells our custom code what object-fit scaling behavior the fancy image should have. |
| data-dithered-enabled | no | n/a | n/a | Tells our custom code that you want your fancy image to be dithered. |
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
