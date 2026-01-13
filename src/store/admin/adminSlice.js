import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: "",
    name: "",
    email: "",
    role: "",
    permissions: []
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            if (!action.payload) return;
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
            state.permissions = action.payload.permissions
        }
    }
})

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer