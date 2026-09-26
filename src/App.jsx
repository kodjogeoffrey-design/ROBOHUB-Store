import { Toaster } from "@/components/ui/toaster"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from '@/lib/cartStore';
import Layout from '@/components/Layout';
// Add page imports here
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Tutorials from '@/pages/Tutorials';
import Admin from '@/pages/Admin';
import PageNotFound from '@/pages/PageNotFound';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/console" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </CartProvider>
      <Toaster />
    </Router>
  )
}

export default App
