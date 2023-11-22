"use server";

import Link from "next/link";

export default async function FeaturedBlogs() {
  return (
    <section>
      <header className="flex justify-between px-4 items-center w-[80%] mx-auto">
        <h2 className="font-poppins text-xl">Featured</h2>
        <Link
          href="/featured"
          className="text-xl text-theme_pink tracking-[-0.25rem]"
        >
          {">>>"}
        </Link>
      </header>
      <article className="shadow-custom-shadow w-[80%] mx-auto h-[30vh] rounded-[6px] mt-8 flex justify-between">
        <div className="flex flex-col gap-4 ml-10 mt-10 w-[50%] ">
          <span className="text-gray-400 font-rubik flex gap-[10px]">
            BY <b className="text-white font-poppins">KRISHNA</b> IN{" "}
            <b className="text-white font-poppins">TECHNOLOGY</b>{" "}
          </span>
          <h2 className="text-white font-bold font-clash_display text-xl tracking-widest leading-6">
            How to learn multiple tech and enhance multiple tech stacks but
            still stay jobless ?{" "}
          </h2>
          <p className="text-gray-400 font-rubik ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            dolorem, sint enim molestiae omnis nemo cumque eum placeat sed
            officiis!
          </p>
        </div>
        <figure className="w-[45%] h-[100%] bg-themeGrey"></figure>
      </article>
    </section>
  );
}
