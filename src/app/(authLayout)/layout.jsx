import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className='min-h-fit'>
            {children}
        </div>
    );
};

export default AuthLayout;