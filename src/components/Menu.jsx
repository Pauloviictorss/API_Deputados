import React from 'react'
import { Container, Dropdown, DropdownButton, InputGroup, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBackward, FaForward, FaHome } from "react-icons/fa";

const Menu = () => {

  return (
      <div>
        <Navbar style={{ backgroundColor: "#090909", height: '6vh'}} variant="dark" fixed="top">
            <Container style={{alignItems: 'baseline'}}>
            <Link className='btn btn-warning' to={-1 }><FaBackward/></Link>
            <Link className='btn btn-warning mx-2' to='/'><FaHome/></Link>
                {/*<Navbar.Brand className="btn my-1" style={{height: '45px', border: '1px solid #121212', color: '#121212'}} href="/">Portal da Transparência</Navbar.Brand>*/}
                <Nav style={{  }} className="btn mx-auto">
                    <InputGroup>                      
                        <DropdownButton
                        variant="outline-light"
                        title="Portal da Transparência"
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item href="/partidos">Partidos</Dropdown.Item>
                        <Dropdown.Item href="/deputados">Deputados</Dropdown.Item>
                        <Dropdown.Item href="/eventos">Eventos</Dropdown.Item>
                        <Dropdown.Item href="/proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano">Proposições</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>

                </Nav>
                <Link className='btn btn-warning' to={+1 }><FaForward/></Link>
            </Container>
        </Navbar>
    </div>
  )
}

export default Menu