import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: {
            reset: (state) => initialState
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

//create new goal
export const createGoal = createAsyncThunk('goals/create',
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            // here thunkAPI has access to all the data from all the files and we can use data wherever we want using this thunkAPI here
            // here we are using getState method of thunkAPI which will get state from any file and here we are getting state of auth and inside auth we have got a user which has a token stored in localStorage which we are gonna pass in this
            return await goalService.createGoal(goalData, token)
    }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// get you goals
export const getGoals = createAsyncThunk('goals/getAll', 
    async(_,thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getGoals(token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const { reset } = goalSlice.actions
export default goalSlice.reducer