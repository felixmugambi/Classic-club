import FixturesSection from "../components/Fixtures/FixturesSection";
import NewsSection from "../components/New/NewsSection";
import NextMatch from "../components/nextMatch/NextMatch";

export default function Home() {
  return (
    <>
      <NewsSection />
      <NextMatch />
      <FixturesSection />
    </>
  );
}
