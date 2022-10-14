import React from "react";
import PropTypes from 'prop-types';
import IcomoonReact from "react-icomoon";
import iconSet from "./selection.json";

/*
* =============================Icon specs===============================
* Props
*   icon - value of selected icon to render.
*   className - contain style class for icon design.
* Component functionality - render the selected icon and add style.
* ======================================================================
*/ 
const Icon = ({ icon, className }) => {
    return (
        <IcomoonReact
            className={className}
            iconSet={iconSet}
            icon={icon}
        />
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default Icon;