import ExchangeRequest from "./Models/ExchangeRequest"
import ExchangeResult from "./Models/ExchangeResult"
import FullExchange from "./Models/FullExchange"
import HistoryRequest from "./Models/HistoryRequest"
import Axios from "axios"

const BASE_URL = "/api"

export const ExchangeAPI = {
    exchange: (model: ExchangeRequest) : Promise<ExchangeResult> => Axios.get(`${BASE_URL}/exchanges/exchange`,{
        params: model
    })
        .then(response => response.data as ExchangeResult),

    history: (model: HistoryRequest) : Promise<Array<FullExchange>> => Axios.get(`${BASE_URL}/exchanges/history`, {
        params: model
    })
        .then(response => response.data as Array<FullExchange>)
}