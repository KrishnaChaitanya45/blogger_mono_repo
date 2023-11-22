import InputElement from "@/components/InputElement";
import useForm from "../hooks/useForm";
import { FormEvent, useRef } from "react";
import { Login_Type, Register_Type, USER_TYPE } from "@/types/USER";

import { useRouter } from "next/navigation";
type PropsType = {
  initialValues: Register_Type | Login_Type;
  type?: "register" | "login";
  submitHandler: (
    e: FormEvent<HTMLFormElement>,
    values: Register_Type | Login_Type
  ) => Promise<{
    data?: {
      user: USER_TYPE;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    } | null;
    error?: boolean;
    message?: string;
    type?: "register" | "login";
  }>;
};
export default function CustomForm({
  initialValues,
  type,
  submitHandler,
}: PropsType) {
  console.log(Object.keys(initialValues));
  const [values, handleChange, resetValue, isValid] = useForm(initialValues);
  const errorRef = useRef<any>();
  const router = useRouter();

  return (
    <form
      className="flex flex-col items-center justify-center gap-6 absolute top-[50%] -translate-y-[30%] -translate-x-[-50%] right-[50%] "
      onSubmit={async (e) => {
        e.preventDefault();
        if (!isValid(Object.keys(values)).error) {
          const data = await submitHandler(e, values);
          console.log("DATA", data);
          if (!data.error) {
            errorRef.current.style.display = "block";
            errorRef.current.innerText =
              data.type === "register"
                ? "Registered Successfully 🚀"
                : "Login Successful 🚀";
            errorRef.current.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
              errorRef.current.style.display = "none";
              router.push("/home");
            }, 3000);
          } else {
            errorRef.current.style.display = "block";
            errorRef.current.innerText =
              data.message || "Authentication Failed 😥";
            errorRef.current.style.backgroundColor = "#F44336";
            setTimeout(() => {
              errorRef.current.style.display = "none";
            }, 3000);
          }
        } else {
          errorRef.current.style.display = "block";
          console.log("REACHED TO THE ERROR HANDLER");
          if (
            values.password.length < 1 ||
            (type === "register" && values.name.length < 1) ||
            values.email.length < 1
          ) {
            errorRef.current.innerText = "Please fill all the fields";
            setTimeout(() => {
              errorRef.current.style.display = "none";
            }, 3000);
            return;
          }
          errorRef.current.innerText =
            type === "register"
              ? isValid(Object.keys(values)).name ||
                isValid(Object.keys(values)).email ||
                isValid(Object.keys(values)).password
              : isValid(Object.keys(values)).email ||
                isValid(Object.keys(values)).password;
          setTimeout(() => {
            errorRef.current.style.display = "none";
          }, 3000);
        }
      }}
    >
      <p
        className="bg-theme_pink/70 w-[100%] text-center text-sm py-2 rounded-xl font-poppins hidden"
        ref={errorRef}
      ></p>
      {Object.keys(initialValues).map((keyName, i) => (
        <InputElement
          uniqueKey={i}
          name={keyName}
          isText={keyName !== "password"}
          isPassword={keyName === "password"}
          value={values[keyName]}
          resetValue={resetValue}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className=" @apply shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)] bg-[#4461F2] w-[100%] py-2 rounded-xl font-abhaya_libre text-lg tracking-wide"
      >
        {" "}
        {type === "register"
          ? "Register 🚀"
          : type === "login"
          ? "Login 🔥"
          : "Submit"}{" "}
      </button>
    </form>
  );
}
