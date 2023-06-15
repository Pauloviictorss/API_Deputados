import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Overlay, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'
import { BsQuestionCircle } from "react-icons/bs";
import Carousel from '../components/Carousels';

const HomeScreen = () => {

    const [partidos, setPartidos] = useState([])
    const [deputados, setDeputados] = useState([])
    const [eventos, setEventos] = useState([])
    const [proposicoes, setProposicoes] = useState([])
    const [blocos, setBlocos] = useState([])
    const [show1, setShow1] = useState(false);
    const target1 = useRef(null);
    const [show2, setShow2] = useState(false);
    const target2 = useRef(null);

    useEffect(() => {
        apiDeputados.get('partidos/').then(resultado => {
            setPartidos(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('deputados/').then(resultado => {
            setDeputados(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('eventos/').then(resultado => {
            setEventos(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('proposicoes/').then(resultado => {
            setProposicoes(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('blocos/').then(resultado => {
            setBlocos(resultado.data.dados)
        })
    }, [])

  return (
    <div>   
        <Container>
            <Carousel/> 
            <Container style={{ margin: '5vh 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h4>Eventos realizados</h4>
                    <Link to={'/eventos?pagina=1&itens=10000'} className='btn btn-outline-dark'>Ver mais</Link>
                </div>
                <Row className=''>
                    {eventos.slice(0,4).map(item => (
                        <Col>
                            <Card className='bg-light my-2 p-2'>
                                <h5><Link className="btn btn-success w-100" to={'/detalhesevento/' + item.id}>{item.descricaoTipo.slice(0,20)}</Link></h5>
                                <p>Situação: {item.situacao}</p>
                                <p>{item.descricao.slice(0,40)}...</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container style={{ margin: '5vh 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h4>Partidos</h4>
                    <Link to={'/partidos'} className='btn btn-outline-dark'>Ver todos os Partidos</Link>
                </div>
                <Row xs={1} sm={3} md={3} lg={3} xl={3} className='mb-5'>
                    {partidos.slice(0,6).map(item => (
                        <Col >
                            <Card className='bg-light align-items-center my-2'>
                                <Link className="btn btn-success w-100" to={'/detalhespartido/' + item.id}>{item.sigla}</Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container style={{ margin: '5vh 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h4>Deputados</h4>
                    <Link to={'/deputados'} className='btn btn-outline-dark'>Ver todos os Deputados</Link>
                </div>
                <Row xs={1} sm={3} md={3} lg={3} xl={3} className='mb-5'>
                    {deputados.slice(0,6).map(item => (
                        <Col >
                            <Card className='bg-light align-items-center my-2'>
                                <Link className="btn btn-success w-100" to={'/detalhesdeputado/' + item.id}>{item.nome.slice(0,12)}...</Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container style={{ margin: '5vh 0' }}>
                <Col>
                    <Card style={{display: 'flex', flexDirection: 'row', gap: '20px', border: 'none' }} className='align-items-center'>
                    
                        <h4 style={{margin: 2}}>Blocos Partidários</h4>
                        <Button style={{ height: '20px', display: 'flex', alignItems: 'center'}} variant="success" ref={target1} onClick={() => setShow1(!show1)}>
                            <BsQuestionCircle/>
                        </Button>
                        <Overlay target={target1.current} show={show1} placement="right">
                            {({
                                placement: _placement,
                                arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                        }) => (
                            <div
                            {...props}
                            style={{
                                position: 'absolute',
                                backgroundColor: '#198754',
                                padding: '10px 10px',
                                color: 'white',
                                borderRadius: 3,
                                border: '1px solid black',
                                width: '25%',
                                ...props.style,
                            }}
                            >
                                <p>Um bloco partidário é um conjunto de partidos que decidem trabalhar juntos, como se fossem um único "partidão". Eles possuem um só líder e um mesmo conjunto de vice-líderes.</p> 
                                <p>Os blocos só podem existir até o fim da legislatura em que foram criados: na legislatura seguinte, os mesmos partidos, se associados, formam um novo bloco.</p>
                            </div>
                            )}
                        </Overlay>
                    </Card>
                    <Row>
                        <div>
                            <div style={{ margin: '0' }}>
                                {blocos.map(item => (
                                    <Card className='bg-light my-2 p-2'>
                                        <p>{item.nome}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>                           
                    </Row>
                </Col>
            </Container>

            <Container style={{ margin: '5vh 0' }}> 
                <Card style={{display: 'flex', border: 'none', gap: '20px'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'baseline',}}>
                            <h4>Proposições na Câmara</h4>
                            <Button style={{ height: '20px', display: 'flex', alignItems: 'center'}} variant="success" ref={target2} onClick={() => setShow2(!show2)}>
                            <BsQuestionCircle/>
                            </Button>
                            <Overlay target={target2.current} show={show2} placement="right">
                                {({
                                placement: _placement,
                                arrowProps: _arrowProps,
                                show: _show,
                                popper: _popper,
                                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                ...props
                                }) => (
                                <div
                                    {...props}
                                    style={{
                                    position: 'absolute',
                                    backgroundColor: '#198754',
                                    padding: '10px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    border: '1px solid black',
                                    width: '25%',
                                    ...props.style,
                                    }}
                                > 
                                    <p>Trata-se de uma lista com informações básicas que englobam projetos de lei, resoluções, medidas provisórias, emendas, pareceres e todos os outros tipos de proposições na Câmara.</p>
                                </div>
                                )}
                            </Overlay>
                        </div>
                        <Link to={'/proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano'} className='btn btn-outline-dark'>Ver mais</Link>
                    </div>  
                </Card>
                <Row>
                {proposicoes.slice(0,4).map(item => (
                    <Col>
                        <Card className='bg-light my-2 p-2'>
                            <h5><Link className="btn btn-success w-100" to={'/detalhesproposicao/' + item.id}>{item.siglaTipo} {item.numero}</Link></h5>
                            <p>Ano: {item.ano}</p>
                            <p>{item.ementa.slice(0,50)}...</p>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </Container>
    </div>
  )
}

export default HomeScreen