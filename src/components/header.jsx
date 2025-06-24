import { Link, NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import logo from "/logo_sml 1.png";
import "../style/rwd.scss";

const CATEGORIES = [
  { label: "CD Players", value: "cd-afspillere" },
  { label: "DVD Players", value: "dvd-afspillere" },
  { label: "forforstaerkere", value: "forforstaerkere" },
  { label: "hojtalere", value: "hojtalere" },
];

export default function Header() {
  const navigate = useNavigate();
  const [hoverShop, setHoverShop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search state
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    fetch("https://hifi-api-cpmk.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.results ? data.results : data;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      })
      .catch((err) => console.error("Fejl ved hentning af produkter:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
    setHoverShop(false);
  };

  const handleSearch = () => {
    if (searchItem.trim() !== "") {
      const matchedProduct = products.find(
        (p) => p.product_name.toLowerCase() === searchItem.toLowerCase()
      );
      if (matchedProduct) {
        navigate(`/shop/product/${matchedProduct.id}`);
        setSearchItem("");
      } else {
        alert("Produkt ikke fundet");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
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
                  className="px-4 py-2 hover:bg-gray-200 whitespace-nowrap cursor-pointer text-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(cat.value);
                  }}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <NavLink
          to={"/About"}
          className="text-sm font-sans px-4 inline-block cursor-pointer"
        >
          <li className="list-none">ABOUT US</li>
        </NavLink>
        <NavLink
          to={"/Contact"}
          className="text-sm font-sans px-4 inline-block cursor-pointer"
        >
          <li className="list-none">CONTACT US</li>
        </NavLink>
      </nav>

      <div className="flex items-center gap-5 relative">
        <div className="relative flex items-center w-[252px] bg-white rounded-[0.1rem] p-1">
          <input
            type="text"
            placeholder="Search Products"
            value={searchItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-3 pr-10 py-2 w-[200px] text-black rounded-sm border-none focus:outline-none"
          />

          {/* Autocomplete liste */}
          {searchItem && filteredProducts.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white text-[#A39161] max-h-48 overflow-y-auto shadow-lg z-50">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    navigate(`/shop/product/${product.id}`);
                    setSearchItem("");
                  }}
                >
                  {product.product_name}
                </li>
              ))}
            </ul>
          )}

          <i
            className="fa-solid fa-magnifying-glass text-black text-xl absolute right-3 cursor-pointer"
            onClick={handleSearch}
          ></i>
        </div>
        <i className="fa-solid fa-user cursor-pointer"></i>
        <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
      </div>

      {/* Hamburger Menu */}
      <div
        className="hamburger lg:hidden flex flex-col cursor-pointer p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="w-6 h-0.5 bg-white mb-1"></span>
        <span className="w-6 h-0.5 bg-white mb-1"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </div>
      {isMenuOpen && (
        <div className="menu-overlay fixed top-0 left-0 w-full h-screen bg-black p-4 flex flex-col gap-4 z-50 lg:hidden">
          <div className="flex justify-end">
            <i
              className="fa-solid fa-times text-yellow-500 text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            ></i>
          </div>
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-lg"
          >
            <li className="list-none">
              <img src={logo} alt="logoburger" />
            </li>
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-lg"
          >
            <li className="list-none">SHOP</li>
          </NavLink>
          <NavLink
            to="/About"
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-lg"
          >
            <li className="list-none">ABOUT US</li>
          </NavLink>
          <NavLink
            to="/Contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-lg"
          >
            <li className="list-none">CONTACT US</li>
          </NavLink>
          <div className="flex items-center gap-5 mt-4">
            <i className="fa-solid fa-magnifying-glass text-white text-xl cursor-pointer"></i>
            <i className="fa-solid fa-user text-white text-xl cursor-pointer"></i>
            <i className="fa-solid fa-cart-shopping text-yellow-500 text-xl cursor-pointer"></i>
          </div>
        </div>
      )}
    </header>
  );
}
