import React from "react"
import { Link } from "react-router-dom"

const CallToActionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Discover Your Signature Scent</h2>
        <p className="text-xl mb-8">Explore our latest collections and find the perfect fragrance for you.</p>
        <a href="#products"

          className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </div>
  )
}

export default CallToActionBanner

