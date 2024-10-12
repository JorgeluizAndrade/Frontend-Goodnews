import BibleX from "@/components/BibleX";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Posts } from "@/components/Posts";
import "@/app/globals.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Posts />
      <BibleX />
    </div>
  );
}
