import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Hero from './Home/Hero'
import Dashoboard from './Dashoboard'
import Blog from './Home/Blog'
import About from './Home/About'
import Brand from './Home/Brand'
import Event from './Home/Event'
import Ecomagix from './Home/Ecomagix'
import ProductEdit from './Home/ProductEdit'
import Product from './Home/Product'
import Claymagix from './Home/Claymagix'
import Woodmagix from './Home/Woodmagix'
import Skyace from './Home/Skyace'

const MainRoutes = ({ onLogout }) => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Dashoboard />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/event" element={<Event />} />
      <Route path="/ecomagix" element={<Ecomagix />} />
      <Route path="/productedit" element={<ProductEdit />} />
      <Route path="/product" element={<Product />} />
      <Route path="/claymagix" element={<Claymagix />} />
      <Route path='/woodmagix' element={<Woodmagix />} />
      <Route path='/skyace' element={<Skyace />} />
    </Routes>
  );
};

export default MainRoutes
