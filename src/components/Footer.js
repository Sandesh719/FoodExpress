import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
    return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              
              {/* Column 1: Brand Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FoodExpress</h3>
                <p className="text-gray-400">
                  Delivering happiness since 2023
                </p>
                <div className="flex space-x-4 ">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer"><FaFacebook/></span>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer"><FaInstagram/></span>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer"><FaTwitter/></span>
                </div>
              </div>  
              {/* Column 2: Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <FooterLink href="/about">About Us</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/blog">Blog</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                </ul>
              </div>  
              {/* Column 3: Help */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <FooterLink href="/payment">Payment</FooterLink>
                  <FooterLink href="/shipping">Shipping</FooterLink>
                  <FooterLink href="/cancellation">Cancellation</FooterLink>
                  <FooterLink href="/faq">FAQ</FooterLink>
                </ul>
              </div>  
              {/* Column 4: Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <address className="not-italic text-gray-400 space-y-2">
                  <p>123 Food Street, Food City</p>
                  <p>Phone: +1 234 567 890</p>
                  <p>Email: hello@foodexpress.com</p>
                </address>
              </div>
            </div>    
            {/* Divider */}
            <div className="border-t border-gray-700 my-6"></div> 
            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} FoodExpress. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <FooterLink href="/privacy" small>Privacy Policy</FooterLink>
                <FooterLink href="/terms" small>Terms of Service</FooterLink>
                <FooterLink href="/sitemap" small>Sitemap</FooterLink>
              </div>
            </div>
        </div>
    </footer>
    );
  };
  
  // Reusable components
  const FooterLink = ({ href, children, small = false }) => (
    <li>
      <a 
        href={href} 
        className={`hover:text-white transition-colors ${small ? 'text-xs' : 'text-sm'}`}
      >
        {children}
      </a>
    </li>
  );
  
  const SocialIcon = ({ platform }) => (
    <a href="#" className="text-gray-400 hover:text-white transition-colors">
      {/* <span className="sr-only">{platform}</span> */}
      <div className="flex flex-row">
      <FaFacebook/>
      <FaInstagram/>
      <FaTwitter/>
      </div>
      {/* <div className="w-6 h-6 bg-gray-700 rounded-full"></div> */}
    </a>
  );
  
  export default Footer;