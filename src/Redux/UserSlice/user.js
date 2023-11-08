import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:'user',
    initialState:{
        id: "",
        name: "",
        username:"",
        email:"",
        picture:"",
        is_google:"",
        type:""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.id=action.payload.id
            state.picture=action.payload.picture
            state.type=action.payload.type
            state.is_google=action.payload.is_google
            state.username=action.payload.username
        }
    }
})

export const {updateUser} =UserSlice.actions
export default UserSlice.reducer