import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, resetPassword, resetPasswordRequest, updateUserAddresses } from './authApi';

const initialState = {
  loggedInUser: null,
  userAddresses: [],
  resetStatus: null,
  status: 'idle',
};






export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (newUser) => {
    const response = await createUser(newUser);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (user) => {
    const response = await loginUser(user);
    return response.data;
  }
);


export const updateUserAddressesAsync = createAsyncThunk(
  'auth/updateUserAddresses',
  async (user) => {
    const response = await updateUserAddresses(user);
    return response.data;
  }
);


export const resetPasswordRequestAsync = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (user) => {
    const response = await resetPasswordRequest(user);
    return response.data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (newPassword) => {
    const response = await resetPassword(newPassword);
    return response.data;
  }
);















export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAddressesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAddressesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetStatus = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetStatus = action.payload;
      })
  },
});

export const { logoutUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectResetStatus = (state) => state.auth.resetStatus;
// export const selectuserAddresses = (state) => state.auth.userAddresses;

export default authSlice.reducer;
