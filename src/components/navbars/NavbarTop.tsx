import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AvatarSection from '../avatars/AvatarSection';

const NavbarTop = () => {
    return (
      <section id="navbar-top">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/admin">Navbar</Navbar.Brand>
            <AvatarSection />
          </Container>
        </Navbar>
      </section>
    )
};

export default NavbarTop;