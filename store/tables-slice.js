import {createSlice} from '@reduxjs/toolkit';

const tablesInitialState = {
    tableList: [],
    tableHistory: {}
}

//TODO: Remove token from state?

const tablesSlice = createSlice({
    name: 'tables',
    initialState: tablesInitialState,
    reducers: {
        setTables(state, actions) {
            state.tableList = [...actions.payload]
        },
        setHistory(state, actions) {
            state.tableHistory[actions.payload.table_id] = [...actions.payload.round_outcomes]
        },
    }
})

export const tablesActions = tablesSlice.actions;
export default tablesSlice;
