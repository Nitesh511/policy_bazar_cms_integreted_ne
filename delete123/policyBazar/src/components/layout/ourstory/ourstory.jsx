import background from "../../../assets/Background.png";
import mission from "../../../assets/mission.png";

const Story = () => {
  return (
    <section>
      <div className="container mx-auto text-center mt-16 lg:ml-16">
        <p className="main-heading mb-3 mt-40 text-4xl lg:text-5xl font-mono">
          Bridging Nepal's <span className="text-red-500">Insurance</span> Gap : <br />
          “Digital, <span className="text-red-500">Accessible</span> & Yours”
        </p>
      </div>
      
      <div className="relative">
        <img src={background} alt="our story" className="w-full absolute" />
      </div>

      <div className="container mx-auto relative mt-24 lg:mt-96 lg:ml-16">
        <div className="text-center">
          <p className="main-heading text-3xl lg:text-5xl font-serif font-bold">
            Our <span className="text-red-500">Story</span>
          </p>
          <div className="row text-center mt-4">
            <div className="hidden lg:block lg:col-3"></div>
            <div className="col-12 col-md-10 mx-auto">
              <div>
                <p className="text-base lg:text-lg font-mono">
                  In 2023,{" "}
                  <span className="font-bold text-green-700 text-lg lg:text-2xl">
                    "Your Policybazaar Nepal"
                  </span>{" "}
                  emerged as Nepal's leading online insurance aggregator. In the
                  country, comparing and purchasing insurance policies was
                  traditionally a challenge. However, this innovative initiative
                  aimed to remove these barriers and revolutionize the insurance
                  sector. A remarkable female entrepreneur, backed by over two
                  decades of insurance experience, leads this visionary
                  endeavor.
                </p>
                <p className="text-base lg:text-lg mt-5 font-mono">
                  Our company facilitates easy insurance purchases, streamlined
                  claims processing, and overall improvements in the insurance
                  sector. With advanced technology and a distinctive operational
                  approach,{" "}
                  <span className="font-bold text-green-700 text-lg lg:text-2xl">
                    "Your Policybazaar Nepal"
                  </span>{" "}
                  is reshaping the landscape by embracing digitalization.
                  Supported by an energetic team of young entrepreneurs, our
                  foundation aspires to adapt successful global models and
                  transform Nepal's financial realm.
                </p>
                <p className="text-base lg:text-lg mt-5 font-mono">
                  In a nation with limited insurance adoption,{" "}
                  <span className="font-bold text-green-700 text-lg lg:text-2xl">
                    "Your Policybazaar Nepal"
                  </span>{" "}
                  takes a significant stride forward. This idealistic journey
                  commenced in 2019, prompted by the aftermath of the COVID-19
                  pandemic. The pandemic underscored the complexities of various
                  types of loss—financial, physical, and emotional. Although it
                  wasn't possible to entirely reverse these losses, the founders
                  united to alleviate the burden through insurance. However, the
                  conventional insurance methods were intricate and inefficient,
                  prompting the inception of{" "}
                  <span className="font-bold text-green-700 text-lg lg:text-2xl">
                    "Your Policybazaar Nepal"
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="hidden lg:block lg:col-3"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center py-12">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          {/* Mission Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-400 to-green-500 hover:scale-110 group transition duration-300 ease-in-out">
            <div className="px-6 py-4">
              <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white">
                Our Mission
              </div>
              <p className="text-gray-700 text-base lg:text-lg group-hover:text-white">
                At Your PolicyBazaar Nepal, we're on a mission to simplify
                insurance and make it accessible to everyone. By providing a
                user-friendly platform, we want to help develop Nepal's insurance
                and financial sector, ensuring that more people can protect their
                future.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-300 to-green-600 hover:scale-110 group transition duration-300 ease-in-out mt-8 lg:mt-10">
            <div className="px-6 py-4">
              <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white">
                Our Vision
              </div>
              <p className="text-gray-700 text-base lg:text-lg group-hover:text-white">
                Our vision is to create a financially secure country. We aim to
                achieve this by offering improved insurance services that reach
                every corner of the country. Through our efforts, we want to
                contribute to a stronger economy and a more resilient society.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full lg:w-1/2 px-4">
          <img src={mission} alt="Mission and Vision" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Story;
