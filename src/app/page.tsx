import {CustomButton, CustomLinkButton} from "@/components/CustomComponents";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout showCarousel={true}>
      <section className="flex flex-col flex-grow lg:justify-center items-center select-none">
        <div className="hidden lg:flex flex-col justify-center gap-2">
          <div className="flex gap-2 ">
            <h1>Invern</h1>
            <div className="flex flex-col justify-center mt-4">
              <h5>Spirit</h5>
              <h5>Of The North</h5>
            </div>
          </div>
          <div>
            <hr />
            <h3>Each Piece, Uniquely Yours.</h3>
          </div>
          <div>
            <CustomLinkButton type="button" position="h-10 w-60" href={"/shop/products"}>Explore Our Collection</CustomLinkButton>
          </div>
        </div>
        <div className="flex lg:hidden flex-col mt-12 gap-2 w-full px-12">
          <div className="flex flex-col items-center w-full">
            <h1>Invern</h1>
            <div className="w-full flex flex-col items-center">
              <div className="w-full">
                <hr />
              </div>
              <h4>Spirit Of The North</h4>
            </div>
          </div>
          <div className="mt-10">
            <h3>Each Piece,</h3>
            <h3>Uniquely Yours.</h3>
          </div>
          <div>
            <CustomButton type="button" position="h-10 w-44">Explore Our Collection</CustomButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}
