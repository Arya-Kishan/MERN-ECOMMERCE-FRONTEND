import axios from "axios";
import { toast } from "react-toastify";

// A mock function to mimic making an async request for data
export function fetchAllProducts(page) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/product?limit=8&page=${page.page}&sort=${page.sort}&order=${page.order}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("/categories")
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }

  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("/brands")
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function fetchFilteredProducts(filters) {
  return new Promise(async (resolve, reject) => {

    let newFilter = null;

    for (let key in filters) {
      newFilter = `${key}=${filters[key]}`
    }

    try {
      const { data } = await axios.get(`/product?${newFilter}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }


  });
}

export function fetchProductDetail(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/product/${id}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }
  });
}

export function updateProductById(product) {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.patch(`/product/${product.id}`, product.products)
      toast("Updated")
      resolve({ data })
    } catch (error) {
      toast("NOT UPDATED")
      reject({ data: null })
    }

  });
}

export function deleteProduct(productId) {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await axios.delete(`/product/${productId}`)
      toast("DELETED")
      resolve({ data })
    } catch (error) {
      toast("NOT DELETED")
      reject({ data: null })
    }


  });
}



// FETCHING PRODUCT REVIEWS BY PRODUCT ID FROM REVIEW COLLECTION
export function createProductReviews(review) {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/review", review, { headers: config })
      console.log("ADDING REVIEW");
      toast("REVIEW ADDED")
      resolve({ data })
    } catch (error) {
      console.log("REVIEW CAN'T ADDED");
      toast("REVIEW NOT ADDED")
      reject({ data: null })
    }
  });
}

// FETCHING PRODUCT REVIEWS BY PRODUCT ID FROM REVIEW COLLECTION
export function fetchProductReviewsById(productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/review/${productId}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }


  });
}

// FETCHING RELATED PRODUCT
export function fetchRelatedProducts(category) {
  return new Promise(async (resolve, reject) => {

    try {
      const {data} = await axios.get(`/product/related/${category}`)
      resolve({ data })
    } catch (error) {
      reject({ data: null })
    }

  });
}