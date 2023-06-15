import React from 'react'
import { Container, InputGroup, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {

  return (
      <div>
        <Navbar style={{ backgroundColor: "#121212", height: '6vh'}} variant="dark" fixed="top">
            <Container>
                <Link className='btn mx-2 btn-outline-light' to='/'>Portal da Transparência</Link>
                <Nav style={{  }} className="btn">
                    <InputGroup>                      
                        <Link className='btn btn-outline-light' to='/partidos'>Partidos</Link>
                        <Link className='btn btn-outline-light' to='/deputados'>Deputados</Link>
                        <Link className='btn btn-outline-light' to='/eventos'>Eventos</Link>
                        <Link className='btn btn-outline-light' to='/proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano'>Proposições</Link>
                    </InputGroup>
                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default Menu