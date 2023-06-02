import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import apiDeputados from '../services/apiDeputados'


const EventoInfo = () => {

    const params = useParams()
    const [evento, setEvento] = useState({})
    const [deputadosParticipantes, setDeputadosParticipantes] = useState([])
    const [orgaosOrganizadores, setOrgaosOrganizadores] = useState([])
   
    useEffect(() => {
        apiDeputados.get('eventos/' + params.id ).then(resultado => {
            setEvento(resultado.data.dados)
        })
        apiDeputados.get('eventos/' + params.id + '/orgaos' ).then(resultado => {
            setOrgaosOrganizadores(resultado.data.dados)
        })
        apiDeputados.get('eventos/' + params.id + '/deputados' ).then(resultado => {
            setDeputadosParticipantes(resultado.data.dados)
        })
    }, [params])

  return (

    <div style={{ margin: "120px 0" }}>
        {!evento.id && <h1>Carregando...</h1>}

        {evento.id &&
            <div>
                <h1>{evento.descricaoTipo} - {evento.situacao}</h1>
                <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                    <h1 className='mx-3'>Descrição do evento</h1>
                    <p className='mx-3'>{evento.descricao}</p>
                </Card>  
                 
                <Card className='px-3 pt-2 my-1'>
                    {!evento.localCamara.nome && <h3 style={{margin: '20px 0'}}>Não há informações sobre o local desse evento.</h3>}
                    {evento.localCamara.nome &&
                    <p style={{ fontSize: "18pt" }}><strong>Local: </strong>{evento.localCamara.nome}</p>
                    }
                </Card>

                <Card className='px-3 pt-2 mb-1'>
                    {(!evento.dataHoraInicio || !evento.dataHoraFim) && (<h4 style={{margin: '20px 0'}}>Não há informações sobre o horário desse evento.</h4>)}
                    {evento.dataHoraInicio && evento.dataHoraFim &&
                        <p style={{ fontSize: "18pt" }}><strong>Das: </strong>{evento.dataHoraInicio.slice(8, 10)}/{evento.dataHoraInicio.slice(5, 7)}/{evento.dataHoraInicio.slice(0, 4)}, {evento.dataHoraInicio.slice(11, 20)}h <strong>até: </strong>{evento.dataHoraFim.slice(8, 10)}/{evento.dataHoraFim.slice(5, 7)}/{evento.dataHoraFim.slice(0, 4)}, {evento.dataHoraFim.slice(11, 20)}h</p>
                    }
                </Card>
                
                <Card className='px-3 pt-2 mb-1'>
                    <h3>Órgãos organizadores</h3>
                    {orgaosOrganizadores.map(item => (
                        <Row key={item.id}>
                            <Col>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.sigla}</strong> - {item.nome}</li>
                                </ul>
                            </Col>
                        </Row>
                    ))}
                </Card>
                
                <Card className='px-3 pt-2 mb-1'>
                    {!evento.urlRegistro && <h3 style={{margin: '20px 0'}}>Não há informações sobre os participantes desse evento.</h3>}
                    {evento.dataHoraInicio && evento.dataHoraFim &&
                    <Card style={{border:'none'}}>
                        <h3>Deputados participantes</h3>
                        <Row xs={1} md={2} xl={3} className="g-5">
                            {deputadosParticipantes.map(item => (
                                <Col key={item.id}>
                                    <Card style={{margin: '5px', }}>
                                        <h3 style={{margin: '10px'}}>{item.nome}</h3>
                                        <Card.Img variant="top" src={item.urlFoto}/>
                                    </Card>
                                    <Link className="btn btn-warning w-100 mb-3" to={'/detalhesdeputado/' + item.id}>Ver Detalhes</Link>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                        }
                </Card>

                <Card>
                    <Card style={{border: 'none'}} className='px-3 pt-2'>
                        {!evento.urlRegistro && <h3 style={{margin: '20px 0'}}>Não há informações sobre as transmissões desse evento.</h3>}
                        {evento.urlRegistro &&
                            <p style={{ fontSize: "18pt" }}><strong>Transmissão oficial: </strong> <a target='_blank' href={evento.urlRegistro} rel="noreferrer">{evento.urlRegistro}</a></p>
                        }
                    </Card>
                    {evento.urlRegistro &&      
                    <div style={{ textAlign: 'center' }}>
                    <iframe width="560" height="315" src={evento.urlRegistro.slice(0, 24) + 'embed/' + evento.urlRegistro.slice(32)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture;"></iframe>
                    </div>
                    }
                </Card>
            
                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' to={-1 }> VOLTAR </Link>
                </Card>
            </div>
            
        }  
    </div>
  )
}

export default EventoInfo