import { Currency } from "./Currency";

export default interface HistoryRequest{
    fromCurrencies?: Array<Currency>,
    fromAmountLowerBound?: number,
    fromAmountUpperBound?: number,
    toCurrencies?: Array<Currency>,
    toAmountLowerBound?: number,
    toAmountUpperBound?: number,
    dateLowerBound?: Date,
    dateUpperBound?: Date,
    page: number
}