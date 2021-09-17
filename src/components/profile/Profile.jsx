import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Profile.scss'
import { toggleShowName } from '../../store/profile/actions';


function Profile() {

    const {showName, name} = useSelector((state)=> state)
    const dispatch = useDispatch();

    const handleClick = ()=>{
      dispatch(toggleShowName);
    }
     
  return (
    <Container>
      <div className="profile-container">
      <Link to="/">
        <Button color="secondary">На главную</Button>{' '}
      </Link>
      Тут будет страница профиля
    </div>
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
