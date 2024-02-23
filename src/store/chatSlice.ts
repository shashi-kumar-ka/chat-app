// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Details, Message } from '../components/chat';

// interface ChatState {
//   chats: Details[];
//   selectedChatId: number | null;
// }

// const initialState: ChatState = {
//   chats: [],
//   selectedChatId: null,
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     setChats(state, action: PayloadAction<Details[]>) {
//       state.chats = action.payload;
//     },
//     selectChat(state, action: PayloadAction<number>) {
//       state.selectedChatId = action.payload;
//     },
//     addMessage(state, action: PayloadAction<{ chatId: number; message: Message }>) {
//       const { chatId, message } = action.payload;
//       const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
//       if (chatIndex !== -1) {
//         state.chats[chatIndex].messageList.push(message);
//       }
//     },
//   },
// });

// export const { setChats, selectChat, addMessage } = chatSlice.actions;

// export default chatSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Details, Message } from '../components/chat';
import axios from 'axios';
// import { RootState } from './store';
interface ChatState {
  chats: Details[];
  selectedChatId: number | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Details[]>) {
      state.chats = action.payload;
    },
    selectChat(state, action: PayloadAction<number>) {
      state.selectedChatId = action.payload;
    },
    addMessage(state, action: PayloadAction<{ chatId: number; message: Message }>) {
      const { chatId, message } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].messageList.push(message);
      }
    },
  },
});

export const fetchChats = createAsyncThunk(
    'chat/fetchChats',
    async (_, { dispatch }) => { 
      try {
        const response = await axios.get('https://my-json-server.typicode.com/codebuds-fk/chat/chats');
        dispatch(setChats(response.data));
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }
  );
  

export const { setChats, selectChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
