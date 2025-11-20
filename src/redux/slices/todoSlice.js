import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://react-projects-1b8fb-default-rtdb.firebaseio.com";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos.json`);
      return { todos: response.data };
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/todos.json`, {
        title: payload.title,
        completed: false,
      });

      // Firebase returns { name: "unique-id" }
      return {
        todo: {
          id: response.data.name, // Firebase-generated ID
          title: payload.title, // Use the original title
          completed: false,
        },
      };
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodoAsync",
  async (payload) => {
    try {
      await axios.patch(`${BASE_URL}/todos/${payload.id}.json`, {
        completed: payload.completed,
      });
      return { id: payload.id, completed: payload.completed };
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${payload.id}.json`);
      return { id: payload.id };
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Todos
      .addCase(getTodosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.todos) {
          // Convert Firebase object to array
          const firebaseTodos = Object.keys(action.payload.todos).map(
            (key) => ({
              id: key,
              ...action.payload.todos[key],
            })
          );
          state.items = firebaseTodos;
        }
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.todo) {
          state.items.push(action.payload.todo);
        }
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Todo
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const todo = state.items.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })

      // Delete Todo
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo.id !== action.payload.id
        );
      });
  },
});

export default todoSlice.reducer;
