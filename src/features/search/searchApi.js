import axios from "axios";
import { toast } from "react-toastify";


export function fetchSearchText(search) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`/product/search/text?text=${search}`)
        resolve({ data })
      } catch (error) {
        reject({ data: null })
      }
    });
  }

