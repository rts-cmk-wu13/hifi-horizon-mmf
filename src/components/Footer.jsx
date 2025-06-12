import { FaStripe } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <section className="bg-black text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <nav aria-label="Main footer" className="mb-4">
          <ul>
            <li>
              <a href="#" className="hover:text-purple-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <section aria-labelledby="returns-refunds-heading">
          <h3
            id="returns-refunds-heading"
            className="text-white-500 font-bold mb-4"
          >
            Returns & Refunds
          </h3>
          <ul>
            <li>
              <a href="#" className="hover:text-purple-500">
                Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </section>
        <address className="not-italic">
          <h3 className="text-white-500 font-bold mb-4">Contact</h3>
          <p>
            2 Joppa Rd, Edinburgh, EH15 2EU
            <br />
            <IoCallOutline /> 0131 556 7901
          </p>

          <div
            className="flex items-center space-x-4 mt-2 text-2xl"
            aria-label="Social media"
          >
            <a href="#" className="hover:text-purple-500" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-purple-500" aria-label="Twitter">
              <FaTwitterSquare />
            </a>
            <a
              href="#"
              className="hover:text-purple-500"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-purple-500" aria-label="Youtube">
              <FaYoutube />
            </a>
          </div>
        </address>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <div className=" " aria-label="Payment methods">
          <article className="payment-icons flex space-x-4 text-3xl">
            <FaStripe />
            <FaCcVisa />
            <FaCcMastercard />
          </article>
        </div>
      </div>
    </section>
  );
}
