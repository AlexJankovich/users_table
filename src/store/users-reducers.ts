import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

export type initialStateType = {
  users: usersType[]
  searchEmailString: string
  searchPhoneString: string
  searchByStatus:string
};
export type usersType = {
  id: string
  email: string
  password: string
  phone: number
  userName: string
  userPatronymic: string
  userSurname: string
  userStatus: 'client' | 'partner' | 'admin' | ''
  createdData: string
  lastChangeData: string
};

const initialState: initialStateType = {
  users: [],
  searchEmailString: '',
  searchPhoneString: '',
  searchByStatus: ''
};

const UserSlice = createSlice({
  name: 'usersReducer',
  initialState: initialState,
  reducers: {
    addUser(state, action: PayloadAction<{ user: usersType }>) {
      return {...state, users: [...state.users, action.payload.user]};
    },
    deleteUser(state, action: PayloadAction<{ id: string }>) {
      return {...state, users: state.users.filter(u => u.id !== action.payload.id)};
    },
    sortUsers(state, action: PayloadAction<any>) {

    },
    setUsers(state, action: PayloadAction<{ users: usersType[] }>) {
      return {...state, users: [...action.payload.users]};
    },
    setSearchEmailString(state, action: PayloadAction<{ searchEmailString: string }>) {
      state.searchEmailString = action.payload.searchEmailString;
    },
    setSearchPhoneString(state, action: PayloadAction<{ searchPhoneString: string }>) {
      state.searchPhoneString = action.payload.searchPhoneString;
    },
    setSearchByStatus(state, action: PayloadAction<{ searchByStatus: string }>) {
      state.searchByStatus = action.payload.searchByStatus;
    },
  }
});

export const UsersReducer = UserSlice.reducer;
export const {
  addUser,
  deleteUser,
  sortUsers,
  setUsers,
  setSearchEmailString,
  setSearchPhoneString,
  setSearchByStatus
} = UserSlice.actions;