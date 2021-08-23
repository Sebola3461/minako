const fetch = require("node-fetch")
const { my_anime_list_token } = require("./../../../config/settings.json")
const Parser = require("fast-xml-parser");

exports.searchAnime = (anime_name) => {
    let anime = fetch(`https://myanimelist.net/search/prefix.json?type=anime&keyword=${anime_name}&v=1`, {
        "headers": {
            "accept": "application/json",
        },
        "method": "GET",
    })

    return anime.then(r => {
        return r.json();
    }).then(d => {
        return d;
    })
}

exports.fetchAnime = (anime_id) => {
    var defaultOptions = {
        attributeNamePrefix: "@_",
        attrNodeName: "@", //default is false
        textNodeName: "#text",
        ignoreAttributes: true,
        cdataTagName: "__cdata", //default is false
        cdataPositionChar: "\\c",
        format: false,
        indentBy: "  ",
        supressEmptyNode: false,
        tagValueProcessor: a => he.encode(a, { useNamedReferences: true }), // default is a=>a
        attrValueProcessor: a => he.encode(a, { isAttributeValue: isAttribute, useNamedReferences: true }) // default is a=>a
    };

    let anime = fetch(`https://myanimelist.net/anime/${anime_id}`, {
        "method": "GET",
    })

    return anime.then(r => {
        return r.text();
    }).then(d => {
        let parser = new Parser(defaultOptions);
        parser.parse()
        console.log(d)
        return d;
    })
}