import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import TextInput from '../ui/text-input';
import Button from '../ui/button';
import Preloader from '../ui/preloader';

import './style.scss';


const baseClassName = 'coin-form';

const propTypes = {
    onAddCoin: PropTypes.func,
    isLoading: PropTypes.bool,
}

const defaultProps = {
    onAddCoin: () => {},
    isLoading: false,
}

const CoinForm = ({
    onAddCoin,
    isLoading,
}) => {
    const [ value, setValue ] = useState('ETH');

    const handleChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [setValue]
    )

    const handleClick = useCallback(
        () => {
            onAddCoin(value);
        },
        [onAddCoin, value]
    )

    const classNames = useMemo(
        () => {
            if (isLoading) {
                return `${ baseClassName } loading`;
            }

            return baseClassName;
        },
        [isLoading]
    );

    return (
        <div className={ classNames }>
            { isLoading ? (
                <Preloader />
            ) : (
                <>
                    <TextInput
                        className={ `${ baseClassName }__field` }
                        value={ value }
                        onChange={ handleChange }
                        placeholder='Cryptocurrency code'
                    />

                    <Button
                        className={ `${ baseClassName }__button` }
                        onClick={ handleClick }
                    >
                        Add
                    </Button>

                    <div className={ `${ baseClassName }__bottom-text` }>
                        Use of this service is subject to terms and conditions.
                    </div>
                </>
            ) }

        </div>
    );
};

CoinForm.propTypes = propTypes;
CoinForm.defaultProps = defaultProps;


export default CoinForm;