import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { UseAuthContext } from "../../context/AuthContext";
import { LoginData, loginSchema } from "../../util/Types";
import { ErrorComponent } from "../ErrorComponent";

type loginFormProps = {
  setToggleForm: Dispatch<SetStateAction<boolean>>;
};

export const LoginForm: React.FC<loginFormProps> = ({ setToggleForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const { loginUser, loginError, loginPending } = UseAuthContext();

  const submitForm = (data: LoginData) => {
    loginUser(data);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-base-content text-4xl font-medium">Welcome back!</h2>
        <p className="text-info-content text-sm">Log in to your account</p>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col mt-16 gap-4">
        <label className="text-xs font-medium  text-base-content flex flex-col gap-1">
          Email:
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input-primary p-2 rounded bg- bg-base-300 placeholder:text-info-content "
            autoComplete="off"
          ></input>
          <ErrorComponent errorMessage={errors?.email?.message || loginError?.message}></ErrorComponent>
        </label>
        <label className="text-xs  font-medium text-base-content flex flex-col gap-1">
          password:
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="input-primary p-2 rounded bg- bg-base-300 placeholder:text-info-content"
          ></input>
          <ErrorComponent errorMessage={errors?.email?.message || loginError?.message}></ErrorComponent>
        </label>

        <button disabled={loginPending} type="submit" className="btn mt-5 btn-primary text-base-100  ">
          {loginPending ? "Loging In ... " : "Log In"}
        </button>
        <div className="divider  text-info-content">Or</div>

        <button onClick={() => setToggleForm(true)} type="button" className="btn btn-primary btn-outline btn-sm  ">
          Signup
        </button>
      </form>
    </div>
  );
};
