"use client";
import { RegisterOrLoginContext } from "@/contexts/RegisterOrLogin";
import { useContext } from "react";

export default function RegisterOrLoginHeading() {
  const context = useContext(RegisterOrLoginContext);
  return (
    <article className="flex flex-col gap-4 h-[100%] items-start justify-center">
      <h1 className="font-barlow font-[600] text-3xl">
        {context.registerOrLogin === "register" ? "Sign Up to" : "Sign In to"}
      </h1>
      <h2 className="font-clash_display text-4xl">
        WRITE{" "}
        <span className="font-clash_display font-[600] text-[#D517B8]">
          SHIT
        </span>
      </h2>
      <div className="mt-[10%] flex flex-col gap-2">
        <p className="text-base font-rubik font-[500]">
          {context.registerOrLogin === "register"
            ? "Already have an account ?"
            : "Don't have an account ?"}
        </p>
        <span
          className="text-[#4461F2] font-poppins font-[500] cursor-pointer"
          onClick={() => {
            context.setRegisterOrLogin((prev: "register" | "login") => {
              context.registerOrLogin === "register" ? "login" : "register";
            });
          }}
        >
          {context.registerOrLogin === "register"
            ? "Login Here 👋"
            : "Register Here  🚩"}
        </span>
      </div>
    </article>
  );
}
