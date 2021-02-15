import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import './style.scss';


const baseClassName = 'button';

const propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

const defaultProps = {
    onClick: () => {},
    className: '',
}

const Button = ({
    children,
    onClick,
    className,
}) => {
    const classNames = useMemo(
        () => {
            if (className) {
                return `${ baseClassName } ${ className }`;
            }

            return baseClassName;
        },
        [className]
    );

    return (
        <button
            className={ classNames }
            onClick={ onClick }
        >
            { children }
        </button>
    )
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;


export default Button;