import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
export const getMessage = createAsyncThunk(
  "Message/getData",
  async (arg, { rejectWithValue }) => {
    let chats = [];
    const groupName = `${arg.userId}`;
    if (localStorage[groupName]) {
      const arr = JSON.parse(localStorage.getItem(groupName));
      chats = arr;
    }
    try {
      const token = localStorage.getItem("token");
      const ofs = chats.length > 0 ? chats[chats.length - 1].id : 0;
      const response = await fetch(
        `/api/messages/getmessage?offset=${ofs}&user=${+arg.userId}`,
        { headers: { Authorization: token } }
      );
     
      if (!response.ok) {
        return [...chats].reverse();
      } else {
        const data = await response.json();
        if (!data || data.length === 0) return [...chats].reverse();

        for (const key in data) {
          if (chats.length === 15) {
            chats.shift();
          }
          chats.push(data[key]);
        }
        localStorage.setItem(groupName, JSON.stringify(chats));
        return [...chats].reverse();
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const MessageSlice = createSlice({
  name: "Message",
  initialState: { MessageArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.MessageArray = action.payload;
    });
  },
});

export default MessageSlice;
