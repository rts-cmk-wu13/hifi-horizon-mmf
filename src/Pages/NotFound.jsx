import { Link } from "react-router";
export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center animate-fadeIn">
          <img
            src="https://yemca-services.net/404.png"
            alt="404 Illustration"
            className="mx-auto w-100 animate-[float_3s_infinite] shadow-xl rounded-lg"
          />
          <h1 className="text-7xl font-extrabold text-blue-700 mt-6">
            Looks Like You're Lost!
          </h1>
          <p className="text-xl text-gray-700 mt-2">
            We can't seem to find the page you're looking for.
          </p>
          <Link
            className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
            to={"/"}
          >
            {" "}
            Return home
          </Link>
        </div>
      </div>
    </>
  );
}
