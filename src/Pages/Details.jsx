import productImg from "/public/product_1.svg";
import "../style/detail.css";

export default function Shopdetails() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-gray-700">Product</h1>
      <section className="flex flex-col md:flex-row gap-10 bg-gray-50 p-8 rounded-lg shadow-md detail__wrapper">
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full max-w-md">
            <img
              src={productImg}
              alt="Auralic Aries G2.1 Streamer"
              className="rounded-lg object-contain w-full"
            />

            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
              <span className="text-2xl">&#8592;</span>
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
              <span className="text-2xl">&#8594;</span>
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Auralic Aries G2.1 Streamer
            </h2>
            <p className="text-lg text-gray-600 mb-1">(Digital Output)</p>
            <p className="text-gray-700 mb-4">
              G2.1 is the next logical evolutionary step, resulting from a
              desire to improve upon the original G2 series. At AURALiC, we
              always work to create a new approach to digital music that pushes
              the boundaries of sonic quality. Incorporating state-of-the-art
              technologies and delivered with innovative features, G2.1 is built
              for ultimate levels of sonic performance.
            </p>
            <p className="text-gray-700 mb-4">
              Every G2.1 series component, including the ARIES G2.1, sports an
              all-new industrial design that’s engineered to set a new standard
              for sound quality, enhance the user experience, and look every bit
              as good as it sounds with its contemporary aesthetic. Offering
              features like a copper enclosure, a high-mass base, and an
              enhanced suspension system optimizes the sound of the ARIES G2.1
              and ensures it is the most capable and feature-rich way to
              introduce streaming to your audio system that we’ve ever created.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 rounded-full border-2 border-black bg-black"
                  aria-label="Select Black color"
                >
                  <span className="sr-only">Select Black color</span>
                </button>
                <button
                  className="w-8 h-8 rounded-full border-2 border-gray-400 bg-gray-200"
                  aria-label="Select Silver color"
                >
                  <span className="sr-only">Select Silver color</span>
                </button>
                <button
                  className="w-8 h-8 rounded-full border-2 border-yellow-400 bg-yellow-200"
                  aria-label="Select Gold color"
                >
                  <span className="sr-only">Select Gold color</span>
                </button>
              </div>
              <div className="flex gap-6 text-xs text-gray-500">
                <span>Black</span>
                <span>Silver</span>
                <span>Gold</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <span className="text-2xl font-bold">£ 4,799.00</span>
              <span className="flex items-center text-green-600">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                In stock
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button className="text-black text-3xl">-</button>
              <span className="text-lg">1</span>
              <button className="text-black text-3xl">+</button>
            </div>

            <button className="cart__bttn">Add to cart</button>
          </div>
        </div>
      </section>
    </>
  );
}
