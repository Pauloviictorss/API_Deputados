import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'
import {FaSearch} from 'react-icons/fa';
import { getPartidoid } from '../services/pesquisaService'

const Partidos = () => {

    const [partidos, setPartidos] = useState([])

    useEffect(() => {
        apiDeputados.get('partidos?itens=25').then(resultado => {
            setPartidos(resultado.data.dados)
        })        
    }, [])

    const pesquisarPartidos = async (event) => {
        getPartidoid(event.target.value).then(response => setPartidos(response))
    }

  return (
    <div style={{ margin: "8vh 0" }}>
        <InputGroup className="my-4">
            <Form.Control
            placeholder="Digite a sigla do partido desejado..."
            aria-label="Digite a sigla do partido desejado..."
            aria-describedby="basic-addon2"
            onChange={pesquisarPartidos}
            />
            <Button variant="success" id="button-addon2">
            <FaSearch/>
            </Button>
        </InputGroup>

        <Card className='align-items-center p-2 mb-2'>
            <h1>Partidos cadastrados</h1>
        </Card>

        { !partidos.length && <h1>Carregando...</h1>}

            <Row xs={1} md={2} xl={3} className="g-2">
            {partidos.map(item => (
                <Col key={item.id}>
                    <Card className='mb-1 bg-light'>
                        <Card.Body style={{textAlign: 'center'}}>
                            <h3>{item.sigla}</h3>
                            <p>{item.nome}</p>
                            <Link className="btn btn-success w-100" to={'/detalhespartido/' + item.id}>Ver Detalhes</Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
    </div>
  )
}

export default Partidos