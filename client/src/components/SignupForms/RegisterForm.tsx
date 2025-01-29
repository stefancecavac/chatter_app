import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { UseAuthContext } from "../../context/AuthContext";
import React, { Dispatch, SetStateAction } from "react";
import { RegisterData, registerSchema } from "../../util/Types";
import { ErrorComponent } from "../ErrorComponent";

type registerFormProps = {
  setToggleForm: Dispatch<SetStateAction<boolean>>;
};

export const RegisterForm: React.FC<registerFormProps> = ({ setToggleForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });
  const { registerUser, registerError, registerPending } = UseAuthContext();

  const submitForm = (data: RegisterData) => {
    registerUser(data);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-base-content text-4xl font-medium">Create your account</h2>
        <p className="text-info-content text-sm">Create your account to get started</p>
      </div>

      <form onSubmit={handleSubmit(submitForm)} autoComplete="off" className="flex flex-col mt-16 gap-4">
        <label className="text-xs font-medium text-base-content flex flex-col gap-1">
          Name:
          <input
            {...register("name")}
            placeholder="Enter your Name"
            className="input-primary p-2 rounded bg-base-300 placeholder:text-info-content"
            autoComplete="off"
            type="search"
          ></input>
          <ErrorComponent errorMessage={errors?.name?.message}></ErrorComponent>
        </label>
        <label className="text-xs font-medium  text-base-content flex flex-col gap-1">
          Last name:
          <input
            {...register("lastName")}
            placeholder="Enter your Last name"
            className="input-primary p-2 rounded  bg-base-300 placeholder:text-info-content"
            autoComplete="off"
            type="search"
          ></input>
          <ErrorComponent errorMessage={errors?.lastName?.message}></ErrorComponent>
        </label>
        <label className="text-xs font-medium  text-base-content flex flex-col gap-1">
          Email:
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input-primary p-2 rounded  bg-base-300 placeholder:text-info-content"
            autoComplete="off"
            type="search"
          ></input>
          <ErrorComponent errorMessage={errors?.email?.message || registerError?.message}></ErrorComponent>
        </label>
        <label className="text-xs  font-medium text-base-content flex flex-col gap-1">
          password:
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="input-primary p-2 rounded  bg-base-300 placeholder:text-info-content"
          ></input>
          <ErrorComponent errorMessage={errors?.password?.message}></ErrorComponent>
        </label>

        <button type="submit" disabled={registerPending} className={`btn mt-5 btn-primary text-neutral-100 `}>
          {registerPending ? "Registering ... " : "Sign Up"}
        </button>

        <div className="relative  border-t-2 border-info-content  my-5 flex items-center justify-center ">
          <p className="-top-3 absolute bg-base-100 px-1  text-info-content">Or</p>
        </div>

        <button onClick={() => setToggleForm(false)} type="button" className="btn btn-primary btn-outline btn-sm  ">
          Log in
        </button>
      </form>
    </div>
  );
};
