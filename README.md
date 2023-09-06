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
