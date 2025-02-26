import React from "react";
import "./About.css";
import NavBar from '../../components/nav-bar/NavBar';
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <main>
      <NavBar />
      <section id="features" className="space-y-20 py-8 mx-auto md:py-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-10 text-center">
          <h2 className="text-2xl tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl">
            About NSS UNIT 325 (KMCT)
          </h2>
          <p className="max-w-[85%] text-lg">The National Service Scheme (NSS) at KMCT Arts and Science College is a part of the nationwide NSS program initiated by the Government of India. The NSS aims to promote a sense of social responsibility and leadership among students by engaging them in community service and development activities. At KMCT Arts and Science College, the NSS unit typically undertakes a variety of activities that contribute to social welfare and personal development.</p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border-2 bg-background p-2">
            <div className="flex flex-col gap-3 rounded-md p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Develop social and civic responsibility.</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border-2 bg-background p-2">
            <div className="flex flex-col gap-3 rounded-md p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Understand the community.</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border-2 bg-background p-2">
            <div className="flex flex-col gap-3 rounded-md p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Identify community needs.</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border-2 bg-background p-2">
            <div className="flex flex-col gap-3 rounded-md p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Practice national integration.</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border-2 bg-background p-2">
            <div className="flex flex-col gap-3 rounded-md p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h3 className="font-medium text-lg">Develop leadership qualities.</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
