import { createSlice } from '@reduxjs/toolkit'

const collapsedSlice = createSlice({
    name: 'collapsed',
    initialState: {
        isCollapsed:false,
    },
    reducers: { //actions
        changeCollapsed(state: any, action) {
            state.isCollapsed =!action.payload.collapsed
        }
    }
})

export const { changeCollapsed } = collapsedSlice.actions
export default collapsedSlice.reducer