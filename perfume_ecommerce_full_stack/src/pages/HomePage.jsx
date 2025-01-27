import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import CallToActionBanner from "../components/CallToActionBanner"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {

    fetchProducts();
  }, [])

  return (
    <div>
      <Navbar />
      <CallToActionBanner />
      <div id="products" className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

