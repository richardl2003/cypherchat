function generateConversation(messageList: any[], recipient: any) {
    const messageListCopy = [...messageList]

    // Figure out a way to parse the array
    // {id: num, is_me: boolean, message: string, timestamp: string}
    // Sort messages by timestamp in ascending order
    messageListCopy.sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
        return dateA.getTime() - dateB.getTime();
    });

    // Build conversation
    let conversation = '';
     messageListCopy.forEach(messageListCopy => {
    if (messageListCopy.is_me) {
        conversation += `Me: ${messageListCopy.message}\n`;
    } else {
        conversation += `${recipient}: ${messageListCopy.message}\n`;
    }
    });  
    return conversation
} 

export default { generateConversation }