import React from "react";
import { BiFolderOpen } from "react-icons/bi";

const Certification = () => {
  return (
    <>
      <div className="border border-gray-600 m-6 rounded-3xl mt-14 pb-8 relative">
        <div className="lg:ml-12 p-2">
          <h4 className="lg:text-5xl font-bold absolute -top-10">
            Certifications and Credentials
          </h4>
          <div className="lg:text-2xl mt-8 grid lg:grid-cols-3 grid-cols-1">
            <div className="flex flex-col items-start">
              <h5 className="font-bold mb-2">Type</h5>
              <p>Car Insurance</p>
              <p>Chest X-Ray</p>
              <p>CNA License</p>
              <p>CPR Certification</p>
              <p>Driver's License</p>
              <p>First Aid Certification</p>
              <p>HHA Certification</p>
              <p>LVN/LPN Certification</p>
              <p>Passport</p>
              <p>Performance Evaluation</p>
              <p>Registered Nurse</p>
              <p>State ID Card</p>
              <p>Tuberculosis Test</p>
            </div>
            <div className="flex flex-col lg:items-center  gap-2">
              <h5 className="font-bold mb-2">Expiration Date</h5>
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
              <input
                type="text"
                className="input input-bordered input-xs w-36"
              />
            </div>
            <div className="flex flex-col lg:items-center gap-2">
              <h5 className="font-bold mb-1">Notes</h5>
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
              <BiFolderOpen className="text-[#EDD067]" />
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-600 m-6 rounded-3xl mt-24 pb-8 relative">
        <div className="lg:ml-12 p-2">
          <h4 className="lg:text-5xl font-bold absolute -top-10">
            Education and Inservice
          </h4>
          <div className="mt-6">
            <div className="flex gap-4 font-semibold mb-4">
              <input type="checkbox" className="checkbox border-gray-400" />
              <span>High School</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 items-center">
              <div className="flex gap-4 font-semibold">
                <input type="checkbox" className="checkbox border-gray-400" />
                <span>College</span>
              </div>
              <div className="flex gap-4 font-semibold">
                <span>School:</span>
                <input
                  type="text"
                  className="input input-bordered input-xs w-36"
                />
              </div>
              <div className="flex gap-4 font-semibold">
                <span>Degree Received:</span>
                <input
                  type="text"
                  className="input input-bordered input-xs w-36"
                />
              </div>
            </div>
          </div>
          <div className="lg:text-xl font-medium mt-8">
            <p>No Inservice yet!!</p>
            <button className="text-info mt-8">+Click here to add Inservice</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certification;
