import { configureStore } from "@reduxjs/toolkit";

import MessageSlice from "./MessageSlice";

const store = configureStore({
    reducer:{ Message: MessageSlice.reducer}
})


export const MessageAction = MessageSlice.actions;
export default store;