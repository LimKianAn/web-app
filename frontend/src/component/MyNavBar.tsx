import { FC } from "react";
import { Navbar } from "react-bootstrap";
import UserInfo from "./UserInfo";

export const MyNavbar: FC = () => {
  return (
    <Navbar bg="secondary" className="justify-content-between">
      <Navbar.Brand href="/">Web App</Navbar.Brand>
      <UserInfo />
    </Navbar>
  );
};

export default MyNavbar;
