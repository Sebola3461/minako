const fetch = require("node-fetch")

exports.searchAnime = (animeName) => {
    const anime = fetch(`https://api.minako.moe/public/anime/search/${animeName}`);

    return anime.then(r => {
        return r.json()
    }).then(d => {
        return d;
    })
}

exports.fetchAnime = (animeID) => {
    const anime = fetch(`https://api.minako.moe/public/anime/${animeID}`);

    return anime.then(r => {
        return r.json()
    }).then(d => {
        return d;
    })
}