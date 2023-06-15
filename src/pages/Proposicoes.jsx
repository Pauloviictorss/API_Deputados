import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'

const Proposicoes = () => {

    const [proposicoes, setProposicoes] = useState([])

    useEffect(() => {
        apiDeputados.get('proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano').then(resultado => {
            setProposicoes(resultado.data.dados)
        })
    }, [])

  return (
    <div style={{ margin: "8vh 0" }}>
        <Card className='align-items-center p-2 mb-2'>
            <h1>Proposições na Câmara</h1>
        </Card>

        { !proposicoes.length && <h1>Carregando...</h1>}

        <Row xs={1} md={2} xl={3} className="g-5">
            {proposicoes.map(item => (
                
                <Col key={item.id}>
                    <Card style={{textAlign: 'center', marginBottom: '5px', }}>
                        <h3>{item.siglaTipo} {item.numero}</h3>
                        <p>Ano: {item.ano}</p>
                        <p>{item.ementa.slice(0,70)}...</p>
                    </Card>
                    <Link className="btn btn-success w-100 mb-3" to={'/detalhesproposicao/' + item.id}>Ver Detalhes</Link>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default Proposicoes