import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import logo from "/public/logo_sml 1.png";

const CATEGORIES = [
  { label: "CD Players", value: "cd-afspillere" },
  { label: "DVD Players", value: "dvd-afspillere" },
  { label: "forforstaerkere", value: "forforstaerkere" },
  { label: "hojtalere", value: "hojtalere" },
];

export default function Header() {
  const navigate = useNavigate();
  const [hoverShop, setHoverShop] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
    setHoverShop(false);
  };

  return (
    <header className="bg-black text-white p-5 flex items-center justify-between relative">
      <nav
        className="flex justify-center items-center relative"
        onMouseLeave={() => setHoverShop(false)}
      >
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </Link>

        <div
          className="cursor-pointer px-4 text-sm font-sans relative inline-block"
          onMouseEnter={() => setHoverShop(true)}
          onClick={() => {
            navigate("/shop");
            setHoverShop(false);
          }}
        >
          <p>SHOP</p>
          {hoverShop && (
            
            <div className="absolute top-full left-5 bg-white text-[#A39161] shadow-lg z-50 flex flex-col min-w-[22.563rem]">
              <p className="text-black text-2xl my-[1rem]">Browse Categories</p>
              {CATEGORIES.map((cat) => (
                <span
                  key={cat.value}
                  className="px-4 py-2 border-b border-none hover:bg-gray-200 whitespace-nowrap cursor-pointer text-md"
                  onClick={(e) => {
                    e.stopPropagation(); // forhindrer klik i at trigge /shop navigation
                    handleCategoryClick(cat.value);
                  }}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <NavLink to={"/About"} className="text-sm font-sans px-4 inline-block cursor-pointer">
          <li className="list-none">ABOUT US</li>
        </NavLink>
        <NavLink to={"/Contact"} className="text-sm font-sans px-4 inline-block cursor-pointer">
          <li className="list-none">CONTACT US</li>
        </NavLink>
      </nav>

      <div className="flex items-center gap-5">
        <div className="relative flex items-center w-[252px] bg-white rounded-md p-1">
          <input
            type="text"
            placeholder="Search Products"
            className="pl-3 pr-10 py-2 w-[200px] rounded-md border-none focus:outline-none"
          />
          <i className="fa-solid fa-magnifying-glass text-black text-xl absolute right-3"></i>
        </div>
        <i className="fa-solid fa-user cursor-pointer"></i>
        <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
      </div>
    </header>
  );
}
