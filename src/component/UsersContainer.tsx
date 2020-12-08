import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../store/store';
import {
  deleteUser,
  initialStateType,
  setUsers,
  setSearchEmailString,
  setSearchPhoneString,
  setSearchByStatus
} from '../store/users-reducers';
import {UserForm} from './UserForm';
import {Users} from './Users';

export const UsersContainer = () => {

  const dataFromLocalStorage = localStorage.getItem('users');
  const parsedDataFomStorage: initialStateType = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);

  const dispatch = useDispatch();
  let users = useSelector<RootStateType, initialStateType>(state => {
    return state.users;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!parsedDataFomStorage) return;
    else dispatch(setUsers({users: parsedDataFomStorage.users}));
  }, [dispatch]);

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
    setIsEditMode(true);
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
      {
        !isEditMode
          ? <Users
            users={users.users}
            searchEmailString={users.searchEmailString}
            searchPhoneString={users.searchPhoneString}
            searchByStatus={users.searchByStatus}
            deletUserHandler={deleteUserHandler}
            addUserHandler={addUserHandler}
            onChangeSearchEmailStringHandler={onChangeSearchEmailStringHandler}
            onChangeSearchPhoneStringHandler={onChangeSearchPhoneStringHandler}
            onChangeSearchByStatusHandler={onChangeSearchByStatusHandler}
          />
          : <UserForm
            users={users.users}
            isEditModeHandler={setIsEditMode}/>
      }
    </div>
  );
};