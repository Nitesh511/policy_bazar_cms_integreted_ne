import React from 'react';

const Our_team = () => {
  return (
    <>
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-6xl px-3 mb-6 mx-auto">
          <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-dashed border-stone-200 bg-white m-5">
            <div className="flex-auto block py-8 px-9">
              <div>
                <div className="mb-9 text-center">
                  <h1 className="mb-2 text-[1.75rem] font-semibold text-dark">Our Executive Team</h1>
                  <span className="text-[1.15rem] font-medium text-muted"> Meet our talented team, a dynamic group of experts driven by passion and innovation. </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col text-center mb-11">
                    <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                      <img className="inline-block shrink-0 rounded-[.95rem] w-[350px] h-[350px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar11.jpg" alt="avatar"/>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">Samantha Reynolds</a>
                      <span className="block font-medium text-muted">Marketing Manager</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-center mb-11">
                    <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                      <img className="inline-block shrink-0 rounded-[.95rem]  w-[350px] h-[350px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar2.jpg" alt="avatar"/>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">Benjamin Martinez</a>
                      <span className="block font-medium text-muted">Sales Executive</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-center mb-11">
                    <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                      <img className="inline-block shrink-0 rounded-[.95rem]  w-[350px] h-[350px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar5.jpg" alt="avatar"/>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">Emily Turner</a>
                      <span className="block font-medium text-muted">Customer Support</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-center mb-11">
                    <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                      <img className="inline-block shrink-0 rounded-[.95rem]  w-[350px] h-[350px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar24.jpg" alt="avatar"/>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">Jason Anderson</a>
                      <span className="block font-medium text-muted">Development Engineer</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-center mb-11">
                    <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                      <img className="inline-block shrink-0 rounded-[.95rem]  w-[350px] h-[350px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar23.jpg" alt="avatar"/>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">Olivia Carter</a>
                      <span className="block font-medium text-muted">Creative Director</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1"> Tailwind CSS Component from <a href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">Riva Dashboard</a> by <a href="https://www.loopple.com" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">Loopple Builder</a>. </p>
        </div>
      </div>
    </>
  );
}

export default Our_team;
