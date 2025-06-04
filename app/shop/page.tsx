"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import PriceRangeSlider from "@/components/price-range-slider"

const products = [
	{
		id: 1,
		name: "Naruto Shippuden T-Shirt",
		price: 25,
		image: "/downloaded-images/image-1.png",
		category: "Shirts",
		size: ["S", "M", "L", "XL"],
		series: "Naruto",
		collection: "naruto",
	},
	{
		id: 2,
		name: "One Piece Luffy Hoodie",
		price: 50,
		image: "/downloaded-images/image-2.png",
		category: "Hoodies",
		size: ["M", "L", "XL"],
		series: "One Piece",
		collection: "one-piece",
	},
	{
		id: 3,
		name: "Attack on Titan Survey Corps Jacket",
		price: 75,
		image: "/downloaded-images/image-3.png",
		category: "Jackets",
		size: ["S", "M", "L"],
		series: "Attack on Titan",
		collection: "attack-on-titan",
	},
	{
		id: 4,
		name: "Demon Slayer Tanjiro T-Shirt",
		price: 25,
		image: "/downloaded-images/image-4.png",
		category: "Shirts",
		size: ["XS", "S", "M", "L"],
		series: "Demon Slayer",
		collection: "demon-slayer",
	},
	{
		id: 5,
		name: "Naruto Akatsuki Cloak",
		price: 60,
		image: "/downloaded-images/image-5.png",
		category: "Jackets",
		size: ["M", "L", "XL"],
		series: "Naruto",
		collection: "naruto",
	},
	{
		id: 6,
		name: "One Piece Straw Hat Crew T-Shirt",
		price: 30,
		image: "/downloaded-images/image-6.png",
		category: "Shirts",
		size: ["S", "M", "L", "XL"],
		series: "One Piece",
		collection: "one-piece",
	},
	{
		id: 7,
		name: "Attack on Titan Eren Yeager Hoodie",
		price: 55,
		image: "/downloaded-images/image-18.png",
		category: "Hoodies",
		size: ["M", "L", "XL"],
		series: "Attack on Titan",
		collection: "attack-on-titan",
	},
	{
		id: 8,
		name: "Demon Slayer Nezuko T-Shirt",
		price: 20,
		image: "/downloaded-images/image-8.png",
		category: "Shirts",
		size: ["XS", "S", "M"],
		series: "Demon Slayer",
		collection: "demon-slayer",
	},
]

export default function ShopPage() {
	const searchParams = useSearchParams()
	const [searchTerm, setSearchTerm] = useState(searchParams?.get("search") || "")
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [selectedSizes, setSelectedSizes] = useState<string[]>([])
	const [selectedSeries, setSelectedSeries] = useState<string[]>([])
	const [selectedCollection, setSelectedCollection] = useState<string>(searchParams?.get("collection") || "")
	const [priceRange, setPriceRange] = useState<[number, number]>([20, 100])

	useEffect(() => {
		const collection = searchParams?.get("collection")
		const search = searchParams?.get("search")
		if (collection) {
			setSelectedCollection(collection)
		}
		if (search) {
			setSearchTerm(search)
		}
	}, [searchParams])

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
		const matchesSize = selectedSizes.length === 0 || selectedSizes.some((size) => product.size.includes(size))
		const matchesSeries = selectedSeries.length === 0 || selectedSeries.includes(product.series)
		const matchesCollection = !selectedCollection || product.collection === selectedCollection
		const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

		return (
			matchesSearch &&
			matchesCategory &&
			matchesSize &&
			matchesSeries &&
			matchesCollection &&
			matchesPrice
		)
	})

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
		)
	}

	const handleSizeChange = (size: string) => {
		setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
	}

	const handleSeriesChange = (series: string) => {
		setSelectedSeries((prev) => (prev.includes(series) ? prev.filter((s) => s !== series) : [...prev, series]))
	}

	return (
		<div className="flex min-h-screen bg-[#0a0a0a]">
			{/* Filters Sidebar */}
			<div className="w-64 bg-[#0a0a0a] p-6 border-r border-[#1a1a1a]">
				<h3 className="text-white text-lg font-bold mb-6">Filters</h3>

				{/* Clear Filters */}
				{(selectedCategories.length > 0 ||
					selectedSizes.length > 0 ||
					selectedSeries.length > 0 ||
					selectedCollection) && (
					<button
						onClick={() => {
							setSelectedCategories([])
							setSelectedSizes([])
							setSelectedSeries([])
							setSelectedCollection("")
							setPriceRange([20, 100])
						}}
						className="text-[#e8b4b7] text-sm mb-4 hover:underline"
					>
						Clear All Filters
					</button>
				)}

				{/* Collection Filter */}
				{selectedCollection && (
					<div className="mb-6 p-3 bg-[#1a1a1a] rounded-lg">
						<div className="flex justify-between items-center">
							<span className="text-white text-sm">Collection: {selectedCollection}</span>
							<button
								onClick={() => setSelectedCollection("")}
								className="text-[#e8b4b7] text-xs hover:underline"
							>
								Remove
							</button>
						</div>
					</div>
				)}

				{/* Category Filter */}
				<div className="mb-8">
					<h4 className="text-gray-400 text-sm font-bold mb-4">Category</h4>
					<div className="space-y-3">
						{["Shirts", "Hoodies", "Jackets"].map((category) => (
							<label
								key={category}
								className="flex items-center gap-3 cursor-pointer"
							>
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-[#2a2a2a] border-2 bg-transparent text-[#e8b4b7] checked:bg-[#e8b4b7] checked:border-[#e8b4b7] focus:ring-0 focus:ring-offset-0"
									checked={selectedCategories.includes(category)}
									onChange={() => handleCategoryChange(category)}
								/>
								<span className="text-white text-sm">{category}</span>
							</label>
						))}
					</div>
				</div>

				{/* Size Filter */}
				<div className="mb-8">
					<h4 className="text-gray-400 text-sm font-bold mb-4">Size</h4>
					<div className="space-y-3">
						{["XS", "S", "M", "L", "XL"].map((size) => (
							<label
								key={size}
								className="flex items-center gap-3 cursor-pointer"
							>
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-[#2a2a2a] border-2 bg-transparent text-[#e8b4b7] checked:bg-[#e8b4b7] checked:border-[#e8b4b7] focus:ring-0 focus:ring-offset-0"
									checked={selectedSizes.includes(size)}
									onChange={() => handleSizeChange(size)}
								/>
								<span className="text-white text-sm">{size}</span>
							</label>
						))}
					</div>
				</div>

				{/* Price Range Slider */}
				<div className="mb-8">
					<h4 className="text-gray-400 text-sm font-bold mb-4">Price</h4>
					<PriceRangeSlider min={20} max={100} value={priceRange} onChange={setPriceRange} />
				</div>

				{/* Anime Series Filter */}
				<div className="mb-8">
					<h4 className="text-gray-400 text-sm font-bold mb-4">Anime Series</h4>
					<div className="space-y-3">
						{["Naruto", "One Piece", "Attack on Titan", "Demon Slayer"].map((series) => (
							<label
								key={series}
								className="flex items-center gap-3 cursor-pointer"
							>
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-[#2a2a2a] border-2 bg-transparent text-[#e8b4b7] checked:bg-[#e8b4b7] checked:border-[#e8b4b7] focus:ring-0 focus:ring-offset-0"
									checked={selectedSeries.includes(series)}
									onChange={() => handleSeriesChange(series)}
								/>
								<span className="text-white text-sm">{series}</span>
							</label>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6">
				<div className="mb-6">
					<h1 className="text-white text-3xl font-bold mb-6">Shop</h1>

					{/* Search Bar */}
					<div className="relative mb-8">
						<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
							<Search className="text-gray-400" size={20} />
						</div>
						<input
							placeholder="Search for items"
							className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1a1a1a] border-none text-white placeholder:text-gray-400 focus:outline-none focus:ring-0"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{/* Results count */}
				<div className="mb-4">
					<p className="text-gray-400 text-sm">
						Showing {filteredProducts.length} of {products.length} products
					</p>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-3 gap-6">
					{filteredProducts.map((product) => (
						<Link key={product.id} href={`/product/${product.id}`} className="group">
							<div className="bg-white rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
								<div className="aspect-square bg-gray-100 flex items-center justify-center">
									<img
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-4">
									<h3 className="text-black font-medium text-sm mb-1">{product.name}</h3>
									<p className="text-gray-600 text-sm">${product.price}</p>
								</div>
							</div>
						</Link>
					))}
				</div>

				{filteredProducts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-400 text-lg">No products found matching your criteria.</p>
						<button
							onClick={() => {
								setSelectedCategories([])
								setSelectedSizes([])
								setSelectedSeries([])
								setSelectedCollection("")
								setSearchTerm("")
								setPriceRange([20, 100])
							}}
							className="mt-4 text-[#e8b4b7] hover:underline"
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
