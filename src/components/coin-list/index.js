import React, { useMemo } from 'react';
import PropTypes from "prop-types";

import './style.scss';

const baseClassName = 'coin-list';

const propTypes = {
    items: PropTypes.array,
    onDelete: PropTypes.func,
    className: PropTypes.string,
}

const defaultProps = {
    items: [],
    onDelete: () => {},
    className: '',
}

const CoinList = ({
    items,
    onDelete,
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
        <div className={ classNames }>
            {items.length > 0 && items.map(item => (
                <div className={` ${baseClassName}__item` } key={item.id}>
                    <div className={ `${baseClassName}__item-name` }>
                        {item.baseSymbol}
                    </div>

                    <div className={ `${baseClassName}__item-price` }>
                        {Number(item.ticker.lastPrice).toFixed(2)} €
                    </div>

                    <div
                        className={` ${baseClassName}__item-delete` }
                        onClick={ () => onDelete(item.baseSymbol) }
                    >
                        ✖
                    </div>
                </div>
            ))}
        </div>
    );
};

CoinList.propTypes = propTypes;
CoinList.defaultProps = defaultProps;

export default CoinList;