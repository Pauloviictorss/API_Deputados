import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import apiDeputados from '../services/apiDeputados'

const DeputadoInfo = () => {

    const params = useParams()
    const [deputado, setDeputado] = useState({})
    const [despesasDeputado, setDespesasDeputado] = useState([])
    const [eventosDeputado, setEventosDeputado] = useState([])
   
    useEffect(() => {
        apiDeputados.get('deputados/' + params.id ).then(resultado => {
            setDeputado(resultado.data.dados)
        })   
        apiDeputados.get('deputados/' + params.id + '/despesas?ordem=ASC&ordenarPor=ano' ).then(resultado => {
            setDespesasDeputado(resultado.data.dados)
        })
        apiDeputados.get('deputados/' + params.id + '/eventos?ordem=ASC&ordenarPor=dataHoraInicio' ).then(resultado => {
            setEventosDeputado(resultado.data.dados)
        })
    }, [params])

  return (
    
    <div style={{ marginTop: "90px" }}>
        {!deputado.id && <h1>Carregando...</h1>}

        {deputado.id &&
            <div>
                <Row>
                    <Col>
                        <Card.Img className='mb-4' style={{ borderRadius: "10px" }} variant="top" src={deputado.ultimoStatus.urlFoto} />
                    </Col>
                    <Col>
                        <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                            <h1 className='mx-3'>{deputado.ultimoStatus.nome}</h1>
                        </Card>
                        <Card className='px-3 pt-2 mb-1'>
                        <p style={{ fontSize: "18pt" }}><strong>Nome Civil: </strong>{deputado.nomeCivil}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Data de Nascimento: </strong>{deputado.dataNascimento}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Município de Nascimento: </strong>{deputado.municipioNascimento} - {deputado.ufNascimento}</p>
                        <p style={{ fontSize: "18pt" }}><strong>CPF: </strong>{deputado.cpf}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Escolaridade: </strong>{deputado.escolaridade}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Partido: </strong><Link to={'/detalhespartido/' + (deputado.ultimoStatus.uriPartido.slice(51))}>{deputado.ultimoStatus.siglaPartido}</Link></p>
                        <p style={{ fontSize: "18pt" }}><strong>E-mail: </strong>{deputado.ultimoStatus.email}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Condição Eleitoral: </strong>{deputado.ultimoStatus.condicaoEleitoral}</p>
                        <p style={{ fontSize: "18pt" }}><strong>Situação: </strong>{deputado.ultimoStatus.situacao}</p>
                        </Card>
                    </Col>       
                    <Card className='px-3 pt-2 mb-1'>
                        <h3>Movimentações nos últimos 6 meses</h3>
                        {despesasDeputado.map(item => (
                            <Col className='mb-3'>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.dataDocumento}</strong> - {item.tipoDespesa}</li>
                                    <ul>
                                        <li>{item.nomeFornecedor}</li>
                                        <li><strong>R${item.valorLiquido}</strong></li>
                                    </ul>
                                </ul>
                            </Col>
                        ))}
                    </Card>
                    <Card className='px-3 pt-2 mt-3'>
                        <h3>Participação em eventos</h3>
                        {eventosDeputado.map(item => (
                            <Col className='mb-3'>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.descricaoTipo}</strong> - {item.situacao}</li>
                                    <ul>
                                        <li>{item.descricao}</li>
                                        <li><strong>Local:</strong> {item.localCamara.nome}</li>
                                        <Link style={{margin: '0 auto'}} className='btn btn-warning ' to={'/detalhesevento/' + item.id }> Ver detalhes </Link>
                                    </ul>
                                </ul>
                            </Col>
                        ))}
                    </Card>
                </Row>
                
                <Card style={{border: 'none', margin: '20px 0 50px 0'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' to={-1 }> VOLTAR </Link>
                </Card>
            </div>
        }  
    </div>
  )
}

export default DeputadoInfo