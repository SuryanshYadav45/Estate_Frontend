import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    currentuser:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state,action)=>
        {
            state.loading=true;

            
        },
        signinEnd:(state,action)=>{
            state.currentuser=action.payload;
            state.loading=false;
            
        },
        // updateToken:(state,action)=>{
        //     state.currentuser=action.payload;
        // },
        logout:(state)=>{
            state.loading=false;
            state.currentuser=null;
        }
    }

})

export const{signinStart,signinEnd,logout}=userSlice.actions;
export default userSlice.reducer;