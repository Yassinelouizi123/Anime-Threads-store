export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ethan Harper",
      role: "Lead Designer",
      image: "/lead-designer.png",
      bgColor: "bg-teal-600",
    },
    {
      name: "Sophia Bennett",
      role: "Marketing Manager",
      image:"Marketing-Manager.png",
      bgColor: "bg-orange-400",
    },
    {
      name: "Liam Carter",
      role: "Operations Director",
      image:"Operations-Director.png",
      bgColor: "bg-gray-500",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Our Story Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Our Story</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            At Anime Threads, our journey began with a shared passion for anime and a desire to express that love
            through fashion. Founded in 2018 by a group of friends who grew up watching anime together, we set out to
            create a brand that celebrates the vibrant culture and artistry of anime.
          </p>

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden mb-12">
            <img
              src="Team working together.png"
              alt="Team working together"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            Our mission is to bring the world of anime to life through high-quality, stylish clothing that resonates
            with fans. We aim to create pieces that not only look great but also capture the essence of beloved anime
            series and characters. We believe that fashion is a form of self-expression, and our clothing allows fans to
            wear their passion proudly.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <p className="text-gray-400 leading-relaxed">
            <strong className="text-white">Quality:</strong> We are committed to using premium materials and meticulous
            craftsmanship to ensure our clothing is both comfortable and durable.
            <strong className="text-white"> Creativity:</strong> We strive to create unique designs that reflect the
            diverse and imaginative world of anime.
            <strong className="text-white"> Community:</strong> We value our community of fans and aim to foster a sense
            of belonging through our brand and products.
            <strong className="text-white"> Sustainability:</strong> We are dedicated to ethical and sustainable
            practices in our production process, minimizing our environmental impact.
          </p>
        </div>

        {/* Meet the Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className={`w-48 h-48 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden`}>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
