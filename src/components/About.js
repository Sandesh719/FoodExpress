import { FaMotorcycle, FaHeart, FaStar, FaLeaf } from 'react-icons/fa6';

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Serving Happiness, One Meal at a Time
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We connect hungry customers with their favorite local restaurants - delivering convenience, 
          quality, and deliciousness since 2023.
        </p>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <StatCard icon={<FaMotorcycle />} number="10,000+" label="Daily Deliveries" />
        <StatCard icon={<FaHeart />} number="500+" label="Restaurant Partners" />
        <StatCard icon={<FaStar />} number="4.8" label="Average Rating" />
        <StatCard icon={<FaLeaf />} number="20+" label="Cities Served" />
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              It all started with a simple idea: why should good food be limited by geography? 
              Founded in 2023 by a team of food enthusiasts and tech experts, we set out to 
              revolutionize food delivery in India.
            </p>
            <p className="text-gray-600">
              Today, we're proud to be the fastest growing food delivery platform, connecting 
              millions of customers with thousands of restaurants across the country.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMHRlYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
            alt="Our team" 
            className="rounded-lg shadow-xl w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What We Believe In</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            title="Quality First" 
            description="We rigorously vet all restaurant partners to ensure every meal meets our standards."
          />
          <ValueCard 
            title="Lightning Fast" 
            description="Our delivery network guarantees your food arrives hot and fresh, every time."
          />
          <ValueCard 
            title="Customer Love" 
            description="Your satisfaction drives every decision we make as a company."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Journey</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you're a hungry customer, restaurant partner, or delivery executive - 
          there's a place for you in our food-loving community.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Explore Opportunities
        </button>
      </section>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, number, label }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm text-center">
    <div className="text-orange-500 text-4xl mb-3 flex justify-center">{icon}</div>
    <p className="text-2xl font-bold text-gray-800 mb-1">{number}</p>
    <p className="text-gray-500">{label}</p>
  </div>
);

const ValueCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutPage;