import React, { Context, useContext } from "react";
import Link from "next/link";
import { CustomLink } from "../custom/CustomLink";
import { CustomButton } from "@/components/custom/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { UserContext, userContext } from "@/context/user";
import { syncUser } from "@/utils/syncUser";
import { cartContext, CartContext } from "@/context/cart";
import { login } from "@/service/user";
import { changeCartFunction } from "@/utils/cart/change-cart-function";
import { ActionType, updateCart } from "@/utils/cart";
import { ToastContext, toastContext } from "@/context/toast";
import { useRouter } from "next/navigation";
import { passwordRegex } from "@/utils/text-utils";
const SignIn = ({
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

  const { handleToast } = useContext(toastContext as Context<ToastContext>);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: async (values) => {
      const [error, data] = await login(values);

      if (error) {
        handleToast(false, error, true);
        return;
      }

      const { user } = data;

      if (user) {
        const changeCart = changeCartFunction(setCart);
        if (user.cart.products.length > 0) {
          changeCart(user.cart);
        } else if (cart.products.length > 0) {
          const [error] = await updateCart({
            products: cart.products,
            action: ActionType.MERGE,
            setCart,
            cart,
          });
          if (error) {
            handleToast(false, error, true);
            return;
          }
        }
        setUser(user);
        syncUser(user);
        localStorage.setItem("remember", values.remember.toString());
        router.push("/");
      }
      formik.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please insert a valid email.")
        .required("Required."),
      password: Yup.string()
        .required("Required.")
        .matches(passwordRegex, "Please insert a valid password."),
      remember: Yup.boolean(),
    }),
  });

  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="w-full my-6 lg:my-8 px-6 lg:px-12 flex flex-col gap-4">
          <div className="relative">
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
          <div className="relative h-[max-content]">
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
        </div>
        <div className="relative w-full lg:px-6 flex justify-between">
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
          <CustomLink position="text-sm lg:text-base" href="">
            Forgot your password?
          </CustomLink>
        </div>
        <div className="w-full my-4 lg:my-8 flex justify-center gap-10">
          <Link href="" className="icon-scale">
            <FontAwesomeIcon icon={faGoogle} />
          </Link>
          <Link href="" className="icon-scale">
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link href="" className="icon-scale">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </div>
        <CustomButton position="w-full py-3" type="submit">
          sign in
        </CustomButton>
        <div className="relative w-full my-4 lg:my-6 flex flex-col items-center justify-center">
          <div>Not a member?</div>
          <div>
            <CustomLink
              position=""
              onClick={() => setActiveTab("signup")}
              href=""
            >
              Create an account here
            </CustomLink>
            .
          </div>
        </div>
      </form>
    </>
  );
};

export default SignIn;
