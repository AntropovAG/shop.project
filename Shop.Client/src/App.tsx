import './App.css'
import MainPage from './components/mainPage/mainPage'
import ProductsList from './components/productsList/productsList'
import Product from './components/product/product'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products-list" element={<ProductsList />} />
        <Route path="/:id" element={<Product />} />
      </Routes>
    </>
  )
}

export default App
