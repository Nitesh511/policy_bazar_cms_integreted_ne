import React, { useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import Our_services from "../our services/services";
import AboutUs from "../aboutus/about_us";
import { useDispatch, useSelector } from "react-redux";
import {useFetchDashboardMutation} from "../API/proceedToApi"

import {
  setDashboardData,
  setLoading,
  setError,
  selectDashboardLoading,
  selectDashboardError,
  selectDashboard,
} from "../API/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [fetchDashboard, { data: dashboardData, isLoading, isError }] = useFetchDashboardMutation();

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
    <div className="relative">
      <div className="z-10 relative">
        <Carousel className="rounded-xl custom-carousel" loop autoplay>
          {selectDashboardData.map((item, index) => (
            <div className="relative" key={index}>
              <img
                src={`http://localhost:1337${item.attributes.image?.data?.attributes?.url}`}
                alt={item.attributes.title}
                className="w-full object-cover"
                style={{ height: "calc(120vh - 100px)" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-white p-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                  {item.attributes.title}
                </h1>
                <p className="mt-2 text-base md:text-lg text-center">
                  {item.attributes.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div data-aos="flip-left" >
      <Our_services />

      </div>
      <div data-aos="slide-right">
      <AboutUs />
      </div>
    </div>
  );
};

export default Home;
