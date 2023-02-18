import About from '../components/About/About';
import Footer from '../components/Footer/Footer';
import Gallery from '../components/Gallery/Gallery';
import Header from '../components/Header/header';
import Team from '../components/Team/Team';
import Canvas from '../components/Canvas/canvas'

export default function Home() {
  
  return (
   <div>
    <Canvas/>
    <Header/>
    <Gallery/>
    <Team/>
    <About/>
    <Footer/>
   </div>
  )
}
