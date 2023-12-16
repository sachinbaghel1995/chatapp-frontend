import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getMessage = createAsyncThunk(
//   "Message/getData",
//   async (arg, { rejectWithValue }) => {
//     let chats = [];
   
//     try {
//       const token = localStorage.getItem("token");
     
//       const response = await fetch(
//         `api/messages`,
//         {
//           headers: { "Content-Type": "application/json", token: token },
//         }
//       );
     
//       if (!response.ok) {
//         return [...chats].reverse();
//       } else {
//         const data = await response.json();
//         if (!data || data.length === 0) return [...chats].reverse();

//         for (const key in data) {
//           if (chats.length === 15) {
//             chats.shift();
//           }
//           chats.push(data[key]);
//         }
//         return [...chats].reverse();
//       }
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );

const MessageSlice = createSlice({
  name: "Message",
  initialState: { MessageArray: [] },
  reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getMessage.fulfilled, (state, action) => {
//       state.MessageArray = action.payload;
//     });
//   },
});

export default MessageSlice;
