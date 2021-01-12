import React from 'react';
import s from './Section.module.scss';

const Section = ({ children, bgColor = '#FFF', className }) => {
    return (
        <section className={s.root +' '+ className} style={{backgroundColor: bgColor}}>
            <div className={s.wrap}>
                { children }
            </div>
        </section>
    );
};

export default Section;