import Link from "next/link"

const collections = [
  {
    name: "Naruto Collection",
    description: "Embrace the ninja way with our Naruto-inspired apparel.",
    image:"Naruto Collection.png",
    collection: "naruto",
  },
  {
    name: "One Piece Collection",
    description: "Set sail with our One Piece-themed clothing.",
    image:"One Piece Collection.png",
    collection: "one-piece",
  },
  {
    name: "Attack on Titan Collection",
    description: "Fight for humanity with our Attack on Titan gear.",
    image:"Attack on Titan Collection.png",
    collection: "attack-on-titan",
  },
  {
    name: "Demon Slayer Collection",
    description: "Slay demons in style with our Demon Slayer collection.",
    image:"Demon Slayer Collection.png",
    collection: "demon-slayer",
  },
]

const featuredCollections = [
  {
    name: "Studio Ghibli Collection",
    description: "Experience the magic of Studio Ghibli with our enchanting apparel.",
    image:"Studio Ghibli Collection.png",
    collection: "studio-ghibli",
  },
  {
    name: "Neon Genesis Evangelion Collection",
    description: "Dive into the world of Evangelion with our unique clothing.",
    image:"Neon Genesis Evangelion Collection.png",
    collection: "evangelion",
  },
  {
    name: "Cowboy Bebop Collection",
    description: "Explore the galaxy with our Cowboy Bebop-inspired gear.",
    image:"Cowboy Bebop Collection.png",
    collection: "cowboy-bebop",
  },
  {
    name: "Dragon Ball Z Collection",
    description: "Power up with our Dragon Ball Z collection.",
    image:"Dragon Ball Z Collection.png",
    collection: "dragon-ball-z",
  },
]

export default function CollectionsPage() {
  return (
    <div className="px-4 md:px-40 flex flex-1 justify-center py-5 bg-[#0a0a0a]">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">Collections</p>
            <p className="text-gray-400 text-sm font-normal leading-normal">
              Explore our curated collections inspired by your favorite anime series.
            </p>
          </div>
        </div>

        {/* Main Collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
          {collections.map((collection, index) => (
            <Link key={index} href={`/shop?collection=${collection.collection}`} className="group">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
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

        {/* Featured Collections */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
          {featuredCollections.map((collection, index) => (
            <Link key={index} href={`/shop?collection=${collection.collection}`} className="group">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
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
    </div>
  )
}
