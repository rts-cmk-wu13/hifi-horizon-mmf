import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

export default function ShopSidebar() {
  const [open, setOpen] = useState({
    brand: true,
    color: true,
    price: true,
  });

  const toggle = (section) =>
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <aside className="w-1/5 p-4">
      <h3 className="text-lg font-semibold mb-2">Sort by</h3>
      <div className="space-y-2">
        {/* Brand Dropdown */}
        <div>
          <div
            className="header__dropdown flex justify-between items-center cursor-pointer"
            onClick={() => toggle("brand")}
          >
            <h3 className="flex flex-end">Brand</h3>
            <RiArrowDropDownLine
              className={`text-5xl transition-transform dropdown__icon ${
                open.brand ? "rotate-180" : ""
              }`}
            />
          </div>
          {open.brand && (
            <div className="mt-2 space-y-2">
              <div className="filters_text">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="brand"
                />
                <label className="mb-0 mr-2">Steelseries</label>
              </div>
              <div className="filters_text">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="brand"
                />
                <label className="mb-0 mr-2">Logitech</label>
              </div>
              <div className="filters_text">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="brand"
                />
                <label className="mb-0 mr-2">Apple</label>
              </div>
            </div>
          )}
        </div>
        {/* Color Dropdown */}
        <div className="mt-4">
          <div
            className="header__dropdown flex justify-between items-center cursor-pointer"
            onClick={() => toggle("color")}
          >
            <h3>Color</h3>
            <RiArrowDropDownLine
              className={`text-5xl transition-transform dropdown__icon  ${
                open.color ? "rotate-180" : ""
              }`}
            />
          </div>
          {open.color && (
            <div className="mt-2 space-y-2">
              <div className="flex flex-row-reverse items-center justify-between gap-2">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="color"
                />
                <label className="mb-0 mr-2 flex items-center justify-between">
                  <GoDotFill className="text-white text-3xl" />
                  White
                </label>
              </div>
              <div className="flex flex-row-reverse items-center justify-between gap-2">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="color"
                />
                <label className="mb-0 mr-2">
                  {" "}
                  <GoDotFill className="text-black text-3xl" />
                  Black
                </label>
              </div>
              <div className="flex flex-row-reverse items-center justify-between gap-2">
                <input
                  type="radio"
                  className="option-input radio ml-2"
                  name="color"
                />
                <label className="mb-0 mr-2">
                  <GoDotFill className="text-gray-500 text-3xl" />
                  Grey
                </label>
              </div>
            </div>
          )}
        </div>
        {/* Price Dropdown */}
        <div className="mt-4">
          <div
            className="header__dropdown flex justify-between items-center cursor-pointer"
            onClick={() => toggle("price")}
          >
            <h3>Price</h3>
            <RiArrowDropDownLine
              className={`text-5xl transition-transform dropdown__icon  ${
                open.price ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
