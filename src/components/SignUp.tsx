import React, { Context, useContext } from "react";
import { CustomButton, CustomLink } from "./CustomComponents";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { userContext, UserContext } from "@/context/user";
import { syncUser } from "@/utils/syncUser";
import { cartContext, CartContext } from "@/context/cart";
import { mergeCart } from "@/utils/mergeCart";
import { Cart } from "@/types/store/cart";
import { syncCart } from "@/utils/syncCart";

const SignUp = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const { user, setUser } = useContext<UserContext | null>(
    userContext,
  ) as UserContext;
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit: async (values) => {
      const response = await fetch(
        "https://preview.invern-be.pages.dev/users",
        {
          method: "POST",
          headers: {
            action: "signup",
            "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
            "CF-Access-Client-Secret":
              "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
          },
          body: JSON.stringify({
            ...values,
          }),
        },
      );
      if (response.status === 201) {
        const userResponse = (await response.json()).data;
        if (cart.items.length > 0) {
          const cartMerged = await mergeCart(userResponse.cart.cartId, cart);
          if (cartMerged) {
            userResponse.cart.products = cart.items;
            const newCart: Cart = {
              ...cart,
              id: userResponse.cart.cartId,
            };
            setCart(newCart);
            syncCart(newCart);
          }
        }
        setUser(userResponse);
        syncUser(userResponse);
        formik.resetForm();
        location.replace("/");
      } else {
        const json = await response.json();
        console.log(json.error.message);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required."),
      lastName: Yup.string().required("Required."),
      email: Yup.string()
        .email("Please insert a valid email.")
        .required("Required."),
      password: Yup.string().required("Required."),
      cpassword: Yup.string().required("Required."),
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
            <div className="error">{formik.errors.password}</div>
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
            <div className="error">{formik.errors.cpassword}</div>
          )}
        </div>
      </div>
      <div className="w-full my-6 lg:my-10 text-center">
        Already a member?{" "}
        <CustomLink onClick={() => setActiveTab("signin")} href="">
          Login here
        </CustomLink>
        .
      </div>
      <CustomButton position="w-full py-3" type="submit">
        sign up
      </CustomButton>
    </form>
  );
};

export default SignUp;
