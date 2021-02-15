import React, { useState, useEffect, useCallback } from 'react';

import { useLazyQuery  } from "@apollo/client";
import { useAlert } from 'react-alert'

import CoinForm from '../coin-form';
import CoinList from '../coin-list';

import GET_COIN from '../../apollo/get-coin';

import './style.scss';


const baseClassName = 'app';

const App = () => {
    const alert = useAlert();
    const [ coins, setCoins ] = useState([]);
    const [ getCoin, { called, loading, data }] = useLazyQuery(GET_COIN);

    const handleAddCoin = useCallback(
        (name) => {
            if (coins.find(item => item.baseSymbol === name)) {
                alert.show(`Coin ${ name } is already on your list!`);
                return;
            }

            getCoin({
                variables: {
                    baseSymbol: name,
                },
            });
        },
        [alert, coins, getCoin]
    );

    const handleDelete = useCallback(
        (baseSymbol) => {
            const items = coins.filter(item => item.baseSymbol !== baseSymbol);
            setCoins(items);
        },[coins, setCoins]
    );

    useEffect(
        () => {
            if (!loading && called && data && data.markets) {
                if (data.markets.length > 0) {
                    setCoins(prevCoins => [...prevCoins, data.markets[0]]);
                } else {
                    alert.show(`This coin was not found!`);
                }
            }
        },
        [data, loading, called, alert]
    );

    return (
        <div className={ baseClassName }>
            <div className={ `${ baseClassName }__body` }>
                <div className={ `${ baseClassName }__logo` }/>

                <div className={ `${ baseClassName }__content` }>
                    <div className={ `${ baseClassName }__content-left` }>
                        <h1>
                            Now you can track <br/>
                            all your cryptos here!
                        </h1>

                        <div className={ `${ baseClassName }__content-info`}>
                            Just enter the <br/>
                            cryptocurrency code on the <br/>
                            form to the right.
                        </div>

                        <CoinList
                            items={ coins }
                            onDelete={ handleDelete }
                            className={ `${ baseClassName }__content-list` }
                        />
                    </div>

                    <div className={ `${ baseClassName }__content-right` }>
                        <CoinForm
                            onAddCoin={ handleAddCoin }
                            isLoading={ loading }
                        />
                    </div>
                </div>
            </div>

            <footer className={` ${baseClassName}__footer` }>
                <div className={` ${baseClassName}__footer-content` }>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at atque aut autem consequatur
                    deleniti eligendi,
                    error et, ex iure laborum nesciunt obcaecati quibusdam reiciendis sunt unde vel voluptates. Corporis
                    deleniti eaque esse est, harum nulla possimus.
                </div>
            </footer>
        </div>
    );
};

export default App;