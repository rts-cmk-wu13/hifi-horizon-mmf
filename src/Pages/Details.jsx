import { useParams } from "react-router";
import { useEffect, useState } from "react";

import "../style/detail.css";
import black from "/icons/black.svg";
import Silver from "/icons/silver.svg";
import Gold from "/icons/gold.svg";
import { GoDotFill } from "react-icons/go";
import Loading from "../components/Loading";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function Shopdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    fetch(`https://hifi-api-cpmk.onrender.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("we do not have that product");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setError(error));
  }, [id]);

  if (error) throw error;

  if (!product) return <Loading />;

  // Support both single image and array of images
  const images = Array.isArray(product.image_url)
    ? product.image_url
    : [product.image_url];

  const goToPrev = () =>
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const goToIndex = (idx) => setCurrentImg(idx);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-gray-700">
        {product.product_name}
      </h1>
      <section className="flex flex-col md:flex-row gap-10 bg-[#F4F4F2] p-8 rounded-lg shadow-md detail__wrapper">
        <div className="flex-1 flex flex-col items-center relative">
          {/* Carousel arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 text-5xl z-10"
            onClick={goToPrev}
            aria-label="Previous image"
            style={{ background: "none", border: "none" }}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <img
            src={images[currentImg]}
            alt={product.product_name}
            className="rounded-lg object-contain w-80max-w-md w-[337px] h-[182px] "
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 text-5xl z-10"
            onClick={goToNext}
            aria-label="Next image"
            style={{ background: "none", border: "none" }}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          {/* Dots: always 3, center is active */}
          <div className="flex gap-2 justify-center mt-4">
            {images.length > 1 &&
              [-1, 0, 1].map((offset) => {
                const idx =
                  (currentImg + offset + images.length) % images.length;
                return (
                  <button
                    key={idx}
                    onClick={() => goToIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      offset === 0 ? "bg-gray-400" : "bg-gray-200"
                    }`}
                    style={{ outline: "none", border: "none" }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                );
              })}
          </div>
        </div>

        <div className=" md:block w-px bg-gray-300 mx-6"></div>
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{product.description}</p>

          <p
            className={`mb-4 ${
              product.stock && product.stock.toLowerCase() === "out of stock"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {product.stock || "Ukendt lagerstatus"}
          </p>
          <div className="color_container mb-10 mt-11 ">
            <div className="flex gap-2">
              <button className="">
                <img src={black} alt="Black" />
              </button>
              <button className="">
                <img src={Silver} alt="Silver" />
              </button>
              <button className="">
                <img src={Gold} alt="gold" />
              </button>
            </div>
            <div className="flex gap-2 text-xs text-gray-500 ">
              <span>Black</span>
              <span>Silver</span>
              <span>Gold</span>
            </div>
          </div>
          <p className="text-2xl font-bold  flex justify-between mb-6">
            {product.price_dkk} DKK{" "}
            <span className="stock flex items-center mr-3 ">
              {" "}
              in stock <GoDotFill className="text-green-600" />{" "}
            </span>
          </p>
          <div className="flex items-center gap-4 mb-6 justify-evenly ">
            <button className="text-black text-3xl">-</button>
            <span className="text-lg">1</span>
            <button className="text-black text-3xl">+</button>
            <button className="cart__bttn">Add to cart</button>
          </div>
        </div>
      </section>
      <hr />

      <section className="specs mt-8">
        <h1 className=" spec__header mb-4">PRODUCT SPECIFICATIONS</h1>
        <div className="specs__wrapper mb-8 ">
          {/*  <span className="  w-2 bg-sky-500 mx-6"></span> */}
          {product.product_specifications ? (
            <article className="bg_controller">
              {Object.entries(product.product_specifications).map(
                ([key, value]) => (
                  <div className="specs__row" key={key}>
                    <strong>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </strong>
                    <span className="specs__value">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value}
                    </span>
                  </div>
                )
              )}
            </article>
          ) : (
            <p>Ingen specifikationer tilgængelige.</p>
          )}
        </div>
      </section>
    </>
  );
}
