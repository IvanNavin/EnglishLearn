import React from 'react';
import cl from 'classnames';
import s from './Header.module.scss';

const Header = ({ children, size = 'xl', white }) => {
    let sizePoint;
    switch (size) {
        case 'xl':
            sizePoint = 1;
            break;
        case 'l':
            sizePoint = 2;
            break;
        case 'm':
            sizePoint = 3;
            break;
        case 's':
            sizePoint = 4;
            break;
        case 'xs':
            sizePoint = 5;
            break;
        default:
            sizePoint = 1;
    }
    
    return React.createElement(
        `h${sizePoint}`, //h5
        {
            className: cl(s.header, s[`size${size.toUpperCase()}`], {
                [s.whiteColor]: white,
            }),
        },
        children,
    )
};

export default Header;