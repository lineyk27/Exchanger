import React from "react";
import { ExchangeAPI } from "../api";
import FullExchange from "../Models/FullExchange";

const PAGE_SIZE = 20;

interface IState{
    exchanges: Array<FullExchange>,
    page: number,
    isLastPage: boolean
}

enum FetchDirection{
    Next = 1,
    Prev = -1
}

class History extends React.Component<{}, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            exchanges: [],
            page: 0,
            isLastPage: false
        }
        this.fetchHistory(FetchDirection.Next);
    }

    fetchHistory = async (direction: FetchDirection) => {
        let increment: number = direction;
        console.log(this.state.page);

        ExchangeAPI.history({page: this.state.page + increment})
            .then(arr => {
                this.setState(prevState => {
                    return {
                        exchanges: arr, 
                        page: prevState.page + increment,
                        isLastPage: arr.length < PAGE_SIZE
                     }
                });
            })
    }

    render(): React.ReactNode{
        const {exchanges} = this.state;
        return(
            <React.Fragment>
                <p>History page</p>
                <table>
                    <thead>
                        <tr>
                            <td>From currency</td>
                            <td>From amount</td>
                            <td>To currency</td>
                            <td>To amount</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {exchanges.map((val) => (
                            <tr>
                                <td>{val.fromCurrency}</td>
                                <td>{val.fromAmount}</td>
                                <td>{val.toCurrency}</td>
                                <td>{val.toAmount}</td>
                                <td>{new Date(val.date).toDateString()}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                {this.state.page !== 1 && 
                    <button onClick={async () => await this.fetchHistory(FetchDirection.Prev)} >Previous</button>
                }{!this.state.isLastPage && 
                    <button onClick={async () => await this.fetchHistory(FetchDirection.Next)} >Next</button>
                }
            </React.Fragment>
        );
    }
}

export default History;