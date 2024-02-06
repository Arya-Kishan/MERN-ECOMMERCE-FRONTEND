// A mock function to mimic making an async request for data
import { toast } from 'react-toastify';

export function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://mern-ecommerce-backend-plnp.onrender.com/user/login", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(user)
    })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      console.log("CANT LOGIN INVALID CREDENTIALS");
      toast("INVALID CREDENTIALS")
      reject({ data: null })
    }
  });
}


export function createUser(newUser) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://mern-ecommerce-backend-plnp.onrender.com/user/signup", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    const data = await response.json()
    resolve({ data })
  });
}


export function updateUserAddresses(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://mern-ecommerce-backend-plnp.onrender.com/user/${user.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ addresses: user.addresses })
    })
    if (response.ok) {
      const data = await response.json()
      toast("ADDRESS ADDED")
      resolve({ data })
    } else {
      console.log("ADDRESS NOT ADDED");
      toast("RESET LINK DOESN'T SENT")
      reject({ data: null })
    }
  });
}

export function resetPasswordRequest(userEmail) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://mern-ecommerce-backend-plnp.onrender.com/user/resetPasswordRequest", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userEmail)
    })
    if (response.ok) {
      const data = await response.json()
      toast("RESET LINK SENT TO YOUR EMAIL")
      resolve({ data })
    } else {
      console.log("CANT RESET PASSWORD REQUEST");
      toast("RESET LINK DOESN'T SENT")
      reject({ data: null })
    }
  });
}

export function resetPassword(newPassword) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://mern-ecommerce-backend-plnp.onrender.com/user/resetPassword", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPassword)
    })
    if (response.ok) {
      const data = await response.json()
      toast("PASSWORD RESET")
      resolve({ data })
    } else {
      console.log("CANT RESET PASSWORD REQUEST");
      toast("ERROR OCCURED")
      reject({ data: null })
    }
  });
}

export function checkUserByToken() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`https://mern-ecommerce-backend-plnp.onrender.com/auth/checkUserLoggedIn`, { credentials: "include" })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      reject({ data: null })
    }
  });
}

export function signoutUser() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`https://mern-ecommerce-backend-plnp.onrender.com/auth/checkUserLoggedOut`, { credentials: "include" })
    if (response.ok) {
      const data = await response.json()
      resolve({ data })
    } else {
      reject({ data: null })
    }
  });
}