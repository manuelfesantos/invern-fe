import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";
import About1 from "../../assets/about1.jpeg";
import About2 from "../../assets/about2.jpeg";

const About = () => {
  return (
    <Layout>
      <section className="flex flex-col flex-grow justify-center">
        <div className="flex">
          <div className="flex-1 px-12 lg:px-40 flex flex-col justify-center gap-6 mt-12">
            <div className="flex flex-col items-center">
              <h2>{"Hey! I'm Mafalda,"}</h2>
              <h3 className="hidden lg:block">
                And Welcome To My Creative Space.
              </h3>
              <h4 className="lg:hidden">And Welcome To My Creative Space.</h4>
            </div>
            <hr />
            <Image
              src={About1}
              alt=""
              className="w-full h-24 lg:h-48 object-cover"
            />
            <div className="flex w-full items-center">
              <h3 className="hidden lg:block">
                {
                  "I'm so excited to be starting my online business as a ceramics artist!"
                }
              </h3>
              <h4 className="lg:hidden">
                {
                  "I'm so excited to be starting my online business as a ceramics artist!"
                }
              </h4>
            </div>
            <p>
              {`I've always been drawn to the mysterious and eerie beauty of Nordic landscapes,
                    and I love incorporating those elements into my work. The dark colors and shadows add an extra layer of depth and intrigue to each piece.`}
            </p>
            <p>
              {`As a child, I was always fascinated by the textures and shapes of broken objects, and that's something I try to capture in my ceramics. The subtle 
                    imperfections and worn edges give each piece a unique character, don't you think? And speaking of character, I adore adding old traces and patina to my 
                    work – it gives it a sense of history and story.`}
            </p>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h4>
                  In fact, my background in scenography and interior design has
                  been incredibly influential on my ceramics.
                </h4>
                <Image
                  src={About2}
                  alt=""
                  className="lg:hidden w-full h-[420px] object-cover"
                />
                <br />
                <p>
                  {`I love thinking about the spaces where people will display or use these pieces – how they'll be lit, what colors will surround them, and how they'll interact with the other objects in the room. It's
                        all about creating a sense of atmosphere and mood.`}
                </p>
                <br />
                <p>
                  {`As I venture into the architecture world, I'm excited to bring my visual sensibilities and passion for texture and form to bear on larger-scale 
                        projects. Who knows – maybe one day I'll design a building that incorporates some of those same broken, worn textures into its walls or furniture!`}
                </p>
                <br />
                <h4>
                  {
                    "For now, though, it's all about building my online presence as a ceramics artist."
                  }
                </h4>
                <br />
                <h3>Wish me luck!</h3>
                <br />
                <p>
                  What do you think about my work? Would love to hear your
                  feedback and see what resonates with you.
                </p>
              </div>
              <Image
                src={About2}
                alt=""
                className="hidden lg:block w-[40%] h-[560px]  object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
