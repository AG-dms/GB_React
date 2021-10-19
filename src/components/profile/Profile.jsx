import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Profile.scss';
// import {changeName, toggleShowName} from '../../store/profile/actions';
import { db } from '../../Services/firebase';
import { ref, set, onValue } from 'firebase/database';

function Profile({ onLogout }) {
  const [value, setValue] = useState('');
  // const {showName, name} = useSelector((state) => state.profile);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch(toggleShowName);
  // };

  useEffect(() => {
    //userDbRef получаем базу данных, второй аргумент - раздел бд
    const userDbRef = ref(db, 'user');
    // получаем снимок бд и приобразуем в объект методом val()
    onValue(userDbRef, (snapshot) => {
      const data = snapshot.val();
      console.log('--------', data);
      setName(data?.username || '');
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('');
    // set утанавливаем новое значение, указываем бд и ее раздел, второй аргумент - значение
    set(ref(db, 'user'), { username: value });
    // dispatch(changeName(value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container className='home-container'>
      <Button onClick={onLogout}>Разлогиниться</Button>
      <div className='profile-container'>
        <div className='profile-head'>
          <span className='title-profile'>Ваш профиль</span>
          <div className='avatar'>
            <img
              src='https://lh3.googleusercontent.com/proxy/BHT3ZJLgO7uu972gaEXNUFaXmH4RWw6W3zzYPjGM2w9CAk-ra_r5jyb1JBJSeLKA_tAMHC53GHOnPzKW95V4nfzM9mWfKZF7dHKIX0uhRWqcPhi6dM2kAwznBZW7jCGL_HhwhPzY140KcMTEee1VBorQPf7gln0IAvkwpfAWR6Ng6PbR-A'
              alt='avatar'
            />
          </div>
        </div>
        <div className='links'>
          <Link className='link-btn' to='/chats/'>
            <Button color='primary'>Чаты</Button>
          </Link>
          <Link className='link-btn' to='/news/'>
            <Button color='primary'>Новости</Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='input-block'>
          <label htmlFor='name'>Введите свой ник</label>
          <input type='text' id='name' value={value} onChange={handleChange} />
        </div>
        <Button type='submit' color='primary'>
          Запомнить имя
        </Button>
      </form>
      {/* <input type='checkbox' checked={showName} value={showName} onChange={handleClick} />
      <span>Show Name</span> */}
      <div className='yourName'>{name}</div>
    </Container>
  );
}

export default Profile;
