import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout showCarousel={true}>
      <section className="flex flex-col flex-grow justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <p className="text-8xl">Invern</p>
          </div>
          <div>
            <hr />
            <p className="text-4xl">Spirit Of The North</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
