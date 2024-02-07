import axios from "axios";
import { toast } from "react-toastify";

export function AddWishlist(wishlist) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post("/wishlist", wishlist)
            console.log(data);
            toast("ADDED WISHLIST")
            resolve({ data })
        } catch (error) {
            toast("NOT ADDED TO WISHLIST")
            reject({ data: null })
        }

    });
}


export function fetchWishlist(userId) {
    return new Promise(async (resolve, reject) => {

        try {
            const { data } = await axios.get(`/wishlist/${userId}`)
            resolve({ data })
        } catch (error) {
            reject({ data: null })
        }


    });
}

export function deleteWishlist(wishlistId) {
    return new Promise(async (resolve, reject) => {

        try {
            const { data } = await axios.delete(`wishlist/${wishlistId}`)
            toast("DELETED")
            resolve({ data })
        } catch (error) {
            toast("WISHLIST NOT DELETED")
            reject({ data: null })
        }


    });
}