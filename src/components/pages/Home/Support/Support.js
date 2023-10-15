import React from 'react';
import calendar from '../../../../assets/Calendar.png'
import cash from '../../../../assets/Cash.png'
import team from '../../../../assets/Team.png'
import { Link } from 'react-router-dom';

const Support = () => {
    return (
        <div className='lg:mx-32 m-8 lg:m-0'>
            <div className='flex flex-col lg:flex-row justify-center lg:gap-14 gap-7'>
                <div className='flex justify-between items-center lg:gap-5 bg-primary text-white lg:py-6 lg:px-5 py-3 px-9'>
                    <Link className='text-[15px] lg:text-base'>Requested Demo</Link>
                    <img src={calendar} alt="calendar" className='w-4 lg:w-12' />
                </div>
                <div className='flex justify-between items-center lg:gap-5 bg-success text-primary lg:py-6 lg:px-5 py-3 px-9'>
                    <Link className='text-[15px] lg:text-base'>Technical Support</Link>
                    <img src={cash} alt="cash" className='w-4 lg:w-12' />
                </div>
                {/* <div className='flex justify-between items-center lg:gap-5 bg-info text-white lg:py-6 lg:px-5 py-3 px-9'>
                    <Link className='text-[15px] lg:text-base'>Family Login</Link>
                    <img src={team} alt="team" className='w-4 lg:w-12' />
                </div> */}
            </div>
            <div className='text-center my-16 lg:hidden'>
                <h4 className='text-2xl font-semibold text-info mb-2'>Why choose TangleCare</h4>
                <p className='leading-8	px-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.</p>
            </div>
            <p className='text-sm lg:hidden'>Powered by Raspberry Mule Inc. | Copyright 2023 </p>
        </div>
    );
};

export default Support;

// flex flex-col lg:flex-row lg:justify-around items-center lg:items-start lg:gap-14