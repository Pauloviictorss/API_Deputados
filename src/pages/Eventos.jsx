import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'

const Eventos = () => {

    const [eventos, setEventos] = useState([])

    useEffect(() => {
        apiDeputados.get('eventos?itens=17').then(resultado => {
            setEventos(resultado.data.dados)
        })
    }, [])

  return (
    <div style={{ margin: "120px 0" }}>
        <Card className='align-items-center p-2 mb-2'>
            <h1>Eventos mais recentes</h1>
        </Card>

        { !eventos.length && <h1>Carregando...</h1>}

        <Row xs={1} md={2} xl={3} className="g-5">
            {eventos.map(item => (
                
                <Col key={item.id}>
                    <Card style={{textAlign: 'center', marginBottom: '5px', }}>
                        <h3>{item.descricaoTipo.slice(0,24)}</h3>
                        <p>Situação: {item.situacao}</p>
                        <p>{item.descricao.slice(0,65)}...</p>
                    </Card>
                    <Link className="btn btn-warning w-100 mb-3" to={'/detalhesevento/' + item.id}>Ver Detalhes</Link>
                </Col>
            ))}
        </Row>
        <Card style={{border: 'none', marginTop: '10px'}}>
            <Link style={{margin: '0 auto'}} className='btn btn-warning ' to={-1 }> VOLTAR </Link>
        </Card>
    </div>
  )
}

export default Eventos