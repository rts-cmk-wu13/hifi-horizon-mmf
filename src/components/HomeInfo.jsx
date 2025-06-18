export default function HomeInfo() {

    return (
        <section className="home--info bg-black text-white 
        grid grid-cols-[3rem_1fr_1fr_3rem] justify-items-center mt-10 py-20
        ">
            <div className="col-start-2 col-end-3 w-[31.5rem]">
                <h2 className="text-xl font-bold">What we do</h2>

                <p className="text-sm mt-5">We look forward to customising a system to meet your needs.</p>

                <p className="text-sm mt-5">We don't favour one manufacturer over another - the only thing we do
                    favour is making sure our customers get the right product that suits their
                    needs and listening preferences. We will ask many questions in order to
                    ensure that what you buy from us is tailored to you and you alone.</p>

                <p className="text-sm mt-5">
                If you are looking for a product not found in our demonstration showrooms
                or our online site, don't fret as we have access to hundreds of brands.</p>

                <p className="text-sm mt-5">One of our biggest pleasures of working in this industry is to see the smile on
                    our customers, faces when they finally hear and see the system of their
                    dreams.</p>
            </div>

            <div className="col-start-3 col-end-4 ">
                <h2 className="text-xl font-bold">Opening hours</h2>

                <p className="font-bold mt-10">Edinburgh</p>
                <ul>
                    
                    <li className="text-sm">2 Joppa Rd,Edinburgh, EH15 2EU</li>
                    <li className="text-sm">Monday to Friday: 10:00am - 5:30pm</li>
                    <li className="text-sm">Saturday: 10:00am - 5:30pm</li>
                    <li className="text-sm">Sunday: Closed</li>
                </ul>

                <p className="font-bold mt-5">Falkirk</p>
                <ul>
                    
                    <li className="text-sm">44 Cow Wynd, Falkirk, Central Region, FK1 1PU</li>
                    <li className="text-sm">Monday to Friday: 10:00am - 5:30pm</li>
                    <li className="text-sm">Saturday - By appointment only</li>
                    <li className="text-sm">Sunday: Closed</li>
                </ul>
            </div>
        </section>
    )
}