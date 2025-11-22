import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue("User ID is required");
      }

      const q = query(collection(db, "todos"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      const todos = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        todos.push({
          id: doc.id,
          title: data.title || "",
          completed: data.completed || false,
          userId: data.userId,
          userEmail: data.userEmail || "",
          createdAt: data.createdAt,
        });
      });

      return { todos };
    } catch (error) {
      console.error("Error fetching todos:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload, { rejectWithValue }) => {
    try {
      if (!payload.userId) {
        return rejectWithValue("User ID is required");
      }

      if (!payload.title || payload.title.trim() === "") {
        return rejectWithValue("Todo title cannot be empty");
      }

      const todoData = {
        title: payload.title.trim(),
        completed: false,
        userId: payload.userId,
        userEmail: payload.userEmail || "", // Ensure userEmail is never undefined
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "todos"), todoData);

      return {
        todo: {
          id: docRef.id,
          title: payload.title.trim(),
          completed: false,
          userId: payload.userId,
          userEmail: payload.userEmail || "", // Ensure userEmail is never undefined
        },
      };
    } catch (error) {
      console.error("Error adding todo:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodoAsync",
  async (payload, { rejectWithValue }) => {
    try {
      if (!payload.id) {
        return rejectWithValue("Todo ID is required");
      }

      const todoRef = doc(db, "todos", payload.id);
      await updateDoc(todoRef, {
        completed: payload.completed,
      });

      return {
        id: payload.id,
        completed: payload.completed,
      };
    } catch (error) {
      console.error("Error updating todo:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload, { rejectWithValue }) => {
    try {
      if (!payload.id) {
        return rejectWithValue("Todo ID is required");
      }

      const todoRef = doc(db, "todos", payload.id);
      await deleteDoc(todoRef);

      return { id: payload.id };
    } catch (error) {
      console.error("Error deleting todo:", error);
      return rejectWithValue(error.message);
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
  reducers: {
    clearTodos: (state) => {
      state.items = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
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
          state.items = action.payload.todos;
        }
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.todo) {
          state.items.push(action.payload.todo);
        }
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Todo
      .addCase(updateTodoAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const todo = state.items.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Todo
      .addCase(deleteTodoAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearTodos, clearError } = todoSlice.actions;
export default todoSlice.reducer;
