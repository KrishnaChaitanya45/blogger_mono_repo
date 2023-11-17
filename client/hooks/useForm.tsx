"use client";

import { useState } from "react";
export default function useForm(initialValues: any) {
  const [values, setValues] = useState(initialValues);

  function handleChange(e: any) {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  }
  console.log(values);
  function resetValue(name: string) {
    setValues({ ...values, [name]: "" });
  }

  return [values, handleChange, resetValue];
}
