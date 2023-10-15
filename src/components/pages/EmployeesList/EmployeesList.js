import React from 'react';
import { FaEye, FaSistrix } from "react-icons/fa";

const EmployeesList = () => {
    return (
        <div className='mx-6'>
            <h2 className='text-3xl font-medium text-info text-center'>Employees List</h2>
            <div className='bg-[#E7F4FB] py-4 px-12 mt-2 flex justify-between items-center'>
                <div className='font-bold text-base-100 flex gap-2'>
                    <div className="relative inline-block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-3 py-2 border rounded-md bg-info placeholder-white font-bold"
                        />
                        <FaSistrix className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-base-100"></FaSistrix>
                    </div>
                    <select className="bg-info py-2 px-3 rounded-md">
                        <option>Active</option>
                        <option>Deactive</option>
                    </select>
                    <p className='bg-info py-2 pl-2 pr-8 rounded-md'>From Date</p>
                    <p className='bg-info py-2 pl-2 pr-8 rounded-md'>To Date</p>
                </div>
                <div>
                    <span className='bg-info py-2 px-4 rounded-md text-base-100 font-bold'>Expert</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Employees I'd</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Shapna</td>
                            <td>shapna@gmail.com</td>
                            <td>9922008828</td>
                            <td>1234556</td>
                            <td>Dhaka</td>
                            <td>
                                <input type="checkbox" className="toggle" />
                            </td>
                            <td>
                                <FaEye className='text-info text-2xl'></FaEye>
                            </td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Nishat</td>
                            <td>nish@gmail.com</td>
                            <td>9922008828</td>
                            <td>1234556</td>
                            <td>Dhaka</td>
                            <td>
                                <input type="checkbox" className="toggle" />
                            </td>
                            <td>
                                <FaEye className='text-info text-2xl'></FaEye>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeesList;