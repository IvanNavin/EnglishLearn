import React from 'react';
import s from './HeaderBlock.module.scss';

const BackgroundBlock = ({ children, backgroundImg, fullHeight = false }) => {
    const styleCover = { backgroundImage: `url(${backgroundImg})` };
    if (fullHeight) {
        styleCover.height = '100vh';
    }
    return (
        <section className={s.cover} style={styleCover}>
            <div className={s.wrap}>
                {children}
            </div>
        </section>
    );
}

export default BackgroundBlock;