export function generateConversation(messageList: any[], recipient: any) {
    const messageListCopy = [...messageList];

    // Figure out a way to parse the array
    // {id: num, is_me: boolean, message: string, timestamp: string}
    // Sort messages by timestamp in ascending order
    messageListCopy.sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
        return dateA.getTime() - dateB.getTime();
    });

    // Build conversation string.
    let conversation = '';
    messageListCopy.forEach(message => {
        if (message.is_me) {
            conversation += `Me: ${message.message}\n`;
        } else {
            conversation += `${recipient}: ${message.message}\n`; // Label messages from the recipient with their name.
        }
    });

    return conversation;
}

export function extractImportantPoints(messageList: any[], recipient: any) {
  const keywords = ['meeting', 'deadline', 'urgent', 'attachment'];
  // Enhanced pattern to include filenames with extensions
  const fileExtensionsPattern = /(\b\w+[-\w]*(?:\.\w+)+\b)/g;

  return messageList
    .filter(message =>
      keywords.some(keyword => message.message.toLowerCase().includes(keyword)) ||
      fileExtensionsPattern.test(message.message))
    .map(message => {
      const prefix = message.is_me ? 'Me: ' : `${recipient}: `;
      // Reset the lastIndex of the global regex to ensure proper matching
      fileExtensionsPattern.lastIndex = 0;
      let parts = [], match;
      let lastIndex = 0;

      // Extract and mark filenames with their extensions for styling
      while ((match = fileExtensionsPattern.exec(message.message)) !== null) {
        // Push preceding text if any
        if (match.index > lastIndex) {
          parts.push({ text: message.message.slice(lastIndex, match.index), isFile: false });
        }
        // Push matched filename
        parts.push({ text: match[0], isFile: true });
        lastIndex = match.index + match[0].length;
      }
      // Push remaining text if any
      if (lastIndex < message.message.length) {
        parts.push({ text: message.message.slice(lastIndex), isFile: false });
      }

      return { prefix, parts };
    });
}