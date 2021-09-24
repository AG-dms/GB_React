import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./Home.scss";

function Home() {
  return (
    <Container>
      <div className="flex-container">
        <h1>Home page</h1>
        <div className="links">
          <Link className="link-btn" to="/chats/">
            <Button color="primary">Чаты</Button>
          </Link>
          <Link className="link-btn" to="/profile/">
            <Button color="primary">Профиль</Button>
          </Link>
          <Link className="link-btn" to="/news/">
            <Button color="primary">Новости</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
