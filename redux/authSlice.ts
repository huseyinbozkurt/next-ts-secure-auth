import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  error: string;
  isAuthenticated: boolean;
  username: string | null;
}

const loadAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("authState");
    return storedAuth
      ? JSON.parse(storedAuth)
      : {
          isAuthenticated: false,
          username: null,
          error: "",
        };
  }
  return {
    isAuthenticated: false,
    username: null,
    error: "",
  };
};

const initialState: AuthState = loadAuthState();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    if (credentials.username === "user" && credentials.password === "pass") {
      return credentials.username;
    } else {
      return rejectWithValue("Invalid credentials");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authState");
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.username = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("authState", JSON.stringify(state));
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("authState");
        }
      });
  },
});

export default authSlice.reducer;
