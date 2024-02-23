export interface Option {
    optionText: string;
    optionSubtext: string;
}

export interface Message {
    messageId: string;
    message: string;
    timestamp: number;
    sender: 'USER' | 'BOT';
    messageType: string;
    options?: {
        optionText: string;
        optionSubtext: string;
    }[];
}


export interface Details {
    id: number;
    title: string;
    imageURL: string;
    orderId: string;
    latestMessageTimestamp: number;
    messageList: Message[];
}