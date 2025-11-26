// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { User, UserState } from "@/infrastructure/types/user";

// const initialState: UserState = {
//   user: null,
//   message: null,
// };

// const userSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//       state.message = null;
//     },
//     logout(state) {
//       state.user = null;
//       state.message = null;
//     },
//     updateUser(state, action: PayloadAction<Partial<User>>) {
//       state.user = { ...state.user, ...action.payload };
//     },
//   },
// });

// export const { setUser, logout, updateUser } = userSlice.actions;
// export default userSlice.reducer;
