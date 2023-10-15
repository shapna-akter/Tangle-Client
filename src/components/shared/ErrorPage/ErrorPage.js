import React from 'react';
import errorPage from '../../../assets/errorPage.avif'

const ErrorPage = () => {
    return (
        <div className='flex justify-center h-screen'>
           <img src={errorPage} alt="" /> 
        </div>
    );
};

export default ErrorPage;