"use client";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { RegisterOrLoginContext } from "@/contexts/RegisterOrLogin";
export default function Navbar() {
  const [signUpOrIn, setSignUpOrIn] = useState("signUp");
  const context = useContext(RegisterOrLoginContext);
  function toggle() {
    setSignUpOrIn((prev) => (prev === "signUp" ? "signIn" : "signUp"));
    context.registerOrLogin === "register"
      ? context.setRegisterOrLogin("login")
      : context.setRegisterOrLogin("register");
  }
  console.log(context);
  return (
    <header className="flex gap-4 justify-center items-center font-abhaya_libre text-lg relative transition-all duration-200 ease-linear">
      <button onClick={toggle}>Sign Up</button>
      <motion.div
        className={`w-[40%] h-[5px] bg-[#9FAFFF] absolute -bottom-2 rounded-lg left-0 `}
        animate={{
          left: signUpOrIn === "signUp" ? "2.5%" : "57.5%",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      ></motion.div>
      <button onClick={toggle}>Sign In</button>
    </header>
  );
}
