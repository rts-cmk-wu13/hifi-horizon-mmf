import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

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
    <section className="grid grid-rows-[4rem_1fr] grid-cols-[2.313rem_auto_1fr_1fr_auto_2.313rem] items-center justify-items-center">
      <h1 className="col-start-2 text-[#495464] text-[1.5rem] font-bold
      ">popular products</h1>
       <Link to={"/Shop"} className="col-start-[-3]">
      <button className="
      bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 w-50 h-10 flex justify-center rounded shadow">See all products</button>
      </Link>
      <div className="card--wrapper col-start-2 col-end-[-2] row-start-2 gap-8
      flex flex-wrap items-center justify-center">
        
      {products.slice(0, 6).map((product, index) => (
      <div key={index}
      className="grid grid-rows-[1fr_3rem_1fr]  justify-items-center
      w-[16.125rem] bg-white rounded-lg shadow-md  p-6 text-center h-[21.188rem]"
    >

        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-[12.375rem] h-[6.188rem] mx-auto mb-4 object-cover"
        />
        <p className="text-base text-[0.875] font-bold">{product.product_name}</p>
        <p className="text-[1.5rem] font-bold my-4">DKK {product.price_dkk}</p>

        <Link to={`/shop/product/${product.id}`}>
      <button className="w-[8rem] h-[2.5rem]
      bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 items-center justify-center max-w-30 flex rounded shadow">
        Read more
      </button>
     </Link>
    </div>
      ))}
    </div>
  </section>

  );
}