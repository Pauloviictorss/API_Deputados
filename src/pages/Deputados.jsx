import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, InputGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'
import {FaSearch} from 'react-icons/fa';
import { getDeputadoid } from '../services/pesquisaService'


const Deputados = () => {

    const [deputados, setDeputados] = useState([])

    useEffect(() => {
        apiDeputados.get('deputados/').then(resultado => {
            setDeputados(resultado.data.dados)
        })
    }, [])

    const pesquisarDeputados = async (event) => {
        getDeputadoid(event.target.value).then(response => setDeputados(response))
    }

  return (
    <div style={{ margin: "8vh 0" }}>
        <InputGroup className="my-4">
            <Form.Control
            placeholder="Digite a sigla do deputado desejado..."
            aria-label="Digite a sigla do deputado desejado..."
            aria-describedby="basic-addon2"
            onChange={pesquisarDeputados}
            />
            <Button variant="success" id="button-addon2">
            <FaSearch/>
            </Button>
        </InputGroup>

        <Card className='align-items-center p-2 mb-2'>
            <h1>Deputados cadastrados</h1>
        </Card>

        { !deputados.length && <h1>Carregando...</h1>}
            <Row xs={1} md={2} xl={3} className="g-5">
            {deputados.map(item => (
                <Col key={item.id}>
                    <Card style={{textAlign: 'center', marginBottom: '5px', }}>
                        <h3>{item.nome}</h3>

                        <Card.Img variant="top" src={item.urlFoto}/>
                    </Card>
                    <Link className="btn btn-success w-100 mb-3" to={'/detalhesdeputado/' + item.id}>Ver Detalhes</Link>
                </Col>
            ))}
            </Row>
    </div>
  )
}

export default Deputados