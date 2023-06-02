import Carousel from 'react-bootstrap/Carousel';
import bg from '../img/bg.jpg'

function UncontrolledExample() {
  return (
    <Carousel style={{ marginBottom: "2vh" }}>
      <Carousel.Item>
        <img
          style={{height: '20vh', width: '100vw', borderRadius: '0 0 8px 8px'}}
          className="d-block w-100"
          src={bg}
          alt=''
        />
        <Carousel.Caption>
          <h3>Você sempre informado</h3>
          <p>Fique por dentro de tudo o que acontece com os deputados do nosso País.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: '20vh', width: '100vw', borderRadius: '0 0 8px 8px'}}
          className="d-block w-100"
          src={bg}
          alt=''
        />

        <Carousel.Caption>
          <h3>Saiba o que está acontecendo por dentro da Câmara</h3>
          <p>Informações detalhadas sobre os últimos eventos ocorridos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: '20vh', width: '100vw', borderRadius: '0 0 8px 8px'}}
          className="d-block w-100"
          src={bg}
          alt=''
        />

        <Carousel.Caption>
          <h3>Adquira conhecimento</h3>
          <p>Saiba o que rola por trás de cada sessão plenária.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;