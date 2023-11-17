"use client";
import { RegisterOrLoginContext } from "@/contexts/RegisterOrLogin";
import { useContext, FormEvent } from "react";
import CustomForm from "./CustomForm";
import {
  LOGIN_CONSTANTS,
  REGISTER_CONSTANTS,
} from "@/constants/AUTH_CONSTANTS";
export default function AuthForm() {
  function sendDataToServer() {
    //? Sending data to server using tRPC
  }
  const context = useContext(RegisterOrLoginContext);
  const submitHandler = async (e: FormEvent<HTMLFormElement>, values: any) => {
    e.preventDefault();
    if (context.registerOrLogin === "register") {
      if (!values.password || !values.name || !values.email) {
        return;
      }
    } else {
    }
  };
  return (
    <CustomForm
      initialValues={
        context.registerOrLogin === "register"
          ? REGISTER_CONSTANTS
          : LOGIN_CONSTANTS
      }
      submitHandler={submitHandler}
      type={context.registerOrLogin}
    />
  );
}
