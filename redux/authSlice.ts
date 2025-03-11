import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  error: null,
};

// ✅ Async action to handle login API call
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Invalid credentials");
      }

      return credentials.username; // Return username if login succeeds
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

// ✅ Async action to handle logout API call
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.username = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.username = null;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        state.error = null;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
