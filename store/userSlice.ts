import { UserData } from "@/Types";
import { createSlice } from "@reduxjs/toolkit"

interface UserState {
    userData: UserData | undefined;
}

const initialState : UserState = {
    userData : undefined
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state,action) => {
            state.userData = action.payload
        }
    }
});

export const {setUserData} = userSlice.actions

export default userSlice.reducer;