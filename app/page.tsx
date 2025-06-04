import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="px-4 md:px-40 flex flex-1 justify-center py-5 bg-[#0a0a0a]">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Hero Section - Reduced padding */}
        <div className="flex flex-col items-center text-center py-12 px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-[-0.015em] mb-6">
            Express Your Anime Passion
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-normal leading-normal mb-8 max-w-2xl">
            Discover premium anime-inspired clothing that brings your favorite characters and series to life. Quality
            craftsmanship meets authentic anime culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-[#e8b4b7] text-[#0a0a0a] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d4a1a4] transition-colors"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/collections"
              className="flex items-center justify-center rounded-xl h-12 px-6 border border-[#2a2a2a] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:border-[#e8b4b7] hover:text-[#e8b4b7] transition-colors"
            >
              View Collections
            </Link>
          </div>
        </div>

        {/* Featured Collections - Moved up */}
        <div className="py-8">
          <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] text-center mb-8">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Naruto Collection",
                description: "Embrace the ninja way",
                image:
                  "/downloaded-images/image-1.png",
                collection: "naruto",
              },
              {
                name: "One Piece Collection",
                description: "Set sail with the crew",
                image:
                  "/downloaded-images/image-2.png",
                collection: "one-piece",
              },
              {
                name: "Attack on Titan",
                description: "Fight for humanity",
                image:
                  "/downloaded-images/image-3.png",
                collection: "attack-on-titan",
              },
              {
                name: "Demon Slayer",
                description: "Slay demons in style",
                image:
                  "/downloaded-images/image-4.png",
                collection: "demon-slayer",
              },
            ].map((collection, index) => (
              <Link key={index} href={`/shop?collection=${collection.collection}`} className="group">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl group-hover:scale-105 transition-transform duration-300 bg-gray-800"
                    style={{ backgroundImage: `url("${collection.image}")` }}
                  />
                  <div>
                    <p className="text-white text-base font-medium leading-normal group-hover:text-[#e8b4b7] transition-colors">
                      {collection.name}
                    </p>
                    <p className="text-gray-400 text-sm font-normal leading-normal">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="py-12 text-center">
          <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-6">
            Why Choose Anime Threads?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mb-4">
                <span className="text-[#0a0a0a] text-2xl font-bold">Q</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Made from 100% premium materials with meticulous craftsmanship</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mb-4">
                <span className="text-[#0a0a0a] text-2xl font-bold">A</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Authentic Designs</h3>
              <p className="text-gray-400 text-sm">
                Officially inspired designs that capture the essence of your favorite anime
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mb-4">
                <span className="text-[#0a0a0a] text-2xl font-bold">C</span>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Community</h3>
              <p className="text-gray-400 text-sm">Join a passionate community of anime fans who share your love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
