import React, { useEffect, useState } from "react";

export default function CardHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://hifi-api-cpmk.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data fra API:", data);

        if (data.results) {
          setProducts(data.results);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Ukendt dataformat:", data);
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning:", error);
      });
  }, []);

  return (
    <div
      className="card--wrapper
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
    >
      {products.slice(0, 4).map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md flex flex-col justify-between items-center p-6 text-center h-full"
        >
          <div>
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-auto max-w-xs mx-auto mb-4"
            />
            <p className="text-base font-semibold">{product.product_name}</p>
            <p className="text-sm text-gray-600">(Digital Output)</p>
            <p className="text-2xl font-bold my-4">DKK {product.price_dkk}</p>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 max-w-30 flex rounded shadow">
            Read more
          </button>
        </div>
      ))}
    </div>
  );
}
