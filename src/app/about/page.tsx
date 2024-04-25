import Layout from '@/components/Layout';
import React from 'react'
import Image from 'next/image';
import Mafalda from '../../assets/mafalda.jpeg';
import Background from '@/components/Background';

const About = () => {
    return (
        <Layout>
          <section className="flex flex-col flex-grow justify-center">
            <div className='flex'>
              <div className="flex-1 pl-40 flex flex-col justify-center gap-6">
                <h3 className='text-4xl'>Hey, I'm Mafalda</h3>
                <p>
                  I  have a background in scenography and props & costume design, a  course in high school I took at the first and only circus school in  Lisbon, called Chapitô.
                </p>
                <p>
                  I  have been developing skills with AutoCAD, Sketchup and VRay in academic  and personal projects, to pursue my interests in the field.
                </p>
                <p>
                  My  main interests are to imagine and create living and functional spaces  that inspire the day-to-day life of people who live or work in them. 
                </p>
              </div>
              <div className='flex-1 px-40'>
                <Image src={Mafalda} alt='mafalda' className="w-64"/>
              </div>
            </div>
          </section>
        </Layout>
      );
}

export default About