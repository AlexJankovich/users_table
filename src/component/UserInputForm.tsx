import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addUser, usersType} from '../store/users-reducers';
import s from './Users.module.css';
import {v4 as uuid} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';


type UserFormPropsType = {
  users: usersType[]
  isInputModeHandler: (isEditMode: boolean) => void
}

export const UserInputForm = (props: UserFormPropsType) => {

  const dispatch = useDispatch();
//initialize hook-form
  const {register, handleSubmit, errors} = useForm<usersType>();

  const onSubmit = (data: usersType) => {

    const newId = {id: uuid()};
    const newData: usersType = {...data, ...newId};
    //data from localstorage
    const dataFromLocalStorage = localStorage.getItem('users');
    const parsedData = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);
    //to localstorage
    const newLocalStorageData = parsedData
      ? {...parsedData, users: [...parsedData.users, newData]}
      : {users: [{...newData}]};
    localStorage.setItem('users', JSON.stringify(newLocalStorageData));
    //to store
    dispatch(addUser({user: newData}));
    props.isInputModeHandler(false);
  };

  return (
    <div>

      <h1>Введите информацию о пользователе</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.tableHead}>
          <div>Email</div>
          <div>Пароль</div>
          <div>Телефон</div>
          <div>Имя</div>
          <div>Отчество</div>
          <div>Фамилия</div>
          <div>Статус</div>
          <div>Дата создания</div>
          <div>Дата изменения</div>
          <div className={s.button}>
            <button onClick={() => props.isInputModeHandler(false)}>
              <FontAwesomeIcon icon={faWindowClose}/>
            </button>
          </div>
        </div>

        <div className={s.tableRows}>
          <div>
            <input
              type="text"
              placeholder='email'
              ref={register({
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                }
              )}
              name='email'/>
            {errors?.email?.type === 'required' && <p className={s.errorStyle}>введите email</p>}
            {errors?.email?.type === 'pattern' && <p className={s.errorStyle}>введите корректный email</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='пароль'
              ref={register({
                required: true,
                minLength: 4,
                maxLength: 8
              })}
              name='password'/>
            {errors?.password?.type === 'required' && <p className={s.errorStyle}>введите пароль</p>}
            {errors?.password?.type === 'minLength' && <p className={s.errorStyle}>от 4 до 8 символов</p>}
            {errors?.password?.type === 'maxLength' && <p className={s.errorStyle}>от 4 до 8 символов</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='телефон'
              ref={register({
                required: true,
                pattern: /\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/
              })}
              name='phone'/>
            {errors?.phone?.type === 'required' && <p className={s.errorStyle}>введите телефон</p>}
            {errors?.phone?.type === 'pattern' && <p className={s.errorStyle}>введите корректный номер</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='Имя'
              ref={register({
                required: true
              })}
              name='userName'/>
            {errors?.userName?.type === 'required' && <p className={s.errorStyle}>введите имя</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='Отчество'
              ref={register({
                required: true
              })}
              name='userPatronymic'/>
            {errors?.userPatronymic?.type === 'required' && <p className={s.errorStyle}>введите отчество</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='Фамилия'
              ref={register({
                required: true
              })}
              name='userSurname'/>
            {errors?.userSurname?.type === 'required' && <p className={s.errorStyle}>введите фамилию</p>}
          </div>

          <div>
            <select
              ref={register}
              name='userStatus'>
              <option value="client">client</option>
              <option value="partner">partner</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder='дата создания'
              ref={register({
                required: true,
                pattern: /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/
              })}
              name='createdData'/>
            {errors?.createdData?.type === 'required' && <p className={s.errorStyle}>введите дату</p>}
            {errors?.createdData?.type === 'pattern' && <p className={s.errorStyle}>введите корректную дату</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder='дата изменения'
              ref={register({
                required: true,
                pattern: /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/
              })}
              name='lastChangeData'/>
            {errors?.lastChangeData?.type === 'required' && <p className={s.errorStyle}>введите дату</p>}
            {errors?.lastChangeData?.type === 'pattern' && <p className={s.errorStyle}>введите корректную дату</p>}
          </div>

          <div className={s.button}>
            <button>
              <FontAwesomeIcon icon={faCheckSquare}/>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};