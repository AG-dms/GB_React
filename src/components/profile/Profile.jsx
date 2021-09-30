import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Profile.scss';
// import {changeName, toggleShowName} from '../../store/profile/actions';
import {db} from '../../Services/firebase';
import {ref, set, onValue} from 'firebase/database';

function Profile({onLogout}) {
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
    set(ref(db, 'user'), {username: value});
    // dispatch(changeName(value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <Button onClick={onLogout}>Разлогиниться</Button>
      <div className='profile-container'>Ваш профиль</div>
      <Link className='link-btn' to='/chats/'>
        <Button color='primary'>Чаты</Button>
      </Link>
      <Link className='link-btn' to='/news/'>
        <Button color='primary'>Новости</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleChange} />
        <button type='submit'> Запомнить имя</button>
      </form>
      {/* <input type='checkbox' checked={showName} value={showName} onChange={handleClick} />
      <span>Show Name</span> */}
      <div>{name}</div>
    </Container>
  );
}

export default Profile;
