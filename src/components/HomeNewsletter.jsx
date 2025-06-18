import { Form } from "react-router"

export default function HomeNewsletter() {
    return (
        <section className="bg-white shadow-md py-10 px-6 text-center max-w-5xl mx-auto my-[5rem]">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">Sign up for our newsletter</h2>
            <p className="text-gray-700 max-w-3xl mx-auto mb-6">
                Subscribing to our newsletter secures you up to date information about HiFi Horizons latest updates and offers.
            </p>

            <Form method="post" className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full sm:w-[400px] px-4 py-3 rounded-md shadow text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-sm shadow">
                    Sign up
                </button>
            </Form>
        </section>
    )
}