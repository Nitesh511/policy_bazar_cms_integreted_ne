import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Our_services from "../our services/services";
import AboutUs from "../aboutus/about_us";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDashboardMutation } from "../API/proceedToApi";
import {
  setDashboardData,
  setLoading,
  setError,
  selectDashboardLoading,
  selectDashboardError,
  selectDashboard,
} from "../API/dataSlice";

const Home_third = () => {
  const dispatch = useDispatch();
  const [
    fetchDashboard,
    { data: dashboardData, isLoading, isError },
  ] = useFetchDashboardMutation();
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetchDashboard().unwrap();
        dispatch(setDashboardData(response.data));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, fetchDashboard]);

  useEffect(() => {
    const fetchdashData = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/dashboard2s?populate=*`,
          {
            headers: {
              Authorization:
                "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result && result.data) {
          setDashboard(result.data);
        }
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };
    fetchdashData();
  }, []);

  const selectDashboardData = useSelector(selectDashboard);
  const selectLoading = useSelector(selectDashboardLoading);
  const selectError = useSelector(selectDashboardError);

  if (selectLoading) return <div>Loading...</div>;
  if (selectError) return <div>Error: {selectError.message}</div>;

  if (!Array.isArray(selectDashboardData)) {
    console.error("Dashboard data is not an array:", selectDashboardData);
    return null;
  }

  return (
   
    <div className="relative px-4 lg:px-0 mt-16 lg:mt-0">
      <div className="flex flex-col lg:flex-row lg:justify-between ">
        {/* Left Carousel */}
        
        <div className="w-full lg:w-2/3">
          <Carousel className="rounded-xl custom-carousel" loop>
            {selectDashboardData.map((item, index) => (
              <div className="relative" key={index}>
                <img
                  src={`${process.env.STRAPI_API}${item.attributes.image?.data?.attributes?.url}`}
                  alt={item.attributes.title}
                  className="w-full object-cover"
                  style={{ height: "100%", objectFit: "cover" }} // Adjust for mobile view
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h1 className="text-lg md:text-2xl font-bold text-center">
                    {item.attributes.title}
                  </h1>
                  <p className="mt-2 text-sm md:text-base text-center">
                    {item.attributes.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {/* Right Carousel */}
        <div className="w-full lg:w-1/3  ">
          <div className="container mx-auto p-4 py-12 -mt-20 lg:mt-14  ">
            {dashboard.map((item, index) => (
              <div
                className="flex flex-col md:flex-row justify-between items-start gap-8 "
                key={index}
              >
                <div className="p-4 md:p-4 py-0 -mt-4 md:py-16 rounded-lg w-full ">
                  <Carousel autoplay loop arrows={false}>
                    {item.attributes.imagescraousel &&
                      item.attributes.imagescraousel.data &&
                      item.attributes.imagescraousel.data.map(
                        (carouselImage, carouselIndex) => (
                          <div className="relative" key={carouselIndex}>
                            <img
                              src={`${process.env.STRAPI_API}${carouselImage.attributes.url}`}
                              alt={`Insurance ${carouselIndex + 1}`}
                              className="w-full h-auto object-cover rounded-lg"
                              
                            />
                            <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded mt-2">
                              View plans
                            </button>
                          </div>
                        )
                      )}
                  </Carousel>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="-mt-20">
        <Our_services />
      </div>
      <div className="mt-8">
        <AboutUs />
      </div>
    </div>
  );
};

export default Home_third;
