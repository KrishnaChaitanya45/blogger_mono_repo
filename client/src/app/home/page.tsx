"use server";

import FeaturedBlogs from "../blog-sections/FeaturedBlogs";
import LatestBlogsSection from "../blog-sections/LatestBlogs";

export default async function Home() {
  return (
    <section>
      <FeaturedBlogs />
      <LatestBlogsSection />
    </section>
  );
}
