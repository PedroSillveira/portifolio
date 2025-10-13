// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Onde você adicionou o CSS customizado acima
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsValues from './components/ProductValues';
import Positioning from './components/Positioning';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
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