import React, { Context, useContext } from "react";
import { CustomLink } from "../custom/CustomLink";
import { CustomButton } from "@/components/custom/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { userContext, UserContext } from "@/context/user";
import { syncUser } from "@/utils/syncUser";
import { cartContext, CartContext } from "@/context/cart";
import { ActionType, updateCart } from "@/utils/cart";
import { signup } from "@/service/user";
import { ToastContext, toastContext } from "@/context/toast";
import { useRouter } from "next/navigation";
import { passwordErrorMessage, passwordRegex } from "@/utils/text-utils";

const SignUp = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const { setUser } = useContext<UserContext | null>(
    userContext,
  ) as UserContext;
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );

  const router = useRouter();

  const { handleToast } = useContext(toastContext as Context<ToastContext>);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      remember: false,
    },
    onSubmit: async (values) => {
      const { password, cpassword, remember } = values;
      if (password !== cpassword) {
        handleToast(false, "Passwords do not match");
        return;
      }
      const [error, data] = await signup(values);
      if (error) {
        handleToast(false, error, true);
        return;
      }
      const { user } = data;

      if (user) {
        if (cart.products.length > 0) {
          await updateCart({
            products: cart.products,
            cart,
            setCart,
            action: ActionType.MERGE,
          });
        }
        setUser(user);
        syncUser(user);
        localStorage.setItem("remember", remember.toString());
        router.push("/");
      }
      formik.resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required."),
      lastName: Yup.string().required("Required."),
      email: Yup.string()
        .email("Please insert a valid email.")
        .required("Required."),
      password: Yup.string()
        .required("Required.")
        .matches(passwordRegex, passwordErrorMessage),
      cpassword: Yup.string()
        .required("Required.")
        .matches(passwordRegex, passwordErrorMessage),
      remember: Yup.boolean(),
    }),
  });
  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="w-full my-4 lg:my-6 px-2 lg:px-12 flex flex-col gap-4">
        <div className="w-full flex gap-4">
          <div className="w-full relative">
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer"
              placeholder=" "
            />
            <label
              htmlFor="firstName"
              className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              first name
            </label>
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="relative w-full">
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer"
              placeholder=" "
            />
            <label
              htmlFor="lastName"
              className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              last name
            </label>
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            email
          </label>
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            password
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="error relative h-max text-left">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
            className="block py-3 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer"
            placeholder=" "
          />
          <label
            htmlFor="cpassword"
            className="peer-focus:font-medium absolute text-[#AAAAAA] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#AAAAAA] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            confirm password
          </label>
          {formik.touched.cpassword && formik.errors.cpassword && (
            <div className="error relative h-max text-left">
              {formik.errors.cpassword}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="py-3 focus:outline-none"
            onChange={formik.handleChange}
            checked={formik.values.remember}
          />
          <label htmlFor="remember" className="">
            Remember me?
          </label>
        </div>
      </div>
      <div className="w-full my-6 lg:my-10 text-center">
        Already a member?{" "}
        <CustomLink onClick={() => setActiveTab("signin")} href="">
          Login here
        </CustomLink>
        .
      </div>
      <CustomButton position="w-full py-3 mb-6" type="submit">
        sign up
      </CustomButton>
    </form>
  );
};

export default SignUp;
