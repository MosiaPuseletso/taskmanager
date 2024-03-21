import { createSlice } from "@reduxjs/toolkit";

import { authAccount } from "@/src/api";

const userSlice = createSlice({
    name: 'user',
    initialState: { token: null },
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(authAccount.fulfilled, (state, action) => {
            state.token = action.payload['accessToken'];
        });
    }
});

export default userSlice;