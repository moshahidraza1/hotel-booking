import Image from "next/image";
import Header from "./components/Header";
import FeaturedStays from "./components/FeaturedStays";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
    <Header/>
    <FeaturedStays/>
    <Experience/>
    <Testimonials/>
    <FAQ/>
    </>
  );
}
