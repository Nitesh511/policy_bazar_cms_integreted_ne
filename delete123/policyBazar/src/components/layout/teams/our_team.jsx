import React, { useState, useEffect } from "react";


const Our_team = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchOurTeam = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/ourteams?populate=*",
          {
            headers: {
              Authorization:
                " Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
            },
          }
        );
        const result = await response.json();

        if (result && result.data) {
          setTeams(result.data);
        }
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };
    fetchOurTeam();
  }, []);

  return (
    <>
      <div className="flex justify-center mb-5 mt-20">
        <div className="w-full max-w-7xl px-3 mb-6 mx-auto">
          <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-dashed border-stone-200 bg-white m-5">
            <div className="flex-auto block py-8 px-9">
              <div>
                <div className="mb-9 text-center">
                  <h1 className="mb-2 text-[1.75rem] font-semibold text-dark">
                    Our Executive Team
                  </h1>
                  <span className="text-[1.15rem] font-medium text-muted">
                    Meet our talented team, a dynamic group of experts driven by
                    passion and innovation.
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((item, index) => (
                    <div
                      className="flex flex-col text-center mb-11 cursor-pointer"
                      key={index}
                    >
                      <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                        <img
                          className="inline-block shrink-0 rounded-[.95rem] w-[350px] h-[350px] hover:scale-110 hover:shadow-lg hover:shadow-gray-700 transition duration-500"
                          src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="text-center">
                        <a
                          href="#"
                          className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out"
                        >
                          {item.attributes.name}
                        </a>
                        <span className="block font-medium text-muted">
                          {item.attributes.position}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Riva Dashboard
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loopple Builder
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Our_team;
