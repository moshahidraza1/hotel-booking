import Image from "next/image";
import Header from "./components/Header";
import FeaturedStays from "./components/FeaturedStays";
import Experience from "./components/Experience";

export default function Home() {
  return (
    <>
    <Header/>
    <FeaturedStays/>
    <Experience/>
    </>
  );
}
