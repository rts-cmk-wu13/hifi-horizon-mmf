import CardHome from "../components/CardHome";
import HomeHero from "../components/HomeHero";
import HomeInfo from "../components/HomeInfo";
import HomeNewsletter from "../components/HomeNewsletter";

export default function Home() {

  return (
    <>
      <HomeHero />

      <CardHome />
      <HomeInfo />
      <HomeNewsletter />
    </>
  );
}
