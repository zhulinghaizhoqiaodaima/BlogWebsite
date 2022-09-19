import { createSlice } from '@reduxjs/toolkit'

const changeSpiningSlice = createSlice({
    name: 'spining',
    initialState: {
        isLoading:true,
    },
    reducers: { //actions
        changeSpining(state: any, action) {
            state.isLoading = action.payload.isLoading
        }
    }   
})

export const { changeSpining } = changeSpiningSlice.actions
export default changeSpiningSlice.reducer