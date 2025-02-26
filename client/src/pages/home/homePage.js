import "./home.css";
import NavBar from '../../components/nav-bar/NavBar';
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <main>
      <NavBar />
      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
            <div className="">
              <h1 className="mb-3 pb-4 text-4xl font-extrabold md:text-6xl">Welcome to NSS UNIT 325 – KMCT</h1>
              <h1 className="mb-3 pb-4 text-4xl font-bold text-blue-700 md:text-4xl">"Not Me, But You"</h1>
              <p className="mb-6 max-w-[528px] text-xl md:mb-10">Join us in shaping a better society while developing leadership & teamwork!</p>
              <div className="flex items-center">
                <a href="/login"
                  className="mr-5 text-white inline-block rounded-full bg-blue-600 px-6 py-3 text-center font-bold hover:bg-blue-500 md:mr-6 lg:mr-8">
                  Join NSS Today!
                </a>
              </div>
            </div>
            <div>
              <img src="https://www.kmctartskuttippuram.org/images/student-subcat/imageimageb13fe39cb1dd9ba9678a02c0b1c43fe6fbf8f667.jpg" alt="" className="mx-auto inline-block h-full w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div id="about" className="relative bg-white flex pb-20">
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="ps-28 relative z-10 bg-white">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h2 className="my-6 text-2xl tracking-tight font-bold text-gray-900 sm:text-3xl md:text-5xl">
                    About Us
                  </h2>

                  <p className="text-lg">
                    National service scheme (NSS) is a central sector scheme of the Government of India, Ministry of youth affairs & sports. It produces opportunity to the student youth to take part in various government led community services and program. With this organization the students are able to build their character, maintain discipline, create leadership and become a person who understand human nature.
                  </p>
                </div>
              </main>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col space-y-5 justify-end px-10">
            <div className="flex gap-2 items-center font-medium text-lg">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              Established by the Govt. of India – Under the Ministry of Youth Affairs & Sports
            </div>
            <div className="flex gap-2 items-center font-medium text-lg">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              Character & Leadership Building – Empowering students through service
            </div>
            <div className="flex gap-2 items-center font-medium text-lg">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                <svg className="w-10 h-10 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              Social Responsibility – Contributing to the betterment of society
            </div>
          </div>
        </div>
      </section>

      <h1 className="text-center text-xl font-bold text-blue-600">"Not Me, But You" – Reflecting selfless service & democratic living.</h1>
    <section className="max-w-screen-xl mx-auto py-20">
      
      <h1 className="text-center text-4xl font-bold py-5">Latest Activities</h1>
      
      <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
        <div className=" break-inside-avoid mb-8">
          <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image1c84151281392e0a80ff3c2d90188f77b694ec199.jpeg" alt="Gallery image" />
        </div>
        <div className=" break-inside-avoid  mb-8">
          <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image173f0a81dba6285578283947427577eb71dc0cd4f.jpeg" alt="Gallery image" />
        </div>
        <div className=" break-inside-avoid  mb-8">
          <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image11f6bdad53eaa396a4b6890d19054133756d04554.jpeg" alt="Gallery image" />
        </div>
        <div className=" break-inside-avoid  mb-8">
          {/* <img className="h-auto max-w-full rounded-lg" src="" alt="Gallery image" /> */}
        </div>
        <div className=" break-inside-avoid  mb-8">
          <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image1e59f24c8d7ac90d4152c0d05ea824d664f11acb5.jpg" alt="Gallery image" />
        </div>
        <div className=" break-inside-avoid  mb-8">
          <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image194421c8158c90914a4d887f6b61249c904128f25.jpg" alt="Gallery image" />
        </div>
      </div>
    </section>

     <Footer />
    </main>
  );
};

export default HomePage;
