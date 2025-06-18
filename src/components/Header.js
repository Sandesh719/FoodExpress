import { Link } from "react-router";
import { AiOutlineArrowRight } from "react-icons/ai";

const Logo = new URL('../assests/images/logo.png', import.meta.url).href;

const Title = () => (
  <Link to="/"><img 
    src={Logo} 
    className="w-32 h-20 object-cover rounded-lg hover:scale-105 transition-transform"
  /></Link>
);

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <Title />
      
      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/instamart">Instamart</NavLink>
        </ul>
      </nav>
      
      {/* Login Button */}
      <button className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
        Login <AiOutlineArrowRight className="ml-1.5 text-xl" />
      </button>
    </div>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-700 font-medium hover:text-orange-500 transition-colors relative group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all group-hover:w-full"></span>
    </Link>
  </li>
);

export default Header;