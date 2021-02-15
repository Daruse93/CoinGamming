import React, { useMemo } from 'react';

import PropTypes from "prop-types";

import './style.scss';


const baseClassName = 'text-input';

const propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
}

const defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    className: '',
    onChange: () => {},
}

const TextInput = ({
    type,
    placeholder,
    value,
    className = '',
    onChange = () => {},
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
        <div className={ classNames }>
            <span className={ `${baseClassName}__placeholder` }>
              { placeholder }
            </span>

            <input
                type={ type }
                value={ value }
                onChange={ onChange }
                className={ `${ baseClassName }__input` }
            />
        </div>
    )
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;


export default TextInput;