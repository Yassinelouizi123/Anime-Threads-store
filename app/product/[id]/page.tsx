"use client"

import { useState, useEffect } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"

const products = [
	{
		id: "1",
		name: "Naruto Shippuden T-Shirt",
		price: 25,
		description:
			"Embrace the ninja way with this premium Naruto Shippuden t-shirt. Made from 100% cotton with vibrant, long-lasting prints that capture the spirit of your favorite ninja.",
		sizes: ["S", "M", "L", "XL"],
		images: [
			"/downloaded-images/image-5.png",
			"/downloaded-images/image-8.png",
			"/downloaded-images/image-10.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "2",
		name: "One Piece Luffy Hoodie",
		price: 50,
		description:
			"Set sail with the Straw Hat crew in this premium One Piece hoodie featuring Luffy. Soft fleece interior and durable exterior make this perfect for any adventure.",
		sizes: ["M", "L", "XL"],
		images: [
			"/downloaded-images/image-8.png",
			"/downloaded-images/image-12.png",
			"/downloaded-images/image-14.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "3",
		name: "Attack on Titan Survey Corps Jacket",
		price: 75,
		description:
			"Fight for humanity with this official Survey Corps jacket. Premium materials and authentic design make this a must-have for any Attack on Titan fan.",
		sizes: ["S", "M", "L"],
		images: [
			"/downloaded-images/image-10.png",
			"/downloaded-images/image-16.png",
			"/downloaded-images/image-18.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "4",
		name: "Demon Slayer Tanjiro T-Shirt",
		price: 25,
		description:
			"Channel the power of the Demon Slayer Corps with this Tanjiro-inspired t-shirt. High-quality print and comfortable fit for everyday wear.",
		sizes: ["XS", "S", "M", "L"],
		images: [
			"/downloaded-images/image-12.png",
			"/downloaded-images/image-14.png",
			"/downloaded-images/image-16.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "5",
		name: "Naruto Akatsuki Cloak",
		price: 60,
		description:
			"Join the Akatsuki with this premium replica cloak. High-quality materials and authentic design make this perfect for cosplay or casual wear.",
		sizes: ["M", "L", "XL"],
		images: [
			"/downloaded-images/image-14.png",
			"/downloaded-images/image-6.png",
			"/downloaded-images/image-7.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "6",
		name: "One Piece Straw Hat Crew T-Shirt",
		price: 30,
		description:
			"Represent the Straw Hat Pirates with this crew t-shirt. Features the iconic Jolly Roger and premium cotton construction.",
		sizes: ["S", "M", "L", "XL"],
		images: [
			"/downloaded-images/image-16.png",
			"/downloaded-images/image-6.png",
			"/downloaded-images/image-7.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "7",
		name: "Attack on Titan Eren Yeager Hoodie",
		price: 55,
		description:
			"Embrace the power of the Attack Titan with this Eren Yeager hoodie. Premium fleece construction with detailed character artwork.",
		sizes: ["M", "L", "XL"],
		images: [
			"/downloaded-images/image-18.png",
			"/downloaded-images/image-6.png",
			"/downloaded-images/image-10.png",
		],
		sizeChart: "/size-chart.png",
	},
	{
		id: "8",
		name: "Demon Slayer Nezuko T-Shirt",
		price: 20,
		description:
			"Show your love for Nezuko with this adorable character t-shirt. Soft cotton blend with vibrant, fade-resistant printing.",
		sizes: ["XS", "S", "M"],
		images: [
			"/downloaded-images/image-20.png",
			"/downloaded-images/image-6.png",
			"/downloaded-images/image-7.png",
		],
		sizeChart: "/size-chart.png",
	},
]

const reviews = [
	{
		name: "Ethan Harper",
		time: "2 months ago",
		rating: 5,
		comment:
			"Absolutely love this tee! The print quality is amazing and the fabric is so soft. It's become my go-to shirt for casual outings.",
		likes: 25,
		dislikes: 2,
		avatar: "/downloaded-images/image-22.png",
	},
	{
		name: "Sophia Bennett",
		time: "3 months ago",
		rating: 4,
		comment:
			"Great design and comfortable fit. The colors are vibrant and haven't faded after several washes. Runs a bit small, so consider sizing up.",
		likes: 18,
		dislikes: 3,
		avatar: "/downloaded-images/image-23.png",
	},
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
	const [selectedSize, setSelectedSize] = useState("")
	const [quantity, setQuantity] = useState(1)
	const [currentProduct, setCurrentProduct] = useState<(typeof products)[0] | null>(null)
	const { addItem, toggleCart } = useCartStore()
	const [showSizeAlert, setShowSizeAlert] = useState(false)

	// Update product when params.id changes
	useEffect(() => {
		const productData = products.find((p) => p.id === params.id) || products[0]
		setCurrentProduct(productData)
		// Reset form state when product changes
		setSelectedSize("")
		setQuantity(1)
		// Scroll to top when product changes
		window.scrollTo(0, 0)
	}, [params.id])

	// Get related products (exclude current product)
	const getRelatedProducts = () => {
		return products
			.filter((p) => p.id !== params.id)
			.slice(0, 3)
			.map((product) => ({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.images[0],
			}))
	}

	const handleAddToCart = () => {
		if (!currentProduct) return

		if (!selectedSize) {
			setShowSizeAlert(true)
			setTimeout(() => setShowSizeAlert(false), 3000)
			return
		}

		addItem({
			id: Number.parseInt(params.id),
			name: currentProduct.name,
			price: currentProduct.price,
			image: currentProduct.images[0],
			size: selectedSize,
			quantity: quantity,
		})

		// Show cart after adding item
		toggleCart()
	}

	useEffect(() => {
		if (selectedSize) {
			setShowSizeAlert(false)
		}
	}, [selectedSize])

	if (!currentProduct) {
		return (
			<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
					<Link href="/shop" className="text-[#e8b4b7] hover:underline">
						Return to Shop
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white">
			<div className="max-w-6xl mx-auto px-6 py-8">
				{/* Breadcrumb */}
				<div className="flex items-center gap-2 mb-8 text-sm">
					<Link href="/" className="text-gray-400 hover:text-white">
						Home
					</Link>
					<span className="text-gray-400">/</span>
					<Link href="/shop" className="text-gray-400 hover:text-white">
						Shop
					</Link>
					<span className="text-gray-400">/</span>
					<span className="text-white">{currentProduct.name}</span>
				</div>

				<div className="grid grid-cols-2 gap-12 mb-12">
					{/* Product Images */}
					<div>
						<div className="grid grid-cols-2 gap-2 mb-4">
							<div className="col-span-2 row-span-2">
								<img
									src={currentProduct.images[0] || "/placeholder.svg"}
									alt="Main product image"
									className="w-full h-96 object-cover rounded-xl"
								/>
							</div>
							<img
								src={currentProduct.images[1] || "/placeholder.svg"}
								alt="Product image 2"
								className="w-full h-44 object-cover rounded-xl"
							/>
							<img
								src={currentProduct.images[2] || "/placeholder.svg"}
								alt="Product image 3"
								className="w-full h-44 object-cover rounded-xl"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div>
						<h1 className="text-2xl font-bold mb-4">{currentProduct.name}</h1>
						<p className="text-3xl font-bold text-[#e8b4b7] mb-6">
							${currentProduct.price}
						</p>
						<p className="text-gray-400 mb-6 leading-relaxed">
							{currentProduct.description}
						</p>

						{/* Size Selection */}
						<div className="mb-6">
							<h3 className="text-lg font-bold mb-3">Size</h3>
							<div className="flex gap-3">
								{currentProduct.sizes.map((size) => (
									<button
										key={size}
										onClick={() => setSelectedSize(size)}
										className={`w-12 h-12 rounded-xl border-2 font-medium transition-colors ${
											selectedSize === size
												? "border-[#e8b4b7] text-[#e8b4b7] bg-[#e8b4b7]/10"
												: "border-[#2a2a2a] text-white hover:border-[#e8b4b7]"
										}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>

						{/* Quantity */}
						<div className="mb-6">
							<h3 className="text-lg font-bold mb-3">Quantity</h3>
							<div className="flex items-center">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="w-10 h-10 bg-[#1a1a1a] rounded-l-xl flex items-center justify-center text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]"
								>
									-
								</button>
								<input
									type="number"
									min="1"
									value={quantity}
									onChange={(e) =>
										setQuantity(Number.parseInt(e.target.value) || 1)
									}
									className="w-16 h-10 text-center bg-[#1a1a1a] border-y border-[#2a2a2a] text-white focus:outline-none"
								/>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className="w-10 h-10 bg-[#1a1a1a] rounded-r-xl flex items-center justify-center text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]"
								>
									+
								</button>
							</div>
						</div>

						{/* Add to Cart */}
						<button
							onClick={handleAddToCart}
							className="w-full h-12 bg-[#e8b4b7] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#d4a1a4] transition-colors mb-8"
						>
							Add to Cart
						</button>
						{showSizeAlert && (
							<div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border border-[#e8b4b7] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
								<p className="flex items-center">
									<span className="text-[#e8b4b7] mr-2">!</span>
									Please select a size
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Size Chart */}
				<div className="mb-12">
					<h3 className="text-lg font-bold mb-4">Size Chart</h3>
					<div className="bg-white rounded-xl p-6">
						<img
							src={currentProduct.sizeChart || "/placeholder.svg"}
							alt="Size chart"
							className="w-full max-w-2xl mx-auto"
						/>
					</div>
				</div>

				{/* Customer Reviews */}
				<div className="mb-12">
					<h3 className="text-lg font-bold mb-6">Customer Reviews</h3>

					{/* Rating Summary */}
					<div className="flex items-start gap-8 mb-8">
						<div className="text-center">
							<div className="text-4xl font-bold mb-2">4.5</div>
							<div className="flex gap-1 mb-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										size={16}
										className={
											star <= 4
												? "fill-white text-white"
												: "text-[#2a2a2a]"
										}
									/>
								))}
							</div>
							<div className="text-sm text-gray-400">125 reviews</div>
						</div>

						<div className="flex-1 max-w-md">
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="flex items-center gap-3 mb-2">
									<span className="text-sm w-2">{rating}</span>
									<div className="flex-1 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
										<div
											className="h-full bg-white rounded-full"
											style={{
												width: `${
													rating === 5
														? "40%"
														: rating === 4
														? "30%"
														: rating === 3
														? "15%"
														: rating === 2
														? "10%"
														: "5%"
												}`,
											}}
										/>
									</div>
									<span className="text-sm text-gray-400 w-8">
										{rating === 5
											? "40%"
											: rating === 4
											? "30%"
											: rating === 3
											? "15%"
											: rating === 2
											? "10%"
											: "5%"}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Individual Reviews */}
					<div className="space-y-6">
						{reviews.map((review, index) => (
							<div key={index} className="border-b border-[#1a1a1a] pb-6">
								<div className="flex items-center gap-3 mb-3">
									<img
										src={review.avatar || "/placeholder.svg"}
										alt={review.name}
										className="w-10 h-10 rounded-full"
									/>
									<div>
										<div className="font-medium">{review.name}</div>
										<div className="text-sm text-gray-400">
											{review.time}
										</div>
									</div>
								</div>

								<div className="flex gap-1 mb-3">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											size={16}
											className={
												star <= review.rating
													? "fill-white text-white"
													: "text-[#2a2a2a]"
											}
										/>
									))}
								</div>

								<p className="mb-4 text-gray-400">{review.comment}</p>

								<div className="flex gap-6 text-gray-400">
									<button className="flex items-center gap-2 hover:text-white">
										<ThumbsUp size={16} />
										<span>{review.likes}</span>
									</button>
									<button className="flex items-center gap-2 hover:text-white">
										<ThumbsDown size={16} />
										<span>{review.dislikes}</span>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Related Products */}
				<div>
					<h3 className="text-lg font-bold mb-6">Related Products</h3>
					<div className="flex gap-6 overflow-x-auto">
						{getRelatedProducts().map((product) => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className="flex-shrink-0 group"
							>
								<div className="w-40">
									<img
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										className="w-full aspect-square object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform"
									/>
									<h4 className="font-medium text-sm mb-1">
										{product.name}
									</h4>
									<p className="text-gray-400 text-sm">
										${product.price}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
