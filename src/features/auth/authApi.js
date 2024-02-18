import axios from 'axios';
import { toast } from 'react-toastify';

export function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/user/login", user)
      localStorage.setItem("jwt-routes", (res.headers?.["x-jwt-routes"]));
      resolve({ data: res.data })
    } catch (error) {
      console.log(error);
      console.log("CANT LOGIN INVALID CREDENTIALS");
      toast("INVALID CREDENTIALS")
      reject({ data: null })
    }
  });
}

export function checkUserSession() {
  return new Promise(async (resolve, reject) => {

    if (localStorage.getItem("jwt-routes")) {

      try {
        const { data } = await axios.get("/auth/checkUserSession")
        // console.log(data);
        resolve({ data })
      } catch (error) {
        reject({ data: null })
      }

    } else {
      reject({ data: null })
    }

  });
}


export function createUser(newUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/user/signup", newUser)
      localStorage.setItem("jwt-routes", (res.headers?.["x-jwt-routes"]));
      console.log(res.data);
      resolve({ data: res.data })
    } catch (error) {
      console.log("CANT CREATE NEW USER");
      toast("UNABLE TO CREATE NEW USER")
      reject({ data: null })
    }
  });
}


export function updateUserAddresses(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/user/${user.id}`, { addresses: user.addresses })
      console.log(data);
      toast(user.message + "ED ADDRESS")
      resolve({ data })
    } catch (error) {
      console.log("ADDRESS NOT ADDED");
      toast("ADRESS NOT ADDED")
      reject({ data: null })
    }
  });
}

export function resetPasswordRequest(userEmail) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/user/resetPasswordRequest", userEmail)
      console.log(data);
      toast("RESET LINK SENT TO EMAIL")
      resolve({ data })
    } catch (error) {
      console.log("CANT SENT RESET LINK");
      toast("CANT SENT RESET LINK : CHECK YOUR EMAIL")
      reject({ data: null })
    }
  });
}

export function resetPassword(newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/user/resetPassWORD", newPassword)
      console.log(data);
      toast("PASSWORD CHANGED")
      resolve({ data })
    } catch (error) {
      console.log("CAN'T CHANGE PASSWORD");
      toast("PASSWORD DOESN'T CHANGE")
      reject({ data: null })
    }
  });
}