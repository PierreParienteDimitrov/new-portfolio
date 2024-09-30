import React from 'react';
import '../styles/globals.css';


const ScrollingRibbon: React.FC = () => {
    const content = `//    MADE IN NEW YORK CITY    //    PRODUCT DESIGN - DESIGN SYSTEMS - USER EXPERIENCE - USER INTERFACE    //    CURRENT STATUS : EMPLOYED AT MOODY'S    //    COPYRIGHT 2024. ALL RIGHTS RESERVED. PIERRE PARIENTE DIMITROV`;

    return (
        <div className="fixed bottom-0 w-full bg-gray-950 text-white py-2">
            <div className="relative whitespace-nowrap overflow-hidden">
                <div className="animate-scroll inline-block">
                    <p className='text-fuchsia-600'>
                        {content}
                    </p>
                </div>
                <div className="animate-scroll inline-block">
                    <p className='text-fuchsia-600'>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScrollingRibbon;
