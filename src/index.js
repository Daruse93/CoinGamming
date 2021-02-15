import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from './components/app';

import './index.scss';


const client = new ApolloClient({
    uri: 'https://api.blocktap.io/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '20px',
    transition: transitions.SCALE,
}

ReactDOM.render(
    <ApolloProvider client={ client }>
        <AlertProvider template={ AlertTemplate } { ...alertOptions }>
            <App />
        </AlertProvider>
    </ApolloProvider>,
    document.getElementById('root')
);