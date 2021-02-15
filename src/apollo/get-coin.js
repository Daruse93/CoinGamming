import { gql } from "@apollo/client";

const GET_COIN = gql`
    query GetCoin($baseSymbol: String) {
        markets(
            filter:{
                baseSymbol: {_eq: $baseSymbol}
                quoteSymbol: {_eq: "EUR" }
            })
        {
            id
            baseSymbol
            ticker {
                lastPrice
            }
        }
    }
`;

export default GET_COIN;