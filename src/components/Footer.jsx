import {
  FaStripe,
  FaCcVisa,
  FaCcMastercard,
  FaFacebookF,
  FaTwitterSquare,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white p-6 px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Links */}
        <nav aria-label="Main footer navigation" className="mb-4">
          <ul>
            <li>
              <NavLink to="/" className="hover:text-purple-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Shop" className="hover:text-purple-500">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" className="hover:text-purple-500">
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Returns and Policies */}
        <section aria-labelledby="returns-refunds-heading">
          <ul>
            <li>
              <Link to="/FAQ#section__refunds" className="hover:text-purple-500">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/FAQ#delivery" className="hover:text-purple-500">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/FAQ#privacyPolicy" className="hover:text-purple-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/FAQ#section__termsConditions" className="hover:text-purple-500">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </section>

        {/* Contact Information */}
        <address className="not-italic">
          <h3 className="text-white-500 text-sm mb-4">Contact</h3>
          <p>2 Joppa Rd, Edinburgh, EH15 2EU</p>
          <div className="Phone_numbers mt-4">
            <p className="flex items-center space-x-2">
              <IoCallSharp /> <span>0131 556 7901</span>
            </p>
            <p className="mt-4">44 Cow Wynd, Falkirk, Central Region, FK1 1PU</p>
            <p className="flex items-center space-x-2 mt-2">
              <IoCallSharp /> <span>01324 629 011</span>
            </p>
          </div>

          {/* Social Media Links */}
          <div
            className="flex items-center justify-center space-x-4 mt-4 text-2xl"
            aria-label="Social media links"
          >
            <a href="#" className="hover:text-purple-500" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-purple-500" aria-label="Twitter">
              <FaTwitterSquare />
            </a>
            <a href="#" className="hover:text-purple-500" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-purple-500" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </address>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <div aria-label="Payment methods" className="flex justify-center space-x-4 text-3xl">
          <FaStripe className="cursor-pointer bg-white text-black p-1 rounded" />
          <FaCcVisa className="cursor-pointer" />
          <FaCcMastercard className="cursor-pointer" />
        </div>
        <p className="text-white-500 mt-4 text-sm">
          HiFi Horizon (Edinburgh) Ltd is registered in Scotland. No: SC049298.
          Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
          <span className="ml-2">
            Designed by WU13 <GoSmiley className="text-sky-400" />
          </span>
        </p>
      </div>
    </footer>
  );
}
