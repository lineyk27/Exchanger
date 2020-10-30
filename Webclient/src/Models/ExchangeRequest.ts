import { Currency } from "./Currency";

export default interface ExchangeRequest{
    fromCurrency: Currency,
    fromAmount: number,
    toCurrency: Currency
}