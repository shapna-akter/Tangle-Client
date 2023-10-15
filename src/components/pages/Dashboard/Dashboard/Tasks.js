import React from 'react';
import { HiPlus } from 'react-icons/hi';

const Tasks = () => {
    return (
        <>
            <div className="lg:mx-4 px-4 lg:shadow-md lg:border-x-2 lg:border-b-2">
                <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-3'>
                    <h4 className='lg:font-semibold font-bold text-3xl lg:text-base text-info lg:text-neutral'>Tasks</h4>
                    <div className='flex items-center gap-2 text-sm lg:text-base my-5 lg:my-0'>
                        <div className='text-info flex items-center font-bold'>
                            <HiPlus></HiPlus>
                            <p>Add Tasks</p>
                        </div>
                        <select
                            className="p-2 rounded-lg bg-[#EEEEEE]"
                            defaultValue=""
                        >
                            <option disabled value="">My Tasks</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                        </select>
                        <select 
                        className="p-2 rounded-lg bg-[#EEEEEE]"
                        defaultValue=""
                        >
                            <option disabled value="">Overdue</option>
                            <option value="">A</option>
                            <option value="">B</option>
                            <option value="">C</option>
                        </select>
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 lg:pb-4'>
                    <div className="card bg-base-100 lg:shadow-md lg:border-2 lg:border-r-4 lg:border-b-8 lg:border-gray-300 h-56">
                        <div className="text-xl font-semibold">
                            <h2 className="text-primary pt-4 border-b-2 lg:border-0 text-left lg:text-center">Administrative Tasks</h2>
                            <div className="card-body items-center text-center">
                                <p>Admin Access Only!!</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 lg:shadow-md lg:border-2 lg:border-r-4 lg:border-b-8 lg:border-gray-300 h-56">
                        <div className="text-xl font-semibold">
                            <h2 className="text-info pt-4 border-b-2 lg:border-0 text-left lg:text-center">Human Resources Tasks</h2>
                            <div className="card-body items-center text-center">
                                <p>Admin Access Only!!</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 lg:shadow-md lg:border-2 lg:border-r-4 lg:border-b-8 lg:border-gray-300 h-56">
                        <div className="text-xl font-semibold">
                            <h2 className="text-green-400 pt-4 border-b-2 lg:border-0 text-left lg:text-center">General Tasks</h2>
                            <div className="card-body items-center text-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tasks;