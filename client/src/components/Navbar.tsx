"use server";
import Link from "next/link";
import {} from "react-icons";
import { FaSearch } from "react-icons/fa";
import UserProfileButton from "./UserProfileButton";
export default async function Navbar() {
  return (
    <nav className="min-w-full flex items-center justify-between px-[10%] py-8 text-gray-300 font-inter">
      <ul className="flex justify-between w-[50%] items-center transition-all duration-200 ease-linear">
        <Link href="/home" className="text-5xl mt-[-2.5%]">
          ✍️
        </Link>
        <li className="hover:text-white hover:scale-[1.05] hover:bg-theme_light_pink py-2 px-4  rounded-xl cursor-pointer">
          Popular
        </li>
        <li className="hover:text-white hover:scale-[1.05] hover:bg-theme_light_pink py-2 px-4  rounded-xl cursor-pointer">
          New
        </li>
        <li className="hover:text-white hover:scale-[1.05] hover:bg-theme_light_pink py-2 px-4  rounded-xl cursor-pointer">
          Tech
        </li>
        <li className="hover:text-white hover:scale-[1.05] hover:bg-theme_light_pink py-2 px-4  rounded-xl cursor-pointer">
          Topics
        </li>
        <li className="hover:text-white hover:scale-[1.15] hover:rotate-12 py-2 px-4  rounded-xl cursor-pointer text-2xl">
          ✏️
        </li>
      </ul>
      <ul className="flex justify-center items-center gap-8">
        <li>
          <button>
            <FaSearch className="text-2xl text-white" />
          </button>
        </li>
        <li>
          <UserProfileButton />
        </li>
      </ul>
    </nav>
  );
}
