exports.run = (message, args) => {
    let chance = 0;
    let replies = ["No.", "Probably no.", "Maybe no.", "Maybe yes...", "Follow your heart...", "Luck is on your side, probably yes!", "Perhaps, I can look at it.", "Absolutely yes.", "Sure why not? This is a fact."]

    args.splice(0, 1)

    if (args.includes("money") | args.includes("gay") | args.includes("waifu") | args.includes("i")) chance = 5.25;
    if (args.includes("?")) chance = 5.35;
    chance = chance += args.length / args.join(" ").length;
    chance = chance -= message.author.username.length / message.author.id.length;
    chance = 10 % chance;
    chance = chance * 10;
    chance = new String(chance)
    chance = chance[0];
    chance = new Number(chance).valueOf()
    message.channel.send(replies[chance])
}