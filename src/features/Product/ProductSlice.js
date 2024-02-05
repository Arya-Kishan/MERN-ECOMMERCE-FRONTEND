import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProductReviews, deleteProduct, fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchFilteredProducts, fetchProductDetail, fetchProductReviewsById, fetchRelatedProducts, updateProductById } from './ProductApi';

const initialState = {
  products: 0,
  categories: null,
  brands: null,
  count: null,
  details: null,
  reviews: [],
  relatedProducts: null,
  status: 'loading',
  detailStatus: 'loading',
};






export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (page) => {
    const response = await fetchAllProducts(page);
    return { data: response.data, dataCount: response.data.length };
  }
);

export const fetchAllCategoriessAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const fetchFilteredProductsAsync = createAsyncThunk(
  'product/fetchFilteredProducts',
  async (filters) => {
    const response = await fetchFilteredProducts(filters);
    return { data: response.data, dataCount: response.data.length };
  }
);

export const fetchProductDetailAsync = createAsyncThunk(
  'product/fetchProductDetail',
  async (id) => {
    const response = await fetchProductDetail(id);
    return response.data;
  }
);


export const updateProductByIdAsync = createAsyncThunk(
  'product/updateProductById',
  async (product) => {
    const response = await updateProductById(product);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (productId) => {
    const response = await deleteProduct(productId);
    return response.data;
  }
);


export const createProductReviewsAsync = createAsyncThunk(
  'product/createProductReviews',
  async (review) => {
    const response = await createProductReviews(review);
    return response.data;
  }
);

export const fetchProductReviewsByIdAsync = createAsyncThunk(
  'product/fetchProductReviewsById',
  async (productId) => {
    const response = await fetchProductReviewsById(productId);
    return response.data;
  }
);

export const fetchRelatedProductsAsync = createAsyncThunk(
  'product/fetchRelatedProducts',
  async (category) => {
    const response = await fetchRelatedProducts(category);
    return response.data;
  }
);
















export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductsArrayToNull: (state) => {
      state.products = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.count = action.payload.dataCount;
        state.products = action.payload.data;
      })
      .addCase(fetchAllCategoriessAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriessAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.count = action.payload.dataCount;
        state.products = action.payload.data;
      })
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.detailStatus = 'loading';
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        state.detailStatus = 'idle';
        state.details = action.payload;
      })
      .addCase(updateProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.products.findIndex((e) => e._id === action.payload._id);
        state.products.splice(index, 1, action.payload);
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.products.findIndex((e) => e._id === action.payload._id);
        state.products.splice(index, 1);
      })
      .addCase(fetchProductReviewsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductReviewsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reviews = action.payload;
      })
      .addCase(createProductReviewsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductReviewsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reviews.push(action.payload);
      })
      .addCase(fetchRelatedProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.relatedProducts = (action.payload);
      })
  },
});






export const { setProductsArrayToNull } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectDetails = (state) => state.product.details;
export const selectProductsCount = (state) => state.product.count;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectReviews = (state) => state.product.reviews;
export const selectrelatedProducts = (state) => state.product.relatedProducts;
export const selectDetailStatus = (state) => state.product.detailStatus;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
