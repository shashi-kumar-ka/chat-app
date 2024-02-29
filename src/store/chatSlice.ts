import { createSlice } from "@reduxjs/toolkit";

interface Message {
  messageId: string;
  message: string;
  timestamp: number;
  sender: string;
  messageType: string;
}

interface Chat {
  id: number;
  title: string;
  imageURL: string;
  orderId: string;
  latestMessageTimestamp: number;
  messageList: Message[];
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messageList.push(message);
      }
    },
  },
});

export const { setChats, addMessage } = chatSlice.actions;
export default chatSlice.reducer;

