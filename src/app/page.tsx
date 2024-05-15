import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout showCarousel={true}>
      <section className="flex flex-col flex-grow justify-center items-center select-none">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1>Invern</h1>
          </div>
          <div>
            <hr />
            <h3>Spirit Of The North</h3>
          </div>
        </div>
      </section>
    </Layout>
  );
}
