import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import apiDeputados from '../services/apiDeputados'


const ProposicaoInfo = () => {

    const params = useParams()
    const [proposicao, setProposicao] = useState({})
    const [proposicoesRelacionadas, setProposicoesRelacionadas] = useState([])
   
    useEffect(() => {
        apiDeputados.get('proposicoes/' + params.id ).then(resultado => {
            setProposicao(resultado.data.dados)
        })
        apiDeputados.get('proposicoes/' + params.id + '/relacionadas' ).then(resultado => {
            setProposicoesRelacionadas(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
    }, [params])

    const segNivel = proposicao.statusProposicao

  return (

    
    <div style={{ margin: "120px 0" }}>
        {!proposicao.id && <h1>Carregando...</h1>}

        {proposicao.id &&
            <div>
                <h1 className='mx-3'>{proposicao.siglaTipo} {proposicao.numero}, ano {proposicao.ano}</h1>
                <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                    <h3 className='mx-3'>Descrição da proposição</h3>
                </Card>
                <Card className='mt-2 pt-2'>
                    <p className='mx-3'><strong>Ementa: </strong>{proposicao.ementa}</p>
                    <p className='mx-3'><strong>Apreciação: </strong>{segNivel.apreciacao}</p>
                    <p className='mx-3'><strong>Data de apresencação: </strong>{proposicao.dataApresentacao.slice(8,10)}/{proposicao.dataApresentacao.slice(5,7)}/{proposicao.dataApresentacao.slice(0,4)}</p>
                    <p className='mx-3'><strong>Situação:</strong>{segNivel.descricaoSituacao}</p>
                    <p className='mx-3'><strong>Tipo: </strong>{proposicao.descricaoTipo}</p>
                </Card>

                <Row>
                    <Col>
                        <Card className='p-2 my-4 bg-light'>
                            <Card className='bg-dark text-light'>
                            <h4 className='mx-2'>Proposições relacionadas</h4>
                            </Card>
                                <Row className='p-2'>
                                {proposicoesRelacionadas.slice(0,4).map(item => (
                                    <Col>
                                        <Card className='bg-light my-2 p-2'>
                                            <h5><Link className="btn btn-warning w-100" to={'/detalhesproposicao/' + item.id}>{item.siglaTipo} {item.numero}</Link></h5>
                                            <p><strong>Ano: </strong>{item.ano}</p>
                                            <p><strong>Ementa: </strong>{item.ementa.slice(0,50)}...</p>
                                        </Card>
                                    </Col>
                                ))}
                                </Row>
                                <Link to={'/proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano'} className='btn btn-warning'>Ver mais</Link>
                        </Card>
                    </Col>
                </Row>      
                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' to={-1 }> VOLTAR </Link>
                </Card>
            </div>
            
        }  
    </div>
  )
}

export default ProposicaoInfo