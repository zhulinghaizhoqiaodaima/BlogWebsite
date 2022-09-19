import { createSlice } from '@reduxjs/toolkit'

interface data {
    id:any,
    text:any,
    completed:any,
}
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state:any, action) {
        let todo:data = {
            id: action.payload.id,
            text: action.payload.text,
            completed: false
          }
      state.push(todo)
    },
    todoToggled(state, action) {
      const todo:any = state.find((todo:any) => todo.id === action.payload)
      todo.completed = !todo.completed
    }
  }
})

export const { todoAdded, todoToggled } = todosSlice.actions
export default todosSlice.reducer