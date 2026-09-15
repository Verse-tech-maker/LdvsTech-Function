const vm = require("vm");

async function getRaw(url) {
    const response = await fetch(url, {
        headers: {
            "Cache-Control": "no-cache",
            "User-Agent": "raw-api-loader"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`);
    }

    return response.text();
}

function loadModule(source, filename, sock) {
    const module = { exports: {} };

    const sandbox = {
        module,
        exports: module.exports,

        sock,

        console,
        Buffer,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval
    };

    vm.createContext(sandbox);

    try {
        const script = new vm.Script(source, {
            filename
        });

        script.runInContext(sandbox);
    } catch (err) {
        throw new Error(`${filename}: ${err.message}`);
    }

    if (typeof module.exports !== "function") {
        throw new Error(
            `${filename} harus melakukan module.exports = function...`
        );
    }

    return module.exports;
}

async function getGithub(baseUrl, sock) {
    if (!sock) {
        throw new Error("sock wajib diberikan ke getGithub()");
    }

    const base = baseUrl.replace(/\/+$/, "");

    const manifestRaw = await getRaw(`${base}/api.json`);

    let manifest;

    try {
        manifest = JSON.parse(manifestRaw);
    } catch {
        throw new Error("api.json bukan JSON yang valid");
    }

    if (!Array.isArray(manifest)) {
        throw new Error("api.json harus berupa array");
    }

    const api = {};

    for (const item of manifest) {
        if (!item || typeof item !== "object") continue;

        const name = item.name;
        const file = item.file;

        const source = await getRaw(`${base}/${file}`);

        api[name] = loadModule(source, file, sock);
    }

    console.log(`
TERIMAKASIH TELAH MENGGUNAKAN ENDPOINT FUNCTION FREE BY LDVS!!

[ 📧 ] T.ME/VERSENOTDEV
[ 📨 ] T.ME/forcloseOneHitX
`);

    return api;
}

module.exports = {
    getGithub
};
