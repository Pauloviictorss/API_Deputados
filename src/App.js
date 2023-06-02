import './App.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import HomeScreen from './pages/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetalhesDeputados from './pages/DeputadoInfo';
import DetalhesEvento from './pages/EventoInfo';
import Partidos from './pages/Partidos';
import Deputados from './pages/Deputados';
import Eventos from './pages/Eventos';
import Proposicoes from './pages/Proposicoes';
import DetalhesProposicao from './pages/ProposicaoInfo';
import DetalhesPartido from './pages/PartidoInfo';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu/>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>          
            <Route path="/deputados/" element={<Deputados/>}/>         
            <Route path="/detalhesdeputado/:id" element={<DetalhesDeputados/>}/>         
            <Route path="/eventos/" element={<Eventos/>}/>         
            <Route path="/detalhesevento/:id" element={<DetalhesEvento/>}/>         
            <Route path="/partidos/" element={<Partidos/>}/>         
            <Route path="/detalhespartido/:id" element={<DetalhesPartido/>}/>   
            <Route path="/proposicoes/" element={<Proposicoes/>}/>         
            <Route path="/detalhesproposicao/:id" element={<DetalhesProposicao/>}/>         
          </Routes>
        </Container>

        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
