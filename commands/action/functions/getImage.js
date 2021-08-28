const fetch = require("node-fetch")

exports.getImage = (tag) => {
    let search = fetch(`https://safebooru.org/index.php?page=dapi&s=post&tags=${tag}&q=index&pid=1&limit=9&json=1`)

    return search.then(r => {
        return r.json()
    }).then(d => {
        let image = d[Math.floor(Math.random() * d.length)];
        return image;
    })
}