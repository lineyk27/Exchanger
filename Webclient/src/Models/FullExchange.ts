import { Currency } from "./Currency";

export default interface FullExchange{
    id: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    fromAmount: number,
    toAmount: number,
    date: Date
}