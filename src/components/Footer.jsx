import { FaStripe } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { Link } from "react-router";

export default function Footer() {
  return (
    <section className="bg-black text-white p-6 px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
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
        <address className="not-italic">
          <h3 className="text-white-500 text-sm  mb-4 ">Contact</h3>
          <p>
            2 Joppa Rd, Edinburgh, EH15 2EU
            <br />
          </p>
          <article className="Phone_numbers ">
            <p className="flex items-center space-x-2 justify-center">
              <IoCallSharp /> <span> 0131 556 7901</span>
            </p>
            <br />
            <p>44 Cow Wynd, Falkirk, Central Region, FK1 1PU</p>
            <p className="flex items-center space-x-2 justify-center">
              <IoCallSharp /> <span> 01324 629 011</span>
            </p>
          </article>

          <div
            className="flex items-center justify-center space-x-4 mt-2 text-2xl"
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
      <div className=" border__control text-white border-t  mt-6 pt-4 text-center">
        <div className=" " aria-label="Payment methods flex">
          <article className="payment-icons gap-3 flex space-x-4 text-3xl  ">
            <FaStripe className=" cursor-pointer bg-white text-black " />
            <FaCcVisa className="cursor-pointer " />
            <FaCcMastercard className="cursor-pointer " />
          </article>
          <p className="payment_Text text-white-500 mt-2">
            HiFi Horizon (Edinburgh) Ltd is registered in Scotland. No:
            SC049298. Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
            <span className="">
              {" "}
              Designed by WU13 <GoSmiley className="text-sky-400" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
