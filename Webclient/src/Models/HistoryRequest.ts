import { Currency } from "./Currency";

export default interface HistoryRequest{
    fromCurrency?: Currency,
    fromAmount?: number,
    toCurrency?: Currency,
    toAmount?: number,
    date?: Date,
    page: number
}