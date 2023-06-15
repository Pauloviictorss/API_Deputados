import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, InputGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'
import {FaSearch} from 'react-icons/fa';


const Deputados = () => {

    const [deputados, setDeputados] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        apiDeputados.get('deputados/').then(resultado => {
            setDeputados(resultado.data.dados)
        })
    }, [])


    function pesquisar (event) {
        setQuery(event.data)
    }
      function pesquisarBotao (event) {
        apiDeputados.get('deputados?nome=' + query).then(resultado => {
          setDeputados(resultado.data.dados)
        })
      }

  return (
    <div style={{ margin: "8vh 0" }}>
        <InputGroup className="my-4">
            <Form.Control
            placeholder="Digite a sigla do partido desejado..."
            aria-label="Digite a sigla do partido desejado..."
            aria-describedby="basic-addon2"
            onChange={pesquisar}
            />
            <Button onClick={pesquisarBotao} variant="success" id="button-addon2">
            Pesquisar <FaSearch/>
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