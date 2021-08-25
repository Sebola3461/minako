exports.parseMessage = (message, message_object) => {
    message = message.replaceAll("{user}", `${message_object.author}`).replaceAll("{channel}", `${message_object.channel}`)
    return message;
}