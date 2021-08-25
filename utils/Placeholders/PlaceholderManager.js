exports.parseMessage = (message, message_object) => {
    message = message.replaceAll("{user}", `${message_object}`).replaceAll("{channel}", `${message_object.channel}`).replaceAll("{username}", `${message_object.user.username}`).replaceAll("{guild}", `${message_object.guild.name}`)
    return message;
}