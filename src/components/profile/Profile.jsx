import React from 'react'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Profile.scss'

function Profile() {
  return (
    <Container>
      <div className="profile-container">
      <Link to="/">
        <Button color="secondary">На главную</Button>{' '}
      </Link>
      Тут будет страница профиля
    </div>
    </Container>
  )
}

export default Profile
