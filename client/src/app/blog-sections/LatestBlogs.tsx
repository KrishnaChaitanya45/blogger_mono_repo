"use server";

import Link from "next/link";

export default async function FeaturedBlogsSection() {
  return (
    <div className="flex w-[85%] h-[70vh] justify-center mx-auto items-start mt-8">
      <article className="h-[100%] w-[55%] bg-gray-500 rounded-xl flex items-start justify-start px-[5%] py-[5%]">
        <summary className="flex flex-col gap-4">
          <span className="font-barlow ">BY KRISHNA IN TECHNOLOGY </span>
          <b className="text-3xl font-rubik">Why is React a thing ? </b>
          <p className="text-lg font-barlow">
            React is a javascript library which is very efficient when it comes
            to the dom manipulation and the credit for that goes to the Virtual
            DOM that is being used in the React DOM which renders the total dom
            again when state changes
          </p>
        </summary>
      </article>
      <div className="flex flex-col items-center justify-center h-[100%] w-[40%]">
        <header className="flex justify-between px-4 items-center w-[90%]">
          <h2 className="font-poppins text-xl">Latest Blogs</h2>
          <Link
            href="/latest-blogs"
            className="text-xl text-theme_pink tracking-[-0.25rem]"
          >
            {">>>"}
          </Link>
        </header>
        <hr className="bg-gray-400  w-[90%] my-4" />
        <ul className="flex flex-col h-[100%] justify-around ">
          <li className="flex flex-col items-start gap-2 cursor-pointer">
            <p className="text-gray-400 text-sm"> BY KRISHNA - TECHNOLOGY</p>
            <b className="font-poppins hover:text-theme_pink">
              Some Blog Heading is here and i want to display it
            </b>
          </li>
          <li className="flex flex-col items-start gap-2 cursor-pointer">
            <p className="text-gray-400 text-sm"> NOV 20 - 2023</p>
            <b className="font-poppins hover:text-theme_pink">
              Some Blog Heading is here and i want to display it
            </b>
          </li>
          <li className="flex flex-col items-start gap-2 cursor-pointer">
            <p className="text-gray-400 text-sm"> NOV 20 - 2023</p>
            <b className="font-poppins hover:text-theme_pink">
              Some Blog Heading is here and i want to display it
            </b>
          </li>
          <li className="flex flex-col items-start gap-2 cursor-pointer">
            <p className="text-gray-400 text-sm"> NOV 20 - 2023</p>
            <b className="font-poppins hover:text-theme_pink">
              Some Blog Heading is here and i want to display it
            </b>
          </li>
        </ul>
      </div>
    </div>
  );
}
