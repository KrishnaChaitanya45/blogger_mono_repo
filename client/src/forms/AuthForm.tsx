"use client";
import { RegisterOrLoginContext } from "@/contexts/RegisterOrLogin";
import { useContext, FormEvent, useRef } from "react";
import CustomForm from "./CustomForm";
import {
  LOGIN_CONSTANTS,
  REGISTER_CONSTANTS,
} from "@/constants/AUTH_CONSTANTS";
import { tRPC } from "../../trpc";
import { AuthContext } from "@/contexts/AuthContext";
import NotificationGenerator from "@/components/ToastMessage";
export default function AuthForm() {
  const context = useContext(RegisterOrLoginContext);
  const RegisterMutation = tRPC.create.useMutation();
  const LoginMutation = tRPC.login.useMutation();
  const authContext = useContext(AuthContext);
  const submitHandler = async (e: FormEvent<HTMLFormElement>, values: any) => {
    e.preventDefault();
    console.log("REACHED HERE", values);
    try {
      if (context.registerOrLogin === "register") {
        console.log("REACHED HERE");
        RegisterMutation.mutate(values);
        const { data } = RegisterMutation;
        console.log("=== REGISTER DATA ===", data);

        authContext?.setAuth({
          user: data?.user,
          accessToken: data?.tokens.accessToken,
        });
        return {
          data: data,
          error: false,
          type: context.registerOrLogin,
        };
      } else {
        try {
          LoginMutation.mutate(values);
          const { data, error, isSuccess } = LoginMutation;
          console.log("=== LOGIN DATA ===", data, error, isSuccess);
          if (!data?.data || (error && !isSuccess)) {
            throw new Error("Authentication Failed, Please try again");
          }
          //@ts-ignore
          authContext?.setAuth({
            user: data?.data?.user,
            accessToken: data?.data?.tokens.accessToken,
          });
          return {
            data: data?.data,
            error: !data?.success,
            message: "Login Failed..! Please try again",
            type: context.registerOrLogin,
          };
        } catch (error) {
          console.log("ERROR", error);

          return { error: true };
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      return { error: true };
    }
  };
  return (
    <>
      <CustomForm
        initialValues={
          context.registerOrLogin === "register"
            ? REGISTER_CONSTANTS
            : LOGIN_CONSTANTS
        }
        submitHandler={submitHandler}
        type={context.registerOrLogin}
      />
    </>
  );
}
