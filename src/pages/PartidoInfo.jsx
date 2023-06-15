import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import apiDeputados from '../services/apiDeputados'

const PartidoInfo = () => {

    const params = useParams()
    const [partido, setPartido] = useState({})
    const [deputadosPartido, setDeputadosPartido] = useState([])
   
    useEffect(() => {
        apiDeputados.get('partidos/' + params.id ).then(resultado => {
            setPartido(resultado.data.dados)
        })
        apiDeputados.get('partidos/' + params.id + '/membros' ).then(resultado => {
            setDeputadosPartido(resultado.data.dados)
        })
    }, [params])

    const segNivel = partido.status

  return (

    
    <div style={{ margin: "8vh 0" }}>
        {!partido.id && <h1>Carregando...</h1>}

        {partido.id &&
            <div>
                <h1 className='mx-3'>{partido.sigla} - {partido.nome}</h1>
                
                <h2 className='mx-3'>Detalhes do partido:</h2>
                <Card className='mx-3' style={{border: 'none'}}>
                    <Card.Img style={{ width: '75px'}} src={partido.urlLogo}/>
                </Card>
                <h5 className='mx-3'>Número total de membros: {partido.status.totalMembros}</h5>
                <h5 className='mx-3'>Situação atual: {partido.status.situacao}</h5>

                <Card.Img className='mx-3' style={{ width: '200px'}} src={segNivel.lider.urlFoto}/>
                <h5 className='mx-3'>Líder partidário: {segNivel.lider.nome}</h5>
                <p className='mx-3'>UF: {segNivel.lider.uf}</p>
                
                <Card className='px-3 pt-2 m-1'>
                    <h3>Membros do {partido.sigla} - {partido.nome}</h3>
                </Card>
                <Row xs={1} md={2} xl={3} className="g-5">
                    {deputadosPartido.map(item => (
                        <Col key={item.id}>
                            <Card style={{margin: '5px', }}>
                                <h3 style={{margin: '10px'}}>{item.nome}</h3>
                                <Card.Img variant="top" src={item.urlFoto}/>
                            </Card>
                            <Link className="btn btn-success w-100 mb-3" to={'/detalhesdeputado/' + item.id}>Ver Detalhes</Link>
                        </Col>
                    ))}
                </Row>
            </div>
            
        }  
    </div>
  )
}

export default PartidoInfo