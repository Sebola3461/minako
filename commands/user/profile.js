const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js')
const request = require('request').defaults({ encoding: null });

exports.run = (message, args) => {
    const width = 720
    const height = 600

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    //require("./../../static/profileoverlay.png")
    let avatar = message.author.avatar;
    loadImage(__dirname + '/../../static/profileoverlay.png').then(image => {
        request.get("https://cdn.discordapp.com/avatars/556639598172962818/a_61db940fa5eb7ed851804a9abb8d8c51.gif?size=2048", function(err, res, body) {
            loadImage(body).then(img => {
                loadImage(__dirname + '/../../static/defaultbanner.png').then(image => {
                    context.drawImage(img, 52, 200, 200, 200)
                    context.drawImage(image, 0, 0, 720, 600)
                    const buffer = canvas.toBuffer('image/png')
                    message.channel.send(new MessageAttachment(buffer, "profile.png"))
                })
            }).catch(e => {
                console.error(e)
            })
        });
    })
}