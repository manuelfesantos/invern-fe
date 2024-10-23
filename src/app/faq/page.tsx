import React from "react";
import Layout from "@/components/global/Layout";
import { faq } from "@/utils/faq";
import Link from "next/link";

const Faq = () => {
  return (
    <Layout>
      <section className="flex flex-col lg:flex-row lg:h-screen w-full lg:overflow-hidden">
        <div className="flex flex-col lg:h-[75vh] w-full lg:w-[25vw] lg:m-6 lg:py-6 px-8 lg:pl-6 lg:pr-16 lg:border-r lg:border-white">
          <div className="hidden lg:block w-full">
            <h3>FAQ</h3>
            <div className="py-4">
              <hr />
            </div>
          </div>
          <div className="lg:hidden w-full flex justify-center my-4">
            <h2>FAQ</h2>
          </div>
          <div className="flex flex-col pl-8 lg:pl-6">
            <ul className="list-disc">
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#products">Products</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#orders">Orders</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#payment">Payment</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#shipping">Shipping</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#returns">Returns</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#terms">Terms & Conditions</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#privacy">Privacy Policy</Link>
                </h5>
              </li>
              <li className="hover:underline text-base">
                <h5>
                  <Link href="#cookies">Cookies Policy</Link>
                </h5>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col px-8 lg:px-12 pt-6 lg:overflow-y-auto lg:scroll-smooth">
          {faq.map((item, index) => (
            <div id={item.id} key={index} className="mb-6 lg:mb-12">
              <h2>{item.title}</h2>
              <div className="py-4">
                <hr />
              </div>
              {item.questions !== undefined ? (
                item.questions.map((question, index) => (
                  <div key={index} className="mb-4 lg:mb-6">
                    <p className="mb-2 pl-2 lg:px-6">{question.question}</p>
                    <p className="pl-4 lg:px-10 text-[#b1ab9a]">
                      {question.answer}
                    </p>
                  </div>
                ))
              ) : (
                <p className="pl-2 lg:px-6">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
