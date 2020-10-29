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
                });
        }
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
        return (<p>1 {this.state.displayFromCurrency} = {this.state.toCurrencyRate} {this.state.displayToCurrency}</p>)
    }
    render(): React.ReactNode{
        return(
            <React.Fragment>
                <div>
                    <p>{this.state.error}</p>
                    <form onSubmit={this.handleSubmit}>
                        <label> Amount
                            <input 
                                type="text" 
                                name="fromAmount"
                                onChange={this.handleChange} 
                                value={this.state.fromAmount} />
                        </label>
                        <select name="fromCurrency" onChange={this.handleSelect} value={this.state.fromCurrency}>
                            {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                        </select>
                        {
                            <span>{this.state.exchangeDirection == ExchangeDirection.Normal ? "->" : "<-"}</span>
                        }
                        <label>
                            Converted to
                            <input 
                                type="text"
                                name="toAmount" 
                                onChange={this.handleChange} 
                                value={this.state.toAmount}/>
                        </label>
                        <select name="toCurrency" onChange={this.handleSelect} value={this.state.toCurrency}>
                            {Object.values(Currency).map((val,ind) : React.ReactNode => <option value={val} key={ind}>{val}</option>)}
                        </select>
                        <button type="submit" >
                            Exchange
                        </button>
                    </form>
                    <div>
                        {this.getRateLabel()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Exchanger;