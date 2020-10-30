import React, { ChangeEvent, FormEvent } from "react";
import { ExchangeAPI } from "../api";
import { Currency } from "../Models/Currency";

interface IState{
    fromCurrency: Currency,
    toCurrency: Currency,
    displayFromCurrency: Currency,
    displayToCurrency: Currency,
    fromAmount: string,
    toAmount: string,
    toCurrencyRate: number,
    error: string,
    exchangeDirection: ExchangeDirection
}

enum ExchangeDirection {
    Normal = "FromTo",
    Inverted = "ToFrom"
}

class Exchanger extends React.Component<{},IState>{
    constructor(props: {}){
        super(props);
        this.state = {
            fromCurrency: Currency.EUR,
            toCurrency: Currency.USD,
            displayFromCurrency: Currency.EUR,
            displayToCurrency: Currency.USD,
            fromAmount: "100",
            toAmount: "0",
            toCurrencyRate: 0,
            error: "",
            exchangeDirection: ExchangeDirection.Normal
        }
        this.getExchange();
    }
    hideError = () => {
        this.setState({error: ""});
    }
    getExchange = async () => {
        
        if(this.state.exchangeDirection === ExchangeDirection.Normal){
            let model = {
                fromCurrency: this.state.fromCurrency,
                toCurrency: this.state.toCurrency,
                fromAmount: Number.parseFloat(this.state.fromAmount)
            }
            await ExchangeAPI.exchange(model)
                .then(res => {
                    this.setState({
                        fromAmount: res.fromAmount.toString(),
                        toAmount: res.toAmount.toString(),
                        toCurrencyRate: res.toCurrencyRate,
                        displayFromCurrency: res.fromCurrency,
                        displayToCurrency: res.toCurrency
                    });
                }).catch(error => {
                    console.log(error);
                    this.setState({error: "Bad request"})
                });
        }else{
            let model = {
                fromCurrency: this.state.toCurrency,
                toCurrency: this.state.fromCurrency,
                fromAmount: Number.parseFloat(this.state.toAmount)
            }
            ExchangeAPI.exchange(model)
                .then(res => {
                    this.setState({
                        fromAmount: res.toAmount.toString(),
                        toAmount: res.fromAmount.toString(),
                        toCurrencyRate: res.toCurrencyRate,
                        displayFromCurrency: res.fromCurrency,
                        displayToCurrency: res.toCurrency
                    });
                }).catch(error => {
                    console.log(error);
                    this.setState({error: "Bad request"})
                });
        }
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.hideError();
        console.log(this.state.exchangeDirection);
        this.setState((prevState) => {return{
            fromAmount: Number.parseFloat(prevState.fromAmount).toString(),
            toAmount: Number.parseFloat(prevState.toAmount).toString()
        }});
        await this.getExchange();
    }
    handleInputChange = (e : any) => {
        if(e.target.name === "fromAmount" || e.target.name === "fromCurrency")
            this.setState({exchangeDirection: ExchangeDirection.Normal})
        else{
            this.setState({exchangeDirection: ExchangeDirection.Inverted})
        }
    }
    handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        e.persist();
        this.handleInputChange(e);
        this.setState((prevState) : any => {
            return {[e.target.name]: e.target.value};
          });
    }
    handleSelect = (e : ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        this.handleInputChange(e);
        this.setState((prevState) : any => {
            console.log(e.target.value);
            return {[e.target.name]: e.target.value};
        });
    }
    getRateLabel = () => {
        return (<span>1 
            {this.state.displayFromCurrency} = 
            <span className="text-success">{this.state.toCurrencyRate}</span>{" "}
            {this.state.displayToCurrency}</span>)
    }
    render(): React.ReactNode{
        return(
            <React.Fragment>
                <div >
                    {this.state.error !== "" && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    }
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <div className="row justify-">
                                <label htmlFor="from-amount-input" className="col-md-5"> Amount</label>
                                <label htmlFor="to-amount-input" className="col-md">Converted to</label>
                        </div>   
                        <div className="row">
                            <input 
                                    type="text" 
                                    id="from-amount-input"
                                    className="form-control col-md-3"
                                    name="fromAmount"
                                    onChange={this.handleChange} 
                                    value={this.state.fromAmount} />
                        <select name="fromCurrency" className="form-control col-md-1" 
                                onChange={this.handleSelect} value={this.state.fromCurrency}>
                                {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                        </select>
                        <span style={{fontSize: "25px", marginLeft: "20px",marginRight: "20px",}}>
                            {this.state.exchangeDirection === ExchangeDirection.Normal ? "→" : "←"}
                        </span>
                        <input 
                                type="text"
                                id="to-amount-input"
                                className="form-control col-md-2"
                                name="toAmount" 
                                onChange={this.handleChange} 
                                value={this.state.toAmount}/>
                        <select name="toCurrency"
                            className="form-control col-md-1" 
                            onChange={this.handleSelect} value={this.state.toCurrency}>
                            {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                        </select>
                        </div>
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-3">
                                {this.getRateLabel()}
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-success" >
                                    Exchange
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Exchanger;