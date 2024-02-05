import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUserByToken, createUser, loginUser, resetPassword, resetPasswordRequest, signoutUser, updateUserAddresses } from './authApi';

const initialState = {
  loggedInUser: null,
  userAddresses: [],
  resetStatus: null,
  status: 'idle',
  // BELOW CHECKAUTH STATE RESPONSIBLE FOR BLOCKING ROUTES IF USER IS NOT THERE AND IT ALSO HELPS IN MAKING SITE REACH AT THAT POINT WHERE IT WAS RELOADED COZ WHEN WE REOLAD THE SITE SITE GOES BACK TO "/" DUE TO OUR ROUTING SO WE HAVE TO BLOCK ROUTES UNTIL USER GET LOOGED
  checkAuth: false
};




export const checkUserByTokenAsync = createAsyncThunk(
  'auth/checkUserByToken',
  async (a, { rejectWithValue }) => {
    try {
      const response = await checkUserByToken();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

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

export const signoutUserAsync = createAsyncThunk(
  'auth/signoutUser',
  async () => {
    const response = await signoutUser();
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
      .addCase(checkUserByTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserByTokenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.checkAuth = true;
      })
      .addCase(checkUserByTokenAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
        state.checkAuth = true;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.checkAuth = true;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
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
      .addCase(signoutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
        state.checkAuth = true;
      })
  },
});

export const { logoutUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectResetStatus = (state) => state.auth.resetStatus;
export const selectCheckAuth = (state) => state.auth.checkAuth;
// export const selectuserAddresses = (state) => state.auth.userAddresses;

export default authSlice.reducer;
