import React from "react";
import { HiPlus } from "react-icons/hi";

const Documents = () => {
  return (
    <div>
      <div className="overflow-x-auto flex justify-center lg:shadow-md lg:mx-6 mx-2 lg:border-2">
        <table className="w-full">
          <thead className="lg:bg-slate-100">
            <tr>
              <span className="flex flex-col lg:flex-row lg:justify-between items-center lg:px-4 lg:py-2">
                <th className="lg:font-semibold font-bold text-3xl lg:text-base text-info lg:text-neutral">
                  Documents
                </th>
                <div className="flex gap-2 my-5 lg:my-0">
                  <th className="text-info lg:mr-4 flex items-center text-xs lg:text-base">
                    <HiPlus></HiPlus>
                    <p>Add Documents</p>
                  </th>
                  <th>
                    <select
                      defaultValue=""
                      className="p-2 lg:rounded-lg rounded-full bg-[#EEEEEE] font-normal text-xs lg:text-base"
                    >
                      <option disabled value="">
                        My Documents
                      </option>
                      <option value="">Small Apple</option>
                      <option value="">Small Orange</option>
                      <option value="">Small Tomato</option>
                    </select>
                  </th>
                  <th>
                    <select
                      defaultValue=""
                      className="p-2 lg:rounded-lg rounded-full bg-[#EEEEEE] font-normal text-xs lg:text-base"
                    >
                      <option disabled value="">
                        Overdue
                      </option>
                      <option value="">Small Apple</option>
                      <option value="">Small Orange</option>
                      <option value="">Small Tomato</option>
                    </select>
                  </th>
                </div>
              </span>
            </tr>
          </thead>
          <tbody className="border-2 lg:border-0 shadow-md lg:shadow-0">
            <div className="border-b-2 px-4 py-2 bg-gray-200 font-semibold">
              <tr>
                <td>Documents</td>
              </tr>
            </div>
            <div className="border-b-2 px-4 py-2">
              <tr>
                <td>8a_CaregiverTraining_EmailT...</td>
              </tr>
            </div>
            <div className="border-b-2 px-4 py-2">
              <tr>
                <td>Example Profile & Activity ...</td>
              </tr>
            </div>
            <div className="border-b-2 px-4 py-5"></div>
            <div className="border-b-2 px-4 py-10"></div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
