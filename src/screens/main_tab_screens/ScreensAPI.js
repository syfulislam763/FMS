import api from "../../constants/api";
import { GET_ANALYTICS, GET_LAST_ANALYTICS } from "../../constants/Paths";
import ToastMessage from "../../constants/ToastMessage";


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