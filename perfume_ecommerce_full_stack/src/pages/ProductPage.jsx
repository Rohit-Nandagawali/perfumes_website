import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

const ProductPage = () => {
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" })
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error))

    fetch(`http://localhost:5000/api/products/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error))
  }, [id])

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:5000/api/products/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data])
        setNewReview({ name: "", rating: 5, comment: "" })
      })
      .catch((error) => console.error("Error submitting review:", error))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error))
    } else {
      console.log("Web Share API not supported")
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />

          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold text-purple-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
              <div className="flex space-x-4">
                {product.sizes &&
                  product.sizes.map((size) => (
                    <button key={size} className="cursor-pointer px-4 py-2 border rounded-md hover:bg-gray-100">
                      {size}
                    </button>
                  ))}
              </div>
            </div>
            <button
              onClick={handleShare}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300 cursor-pointer"
            >
              Share
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4 mb-8">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <p className="font-semibold mr-2">{review.name}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              placeholder="Your Name"
              className="w-full p-2 border rounded-md"
              required
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number.parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 && "s"}
                </option>
              ))}
            </select>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Your Review"
              className="w-full p-2 border rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300 cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

