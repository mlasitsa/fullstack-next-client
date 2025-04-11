import Image from "next/image";
import Posts from "@/app/posts/page";
// main file
export default function Home() {
  return (
    <div>
      <h1>List of posts</h1>
     <Posts />
    </div>
  );
}
