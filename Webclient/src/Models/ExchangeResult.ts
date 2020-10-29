import { Currency } from "./Currency";

export default interface ExchangeResult{
    fromCurrency: Currency,
    fromAmount: number,
    toCurrency: Currency,
    toAmount: number,
    toCurrencyRate: number    
}