import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Profile.scss'
import { changeName, toggleShowName } from '../../store/profile/actions';


function Profile() {
    const [value, setValue] = useState()
    const {showName, name} = useSelector((state) => state.profile)
    const dispatch = useDispatch();

    const handleClick = ()=>{
      dispatch(toggleShowName);
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(changeName(value))
    }

    const handleChange = (e)=>{
      setValue(e.target.value)
    }
     
  return (
    <Container>
      <div className="profile-container">
      <Link to="/">
        <Button color="secondary">На главную</Button>{' '}
      </Link>
      Тут будет страница профиля
    </div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit"> Запомнить имя</button>
    </form>
    <input 
           type="checkbox"
           checked={showName}
           value={showName}
           onChange={handleClick}
        />
        <span>Show Name</span>
        {showName && <div>{name}</div>}
    

    {/* <Button onClick={handleClick}>Toggle show name</Button> */}
    </Container>
  )
}

export default Profile
