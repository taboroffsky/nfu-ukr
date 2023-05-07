import About from '../components/About/About';
import Footer from '../components/Footer/Footer';
import Gallery from '../components/Gallery/Gallery';
import Header from '../components/Header/Header';
import Team from '../components/Team/Team';
import Canvas from '../components/Canvas/canvas'
import useTranslation from "next-translate/useTranslation";

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      <title>{t("title")}</title>
      <Canvas />
      <Header />
      <Gallery />
      <About />
      <Team />
      <Footer />
    </div>
  )
}