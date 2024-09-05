import { Hero } from "@/components/Hero";
import MyTimeline from "@/components/MyTimeline";
import Navbar from "@/components/Navbar";
import { Posts } from "@/components/Posts";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Posts />
      <MyTimeline />
    </div>
  );
}
