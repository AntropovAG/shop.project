import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {IProduct, IProductFilterPayload} from "@Shared/types"
import axios from "axios";


interface ProductOverview {
    count?: number;
    sum?: number;
}

interface ProductsState {
    overview: ProductOverview | null;
    products: IProduct[];
    productById: IProduct;
}

export const fetchInfo = createAsyncThunk<
    ProductOverview,
    undefined,
    {
        rejectValue: { message: string; status: string | undefined };
    }
>("products/fetchInfo", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/products/overview");
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status?.toString(),
            });
        } else {
            return rejectWithValue({
                message: (err as Error).message,
                status: undefined,
            });
        }
    }
});

export const fetchProducts = createAsyncThunk<
    IProduct[],
    undefined,
    {
        rejectValue: { message: string; status: string | undefined };
    }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/products");
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status?.toString(),
            });
        } else {
            return rejectWithValue({
                message: (err as Error).message,
                status: undefined,
            });
        }
    }
});

export const fetchFilteredProducts = createAsyncThunk<
    IProduct[],
    IProductFilterPayload,
    {
        rejectValue: { message: string; status: string | undefined };
    }
>("products/fetchFilteredProducts", async (filter, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IProduct[]>("api/products/search", {
            params: filter,
        });
        return data || [];
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status?.toString(),
            });
        } else {
            return rejectWithValue({
                message: (err as Error).message,
                status: undefined,
            });
        }
    }
});

export const fetchProductById = createAsyncThunk<
    IProduct,
    string,
    {
        rejectValue: { message: string; status: string | undefined };
    }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IProduct>(`api/products/${id}`);
        return data || [];
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status?.toString(),
            });
        } else {
            return rejectWithValue({
                message: (err as Error).message,
                status: undefined,
            });
        }
    }
});

const initialState: ProductsState = {
    overview: {},
    products: [],
    productById: {} as IProduct,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // setSortingType(
        //     state,
        //     action: PayloadAction<"price" | "duration" | "optimal">
        // ) {
        //     state.currentSorting = action.payload;
        // },
        // sortTickets(state) {
        //     switch (state.currentSorting) {
        //         case "price":
        //             state.filteredTickets.sort((a, b) => a.price - b.price);
        //             break;
        //         case "duration":
        //             state.filteredTickets = sortByDuration(state.filteredTickets);
        //             break;
        //         case "optimal":
        //             state.filteredTickets.sort((a, b) => {
        //                 if (a.connectionAmount !== b.connectionAmount)
        //                     return a.connectionAmount - b.connectionAmount;
        //                 return a.price - b.price;
        //             });
        //             break;
        //         default:
        //             console.log('No sorting applied. Invalid sorting option:', state.currentSorting);
        //     }
        // },
        // setDisplayedFilters(
        //     state,
        //     action: PayloadAction<{
        //         connectionsFilter: number[];
        //         companyFilter: string[];
        //     }>
        // ) {
        //     const { connectionsFilter, companyFilter } = action.payload;
        //     state.displayedFilters = [];
        //     if (connectionsFilter.length !== 0) {
        //         state.displayedFilters.push(
        //             `Кол-во пересадок: ${connectionsFilter.join(", ")}`
        //         );
        //     } else {
        //         state.displayedFilters.push("любое кол-во пересадок");
        //     }
        //     if (companyFilter.length !== 0) {
        //         state.displayedFilters.push(
        //             `Авиакомпания: ${companyFilter.join(", ")}`
        //         );
        //     } else {
        //         state.displayedFilters.push("любая авиакомпания");
        //     }
        // },
        // filterTickets(
        //     state,
        //     action: PayloadAction<{
        //         connectionsFilter: number[];
        //         companyFilter: string[];
        //     }>
        // ) {
        //     const { connectionsFilter, companyFilter } = action.payload;
        //     state.filteredTickets = state.tickets.filter(
        //         (ticket) =>
        //             (!connectionsFilter.length ||
        //                 connectionsFilter.includes(ticket.connectionAmount)) &&
        //             (!companyFilter.length || companyFilter.includes(ticket.company))
        //     );
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchInfo.fulfilled,
            (state, action) => {
                state.overview = action.payload;
            }
        )
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            console.log("Filtered products fetched:", action.payload);
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.productById = action.payload;
        });
    },
});

// export const {} = productsSlice.actions;
export default productsSlice.reducer;
