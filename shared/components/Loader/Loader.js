import React, { Fragment, useEffect, useRef } from 'react';
import { gsap } from "gsap";

import { ReactComponent as LoaderImage } from './loader.svg';

import styles from './Loader.module.scss';

/*
* ==================Loader specs=======================
* Component functionality - render the animated loading component.
* ======================================================
*/ 
const Loader = () => {
    const tl = useRef();
    useEffect(() => {
        const loader = document.getElementById('loader');
        const els = gsap.utils.selector(loader);

        const topBlue = els('path:nth-child(3)');
        const bottomBlue = els('path:nth-child(4)');
        const topPurple = els('path:nth-child(2)');
        const bottomPurple = els('path:nth-child(7)');
        const topGreen = els('path:nth-child(6)');
        const bottomGreen = els('path:nth-child(1)');

        const easing = 'power1.inOut';
        const duration = 0.3;
        const delay = 0.1;
        tl.current = gsap.timeline({
            repeat: -1,
            yoyo: true
        })
            .from(topBlue, {
                yPercent: 20,
                opacity: 0,
                duration: duration,
                ease: easing
            }, `<${delay}`)
            .from(bottomBlue, {
                yPercent: -20,
                duration: duration,
                opacity: 0,
                ease: easing
            }, `<${delay}`)
            .from(topPurple, {
                yPercent: 10,
                xPercent: -10,
                duration: duration,
                opacity: 0,
                ease: easing
            }, `<${delay}`)
            .from(bottomPurple, {
                yPercent: -10,
                xPercent: 10,
                duration: duration,
                opacity: 0,
                ease: easing
            }, `<${delay}`)
            .from(topGreen, {
                yPercent: 5,
                xPercent: 5,
                duration: duration,
                opacity: 0,
                ease: easing
            }, `<${delay}`)
            .from(bottomGreen, {
                yPercent: -5,
                xPercent: -5,
                duration: duration,
                opacity: 0,
                ease: easing
            }, `<${delay}`)
    }, []);

    return (
        <Fragment>
            <div className={styles.overlay}></div>
            <LoaderImage className={styles.loader} />
        </Fragment>
    )
}

export default Loader;