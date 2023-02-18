import About from '../components/About/About';
import Footer from '../components/Footer/Footer';
import Gallery from '../components/Gallery/Gallery';
import Header from '../components/Header/header';
import Team from '../components/Team/Team';

import Canvas from '../components/Canvas/canvas'

import Web3Sample from '../components/Web3Sample/Web3Sample';


export default function Home() {
  
  return (
   <div>

    <Canvas/>

    <Web3Sample/>

    <Header/>
    <Gallery/>
    <Team/>
    <About/>
    <Footer/>
   </div>
  )
}
