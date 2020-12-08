import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../store/store';
import {
  deleteUser,
  initialStateType,
  setUsers,
  setSearchEmailString,
  setSearchPhoneString,
  setSearchByStatus, usersType
} from '../store/users-reducers';
import {UserEditForm} from './UserEditForm';
import {UserInputForm} from './UserInputForm';
import {Users} from './Users';

export const UsersContainer = () => {
  //data from localstorage
  const dataFromLocalStorage = localStorage.getItem('users');
  const parsedDataFomStorage: initialStateType = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);
  //data from redux
  const dispatch = useDispatch();
  let users = useSelector<RootStateType, initialStateType>(state => {
    return state.users;
  });
  //local states
  const [isInputMode, setInputMode] = useState<boolean>(false);
  const [filteredUser, setFilteredUser] = useState<usersType[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!parsedDataFomStorage) return;
    else dispatch(setUsers({users: parsedDataFomStorage.users}));
  }, [dispatch]);

  //callbacks
  const deleteUserHandler = (id: string) => {
    if (!parsedDataFomStorage) return;
    let newData = {
      ...parsedDataFomStorage,
      users: parsedDataFomStorage.users.filter(u => u.id !== id)
    };
    localStorage.setItem('users', JSON.stringify(newData));
    dispatch(deleteUser({id}));
  };

  const addUserHandler = () => {
    setInputMode(true);
  };

  const editUserHandler = (id: string) => {
    setEditMode(true);
    setFilteredUser([...users.users.filter(u => u.id === id)]);
  };

  const onChangeSearchEmailStringHandler = (searchString: string) => {
    dispatch(setSearchEmailString({searchEmailString: searchString}));
  };

  const onChangeSearchPhoneStringHandler = (searchString: string) => {
    dispatch(setSearchPhoneString({searchPhoneString: searchString}));
  };

  const onChangeSearchByStatusHandler = (searchString: string) => {
    dispatch(setSearchByStatus({searchByStatus: searchString}));
  };

  return (
    <div>
      {isEditMode
        ? <UserEditForm user={filteredUser[0]} isEditModeHandler={setEditMode}/> : null
      }
      {
        !isInputMode
          ? !isEditMode && <Users
            users={users.users}
            searchEmailString={users.searchEmailString}
            searchPhoneString={users.searchPhoneString}
            searchByStatus={users.searchByStatus}
            deletUserHandler={deleteUserHandler}
            addUserHandler={addUserHandler}
            onChangeSearchEmailStringHandler={onChangeSearchEmailStringHandler}
            onChangeSearchPhoneStringHandler={onChangeSearchPhoneStringHandler}
            onChangeSearchByStatusHandler={onChangeSearchByStatusHandler}
            editModeHandler={editUserHandler}
        />
          : <UserInputForm
            users={users.users}
            isInputModeHandler={setInputMode}/>
      }
    </div>
  );
};