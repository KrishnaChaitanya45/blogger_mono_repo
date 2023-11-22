"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import Link from "next/link";
export default function UserProfileButton() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log("AUTH", auth);
  return (
    <Link href={`/${auth?.user?.name}`}>
      <div
        className="w-[3vw] h-[3vw] rounded-[50%] bg-[image:var(--image-url)] bg-cover bg-no-repeat hover:shadow-theme_pink shadow-2xl hover:scale-[1.05]"
        //@ts-ignore
        style={{ "--image-url": `url(${auth?.user?.profilePhoto})` }}
      ></div>
    </Link>
  );
}
