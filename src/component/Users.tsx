import {faEnvelope, faPencilAlt, faPhone, faPlusSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent} from 'react';
import {usersType} from '../store/users-reducers';
import s from './Users.module.css';


export type UsersPropsType = {
  users: usersType[]
  searchEmailString: string
  searchPhoneString: string
  searchByStatus: string
  addUserHandler: () => void
  deletUserHandler: (id: string) => void
  onChangeSearchEmailStringHandler: (searchString: string) => void
  onChangeSearchPhoneStringHandler: (searchString: string) => void
  onChangeSearchByStatusHandler: (searchString: string) => void
  editModeHandler: (id: string) => void
}


export const Users = (props: UsersPropsType) => {
//callbacks
  const onChangeSearchEmailStringHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeSearchEmailStringHandler(e.currentTarget.value);
  };
  const onChangeSearchPhoneStringHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeSearchPhoneStringHandler(e.currentTarget.value);
  };
  const onChangeSearchByStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    props.onChangeSearchByStatusHandler(e.currentTarget.value);
  };

  //sort users
  let sortArr: usersType[] = [];

  if (props.searchEmailString === '' && props.searchPhoneString === '' && props.searchByStatus === '') {
    sortArr = props.users;
  } else if (props.searchEmailString !== '') {
    sortArr = props.users.filter(u => u.email.toString().substr(0, props.searchEmailString.length) === props.searchEmailString);
  } else if (props.searchPhoneString !== '') {
    sortArr = props.users.filter(u => u.phone.toString().substr(0, props.searchPhoneString.length) === props.searchPhoneString);
  } else if (props.searchByStatus !== '') {
    sortArr = props.users.filter(u => u.userStatus === props.searchByStatus);
  }

  return (
    <div className={s.tableWrapper}>
      <h1>Информация о пользователях</h1>

      <h4>Введите данные для сортировки пользователей</h4>
      <div className={s.sortPanel}>

        <div>
          <input
            type='text'
            onChange={onChangeSearchEmailStringHandler}
            value={props.searchEmailString}
            disabled={props.searchPhoneString !== '' && props.searchEmailString === ''}
            placeholder={'введите email для поиска'}
          />
          <FontAwesomeIcon icon={faEnvelope} style={{padding: '0 5px'}}/>
        </div>

        <div>
          <input
            type='text'
            onChange={onChangeSearchPhoneStringHandler}
            value={props.searchPhoneString}
            disabled={props.searchPhoneString === '' && props.searchEmailString !== ''}
            placeholder={'введите телефон'}
          />
          <FontAwesomeIcon icon={faPhone} style={{padding: '0 5px'}}/>
        </div>

        <select onChange={onChangeSearchByStatusHandler} value={props.searchByStatus}>
          <option value={''}>выберите опцию для сортировки</option>
          <option value={'partner'}>partner</option>
          <option value={'admin'}>admin</option>
          <option value={'client'}>client</option>
        </select>
      </div>

      <div className={s.tableHead}>
        <div>Email</div>
        <div>Пароль</div>
        <div>Телефон</div>
        <div>Имя</div>
        <div>Отчество</div>
        <div>Фамилия</div>
        <div>Статус</div>
        <div>Дата<br/>создания</div>
        <div>Дата<br/>изменения</div>
        <div className={s.button}>
          <button onClick={props.addUserHandler}>
            <FontAwesomeIcon icon={faPlusSquare}/>
          </button>
        </div>
      </div>
      <>{
        !props.users || props.users.length === 0
          ? 'добавьте пользователя'
          : sortArr.map(u => {
            return (
              <div className={s.rowsWrapper} key={u.id}>
                <div key={u.id} className={s.tableRows}>

                  {Object.values(u).map((i, index) => {
                    if (Object.keys(u)[index] !== 'id') {
                      return <div key={index}>{i}</div>;
                    } else {
                      return null;
                    }
                  })}

                  <div className={s.button}>
                    <button onClick={() => props.deletUserHandler(u.id)}>
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button onClick={() => props.editModeHandler(u.id)}>
                      <FontAwesomeIcon icon={faPencilAlt}/>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}</>
    </div>
  );
};