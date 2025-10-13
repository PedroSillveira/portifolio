import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsValues from './components/ProductValues';
import Positioning from './components/Positioning';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import useScrollAnimation from './hooks/useScrollAnimation';

function App() {
  // Ativa as animações de scroll
  useScrollAnimation('0px', 0.1);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <ProductsValues />
        <Positioning />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;