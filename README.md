# Setup

### Env

Create a `.env` file with the following contents

```
PRODUCTION_URL=https://MY-PROJECT.cdn.app
```

### Webflow

Add the following code block to your webflow global site footer

```
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
