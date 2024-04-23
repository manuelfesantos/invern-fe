import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout showCarousel={true}>
      <section className="flex flex-col flex-grow justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-8xl">Invern</h1>
          </div>
          <div>
            <hr />
            <h2 className="text-4xl">Spirit Of The North</h2>
          </div>
        </div>
      </section>
    </Layout>
  );
}
