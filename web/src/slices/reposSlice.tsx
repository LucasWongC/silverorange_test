import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { IRepo } from '../types';

// Define a type for the slice state
interface ReposState {
  repos: IRepo[];
}

// Define the initial state using that type
const initialState: ReposState = {
  repos: [],
};

export const reposSlice = createSlice({
  name: 'repos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
  },
});

export const { setRepos } = reposSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRepos = (state: RootState) => state.repos.repos;

export default reposSlice.reducer;
