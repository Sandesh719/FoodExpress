import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          We're Here to Help
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions, feedback, or need support? Reach out to our team anytime.
        </p>
      </section>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <ContactCard 
          icon={<FaHeadset className="text-orange-500 text-2xl" />}
          title="Customer Support"
          details={[
            'Available 24/7',
            'Quickest resolution'
          ]}
          actionText="Chat Now"
          actionLink="#"
        />
        
        <ContactCard 
          icon={<FaEnvelope className="text-orange-500 text-2xl" />}
          title="Email Us"
          details={[
            'help@foodexpress.com',
            'partner@foodexpress.com'
          ]}
          actionText="Send Message"
          actionLink="mailto:help@foodexpress.com"
        />
        
        <ContactCard 
          icon={<FaPhoneAlt className="text-orange-500 text-2xl" />}
          title="Call Us"
          details={[
            'Customers: 1800-123-4567',
            'Restaurants: 1800-765-4321'
          ]}
          actionText="Call Now"
          actionLink="tel:18001234567"
        />
      </div>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem 
            question="How do I track my order?"
            answer="You can track your order in real-time through the 'My Orders' section of our app or website."
          />
          <FAQItem 
            question="What are your delivery hours?"
            answer="Delivery times vary by restaurant but most are available from 8:00 AM to 11:00 PM."
          />
          <FAQItem 
            question="How do I partner my restaurant with you?"
            answer="Please email partner@foodexpress.com or call our restaurant partnership team at 1800-765-4321."
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="your@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="How can we help?"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea 
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button 
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Office Locations */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Offices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OfficeCard 
            city="Bangalore"
            address="123 Food Street, Koramangala"
            hours="Mon-Fri: 9:00 AM - 6:00 PM"
            phone="080-1234-5678"
          />
          <OfficeCard 
            city="Mumbai"
            address="456 Delivery Lane, Andheri East"
            hours="Mon-Fri: 9:00 AM - 6:00 PM"
            phone="022-8765-4321"
          />
        </div>
      </section>
    </div>
  );
};

// Reusable Components
const ContactCard = ({ icon, title, details, actionText, actionLink }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-orange-50 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-2 mb-6">
      {details.map((detail, i) => (
        <li key={i} className="text-gray-600 flex items-start">
          <span className="mr-2">•</span> {detail}
        </li>
      ))}
    </ul>
    <a 
      href={actionLink} 
      className="text-orange-500 font-medium hover:text-orange-600 transition-colors inline-flex items-center"
    >
      {actionText} <span className="ml-1">→</span>
    </a>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <details className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <summary className="font-semibold text-gray-800 cursor-pointer list-none">
      <span className="flex items-center">
        <span className="mr-2 text-orange-500">+</span> {question}
      </span>
    </summary>
    <p className="mt-2 text-gray-600 pl-6">{answer}</p>
  </details>
);

const OfficeCard = ({ city, address, hours, phone }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-start mb-4">
      <FaMapMarkerAlt className="text-orange-500 text-xl mt-1 mr-3" />
      <div>
        <h3 className="text-xl font-bold text-gray-800">{city}</h3>
        <p className="text-gray-600">{address}</p>
      </div>
    </div>
    <div className="space-y-3 pl-9">
      <div className="flex items-center">
        <FaClock className="text-gray-400 mr-3" />
        <span className="text-gray-600">{hours}</span>
      </div>
      <div className="flex items-center">
        <FaPhoneAlt className="text-gray-400 mr-3" />
        <a href={`tel:${phone}`} className="text-gray-600 hover:text-orange-500">{phone}</a>
      </div>
    </div>
  </div>
);

export default ContactPage;