import React, { ChangeEvent } from "react";
import { ExchangeAPI } from "../api";
import { Currency } from "../Models/Currency";
import FullExchange from "../Models/FullExchange";
import HistoryRequest from "../Models/HistoryRequest";

const PAGE_SIZE = 20;

interface HistoryFilters{
    fromCurrencies?: Array<Currency>,
    fromAmountLowerBound?: number,
    fromAmountUpperBound?: number,
    toCurrencies?: Array<Currency>,
    toAmountLowerBound?: number,
    toAmountUpperBound?: number,
    dateLowerBound?: string,
    dateUpperBound?: string,
}

interface IState extends HistoryRequest{
    exchanges: Array<FullExchange>,
    page: number,
    isLastPage: boolean
}

enum FetchDirection{
    Next = 1,
    Prev = -1
}

class History extends React.Component<{}, IState>{
    private filtersRef: React.RefObject<HistoryFilter>;
    constructor(props: any){
        super(props);
        this.state = {
            exchanges: [],
            page: 0,
            isLastPage: false,
        }
        this.filtersRef = React.createRef();
        this.fetchHistory(1);
    }
    getFilters = (page: number) : HistoryRequest => {
        let filters: HistoryRequest = {
            fromCurrencies: this.filtersRef.current?.state.fromCurrencies,
            fromAmountLowerBound: this.filtersRef.current?.state.fromAmountLowerBound,
            fromAmountUpperBound: this.filtersRef.current?.state.fromAmountUpperBound,
            toCurrencies: this.filtersRef.current?.state.toCurrencies,
            toAmountLowerBound: this.filtersRef.current?.state.toAmountLowerBound,
            toAmountUpperBound: this.filtersRef.current?.state.toAmountUpperBound,
            dateLowerBound: new Date(this.filtersRef.current?.state.dateLowerBound ?? "1970-01-01"),
            dateUpperBound: new Date(this.filtersRef.current?.state.dateUpperBound ?? "2970-01-01"),
            page
        }
        return filters;
    }

    fetchHistory = async (page: number) => {
        let model = this.getFilters(page);
        await ExchangeAPI.history(model)
            .then(arr => {
                this.setState(prevState => {
                    return {
                        exchanges: arr, 
                        page: page,
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
                <div id="history-filters">
                    <HistoryFilter ref={this.filtersRef}/>
                </div>
                <div className="row mb-2 mt-2 justify-content-between">
                    <div className="col-md-1">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.fetchHistory(1)}>filter</button>
                    </div>
                    <div className="col-md-3 ">
                        <div className="row justify-content-end">
                            <button 
                            disabled={this.state.page <= 1}
                                className="btn btn-primary"
                                onClick={async () => await this.fetchHistory(this.state.page - 1)} 
                                >Previous</button>
                            <span className="text-dark ml-2 mr-2">{this.state.page}</span>
                            <button 
                                disabled={this.state.isLastPage}
                                className="btn btn-primary"
                                onClick={async () => await this.fetchHistory(this.state.page + 1)} 
                                >Next</button>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
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

            </React.Fragment>
        );
    }
}

class HistoryFilter extends React.Component<{},HistoryFilters>{
    constructor(props: {}){
        super(props);
        this.state = {};
    }
    handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        e.persist();
        this.setState((prevState) : any => {
            return {[e.target.name]: e.target.value};
          });
    }
    handleSelect = (e : ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        this.setState((prevState) : any => {
            console.log(e.target.value);
            return {[e.target.name]: e.target.value};
        });
    }
    render(){
        return(
            <React.Fragment>
                <form className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="fromCurrencies">
                                From Currencies
                            <select 
                                name="fromCurrencies" 
                                id="fromCurrencies"
                                className="form-control"
                                //multiple={true} 
                                value={this.state.fromCurrencies}
                                onChange={this.handleSelect}
                                >
                                {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                            </select>
                            </label>
                        </div>
                        <div className="col">
                        <label> From amount lower bound
                            <input 
                                type="number" 
                                min={0}
                                className="form-control"
                                name="fromAmountLowerBound"
                                onChange={this.handleChange} 
                                value={this.state.fromAmountLowerBound} />
                        </label>
                        </div>
                        <div className="col">
                            <label> From amount upper bound
                                <input 
                                    type="number" 
                                    min={0}
                                    className="form-control"
                                    name="fromAmountUpperBound"
                                    onChange={this.handleChange} 
                                    value={this.state.fromAmountUpperBound} />
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                    <div className="col">
                    <label>To Currencies
                    <select 
                        name="toCurrencies" 
                        //multiple={true} 
                        className="form-control"
                        value={this.state.toCurrencies}
                        onChange={this.handleSelect}
                        >
                        {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                    </select>
                    </label>
                    </div>
                    <div className="col">
                    <label> To amount lower bound
                        <input 
                            type="number"
                            min={0}
                            className="form-control"
                            name="toAmountLowerBound"
                            onChange={this.handleChange} 
                            value={this.state.toAmountLowerBound} />
                    </label>
                    </div>
                    <div className="col">
                    <label> To amount upper bound
                        <input 
                            type="number" 
                            name="toAmountUpperBound"
                            min={0}
                            className="form-control"
                            onChange={this.handleChange} 
                            value={this.state.toAmountUpperBound} />
                    </label>
                    </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label>
                                Lower date bound
                                <input type="date" name="dateLowerBound"
                                    value={this.state.dateLowerBound ?? ""}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    min="1970-01-01" max="2032-12-31"></input>
                            </label>
                        </div>
                        <div className="col">
                            <label>
                                Upper date bound
                                <input type="date" name="dateUpperBound"
                                    value={this.state.dateUpperBound ?? ""}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    min="1970-01-01" max="2032-12-31"></input>
                            </label>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default History;