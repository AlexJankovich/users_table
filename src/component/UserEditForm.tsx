import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {initialStateType, updateUsers, usersType} from '../store/users-reducers';
import s from './Users.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

type UserEditFormPropsType = {
  user: usersType
  isEditModeHandler: (isEditMode: boolean) => void
}

export const UserEditForm = (props: UserEditFormPropsType) => {
  const dispatch = useDispatch();
  //initialize hook-form
  const {register, handleSubmit, errors} = useForm<usersType>();

  // updateHandler
  const onSubmit = (data: usersType) => {

    const newId = {id:props.user.id};
    const newData: usersType = {...data, ...newId};
    //update localstorage
    const dataFromLocalStorage = localStorage.getItem('users');
    const parsedData:initialStateType = dataFromLocalStorage && JSON.parse(dataFromLocalStorage);
    const newLocalStorageData:initialStateType = {...parsedData,
      users: [...parsedData.users.map(u=>{
          if (u.id === props.user.id){
            u = {...newData}
            return u
          } else { return u }
        })]}
    localStorage.setItem('users', JSON.stringify(newLocalStorageData));
    //update store
    dispatch(updateUsers({user: newData}));
    //close edit window
    props.isEditModeHandler(false);
  };

  return (
   
  <div className={s.editFormStyle}>
    {props.user?
      <><h1>Отредактируйте данные пользователя</h1>
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
              <button onClick={() => props.isEditModeHandler(false)}>
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
                name='email'
                defaultValue={props.user.email}
              />
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
                name='password'
                defaultValue={props.user.password}
              />
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
                name='phone'
                defaultValue={props.user.phone}
              />
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
                name='userName'
                defaultValue={props.user.userName}
              />
              {errors?.userName?.type === 'required' && <p className={s.errorStyle}>введите имя</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder='Отчество'
                ref={register({
                  required: true
                })}
                name='userPatronymic'
                defaultValue={props.user.userPatronymic}
              />
              {errors?.userPatronymic?.type === 'required' && <p className={s.errorStyle}>введите отчество</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder='Фамилия'
                ref={register({
                  required: true
                })}
                name='userSurname'
                defaultValue={props.user.userSurname}
              />
              {errors?.userSurname?.type === 'required' && <p className={s.errorStyle}>введите фамилию</p>}
            </div>

            <div>
              <select
                ref={register}
                name='userStatus'
                defaultValue={props.user.userStatus}
              >
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
                name='createdData'
                defaultValue={props.user.createdData}
              />
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
                name='lastChangeData'
                defaultValue={props.user.lastChangeData}
              />
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
      </>:null}
  </div>

  );
};