export default function About() {
  const style = {
    aboutusContent: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(4, auto)",
      gap: "20px",
      fontFamily: "sans-serif",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      backgroundColor: "#FFFFFF",
      padding: "2rem",
    },
    img: {
      width: "100%",
      alignSelf: "center",
      justifySelf: "center",
    },
    span: {
      fontSize: "14px",
      color: "#FF6900",
      fontWeight: "bold",
    },
    textAbout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "2em",
    },
    h2: {
      fontSize: "2rem",
      color: "#495464",
      marginBottom: "3rem",
    },
    // Responsive styles for mobile
    "@media (max-width: 768px)": {
      aboutusContent: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "none",
        padding: "1rem",
      },
      textAbout: {
        padding: "1em",
      },
    },
  };

  return (
    <>
      <style>
        {`
                @media (max-width: 768px) {
                    .aboutus-content {
                        grid-template-columns: 1fr !important;
                        padding: 1rem !important;
                    }
                    .aboutus-text {
                        padding: 1em !important;
                    }
                }
                `}
      </style>
      <div style={{ padding: "2rem", backgroundColor: "#D5D5D5" }}>
        <h2 style={style.h2}>OUR HISTORY</h2>
        <div className="aboutus-content" style={style.aboutusContent}>
          <img src="./Rectangle 79.png" alt="Our history" style={style.img} />
          <div className="aboutus-text" style={style.textAbout}>
            <h3>HISTORY</h3>
            <span style={style.span}>
              Established in the late 1960s, our family owned business is based
              in Edinburgh and Falkirk, but services customers across the UK.
            </span>
            <p>
              Our Edinburgh branch has the longest history as an audio retailer
              in the UK. During recent renovations, receipts were found from
              Nicolson’s Gramophone Saloon dating back to 1926. In the 1950s WG
              Graham took over the shop and renamed it WG Graham’s HiFi Corner.
              Upon his retirement, Graham Tiso bought the business and
              modernized the name to HiFi Horizon.
              <br />
              <br />
              Soon thereafter a young enthusiastic Colin MacKenzie (left), who
              was recommended by Linn’s own Ivor Tiefenbrun, was employed to
              manage the shop; with a knack for business and years of experience
              in the hi-fi industry, Colin would later become the owner of HiFi
              Horizon. Today, Struan MacKenzie carries on the legacy as the
              company’s Managing Director.
            </p>
          </div>
          <div className="aboutus-text" style={style.textAbout}>
            <h3>Hear The Difference </h3>
            <span style={style.span}>
              Book a demonstration at our Edinburgh or Falkirk showrooms.
            </span>
            <p>
              Would you choose a quality car without a test drive? If you are
              familiar with the brand and have great trust in it, you might.
              However, our listening preferences are unique to the individual
              and with many of our customers new to the world of high quality
              sound and vision, we encourage everyone to come in to demonstrate
              the products they are interested in. You’ll find a relaxing and
              comfortable environment in both our Edinburgh and Falkirk premises
              where you can decide for yourself if the kit is right for you. We
              also offer home demonstrations on selected products.
              <br />
              <br />
              It's our aim to get the right product for you.
              <br />
              <br />
              Our experts are on hand to guide you through the differences
              between speakers, amplifiers and sources and provide simple
              solutions that suit your needs.
            </p>
          </div>
          <img src="./Rectangle 80.png" alt="Our team" style={style.img} />
          <img src="./Rectangle 81.png" alt="Our store" style={style.img} />
          <div className="aboutus-text" style={style.textAbout}>
            <h3>Services</h3>
            <span style={style.span}>
              Our passion for the products we sell and, for our customers’
              satisfaction simply means that we happily offer additional
              services not found on the high-street.
            </span>
            <p>
              Home Setup - We want to ensure that the equipment you’ve purchased
              from us is installed correctly and sounds perfect; and we happily
              provide this service throughout the UK.
              <br />
              <br />
              Part Exchange – To help you upgrade your system, we offer our
              part-exchange program. We can offer a set price, or sell your old
              kit on your behalf.
              <br />
              <br />
              Turntable Doctor – Our turntable experts have been trained by the
              manufacturers for initial setup, long-term maintenance, and
              upgrading your high quality turntables.
              <br />
              <br />
              Record Cleaning Service – Have some old records that need a bit of
              love? We offer Scotland’s very own professional record cleaning
              service with our bespoke Pro-Ject record cleaner.
            </p>
          </div>
          <div className="aboutus-text" style={style.textAbout}>
            <h3>Tailored For You</h3>
            <span style={style.span}>
              We look forward to customising a system to meet your needs.
            </span>
            <p>
              We don’t favour one manufacturer over another – the only thing we
              do favour is making sure our customers get the right product that
              suits their needs and listening preferences. We will ask many
              questions in order to ensure that what you buy from us is tailored
              to you and you alone.
              <br />
              <br />
              If you are looking for a product not found in our demonstration
              showrooms or our online site, don’t fret as we have access to
              hundreds of brands.
              <br />
              <br />
              One of our biggest pleasures of working in this industry is to see
              the smile on our customers’ faces when they finally hear and see
              the system of their dreams.
            </p>
          </div>
          <img src="./image 1.png" alt="Our mission" style={style.img} />
        </div>
      </div>
    </>
  );
}
