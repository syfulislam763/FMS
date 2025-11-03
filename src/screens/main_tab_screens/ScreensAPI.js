import api from "../../constants/api";
import { 
    GET_ANALYTICS, 
    GET_LAST_ANALYTICS,
    INCOME,
    EXPENSE,
    BUDGET,
    MONTHLY_BUDGET,
    BUDGET_ANALYSIS,
    DATE_NIGHT,
    SAVING_GOAL,
    SAVING_CALCULATOR,
    INFLATION_CALCULATOR,
    HISTORY_INFLATION_CALCULATOR,
    DEBTS,
    DEBTS_SUMMARY
} from "../../constants/Paths";
import ToastMessage from "../../constants/ToastMessage";






export const get_debts_summary = async (cb=() => {}) => {
    try{
        const res = await api.get(DEBTS_SUMMARY);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("date night", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const get_debts = async (cb=() => {}) => {
    try{
        const res = await api.get(DEBTS);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("date night", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}
export const delete_debts = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(DEBTS+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const post_debts = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(DEBTS, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const calculate_historical_inflation = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(HISTORY_INFLATION_CALCULATOR, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const calculate_inflation = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(INFLATION_CALCULATOR, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const calculate_regular_savings = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(SAVING_CALCULATOR, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}
export const get_saving_goals = async (cb=() => {}) => {
    try{
        const res = await api.get(SAVING_GOAL);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("date night", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}
export const delete_saving_goal = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(SAVING_GOAL+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const post_saving_goal = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(SAVING_GOAL, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}



export const get_date_night = async (cb=() => {}) => {
    try{
        const res = await api.get(DATE_NIGHT);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("date night", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}


export const delete_date_night = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(DATE_NIGHT+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const post_date_night = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(DATE_NIGHT, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const get_budget_analysis = async (cb=() => {}) => {
    try{
        const res = await api.get(BUDGET_ANALYSIS);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const get_monthly_budget = async (cb=() => {}) => {
    try{
        const res = await api.get(MONTHLY_BUDGET);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const delete_budget = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(BUDGET+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const post_budget = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(BUDGET, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}



export const get_expence = async (cb=() => {}) => {
    try{
        const res = await api.get(EXPENSE);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const delete_expence = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(EXPENSE+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const post_expence = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(EXPENSE, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}


export const get_incomes = async (cb=() => {}) => {
    try{
        const res = await api.get(INCOME);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}
export const delete_income = async (id, cb=() => {}) => {
    try{
        const res = await api.delete(INCOME+id);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}
export const post_incomes = async (payload, cb=() => {}) => {
    try{
        const res = await api.post(INCOME, payload);
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const get_formated_time = (isoString) => {
  const date = new Date(isoString);

  const month = date.toLocaleString("en-US", { month: "long" }); // e.g. "October"
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 

  const time = `${hours}:${minutes} ${ampm}`;

  return {month, day,year, time};
}

export const get_analytics = async (cb) => {
    try{
        const res = await api.get(GET_ANALYTICS)
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}

export const get_last_analytics = async (cb) => {
    try{
        const res = await api.get(GET_LAST_ANALYTICS)
        cb(res.data)
    }catch(e){
        cb(null)
        console.log("re", JSON.stringify(e.response, null, 2))
        ToastMessage("error", e?.response?.data?.message, 3000)
    }
}