"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VALIDATION_CONSTANTS } from "@/constants/AUTH_CONSTANTS";
import { Login_Type, Register_Type } from "@/types/USER";
import { RegisterOrLoginContext } from "@/contexts/RegisterOrLogin";
export default function useForm(initialValues: any): [any, any, any, any] {
  const [values, setValues] = useState(initialValues);
  const context = useContext(RegisterOrLoginContext);

  useEffect(() => {
    if (values.name === undefined) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const registerOrLogin = context.registerOrLogin;
  function handleChange(e: any, isSocial?: boolean) {
    const { name, value } = e.target;
    console.log(name, value);
    if (isSocial) {
      const previousValues = JSON.parse(JSON.stringify(values));
      previousValues.socials[name] = value;
      setValues(previousValues);
    } else {
      setValues({ ...values, [name]: value });
    }
  }
  console.log(values);
  function resetValue(name: string) {
    setValues({ ...values, [name]: "" });
  }
  function validateRegex(property: "name" | "email" | "password") {
    const regex = VALIDATION_CONSTANTS[property];
    return regex.test(values[property]);
  }
  function isValid() {
    let isValid: {
      name?: string;
      email?: string;
      error: boolean;
      password?: string;
    } = {
      error: false,
    };
    Object.keys(values).forEach((property) => {
      if (!validateRegex(property as "name" | "email" | "password")) {
        isValid =
          property === "password"
            ? {
                ...isValid,
                [property]: "Use a strong password",
                error: true,
              }
            : property === "name"
            ? registerOrLogin === "register"
              ? {
                  ...isValid,
                  [property]: "Invalid name",
                }
              : {
                  error: false,
                }
            : {
                ...isValid,
                [property]: `Invalid ${property}`,
                error: true,
              };
      }
    });
    return isValid;
  }
  console.log("VALUES INSIDE CUSTOM FORM", values);

  return [values, handleChange, resetValue, isValid];
}
