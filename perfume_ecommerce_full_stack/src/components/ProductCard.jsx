import React from "react"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group ">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 border border-gray-200 hover:scale-105">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
          <p className="text-lg font-bold text-purple-600">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

