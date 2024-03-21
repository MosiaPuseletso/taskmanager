import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:5000/';

export const createAccount = createAsyncThunk('create-account', async (account: any) => {
    try {
        const { data } = await axios.post(URL + "users/create", account);
        return data;
    } catch (error) {
        return error;
    }
});

export const authAccount = createAsyncThunk('auth-account', async (account: any) => {
    try {
        const { data } = await axios.post(URL + "users/auth", account);
        return data;
    } catch (error) {
        return error;
    }
});

export const fetchTasks = createAsyncThunk('fetch-tasks', async (token: any) => {
    try {
        const { data } = await axios.get(URL + "tasks/fetch", {
            headers: {
                "token": token['token']
            }
        });
        return data;
    } catch (error) {
        return error;
    }
});

export const createTask = createAsyncThunk('create-task', async (task: any) => {
    try {
        const { data } = await axios.post(URL + "tasks/create", task);
        return data;
    } catch (error) {
        return error;
    }
});

export const deleteTask = createAsyncThunk('delete-task', async ({ id, token }: { id: string, token: any }) => {
    try {
        const { data } = await axios.delete(URL + `tasks/delete/${id}`, {
            headers: {
                "token": token
            }
        });
        return data;
    } catch (error) {
        return error;
    }
});

export const updateTask = createAsyncThunk('update-task', async ({ task, token }: { task: any; token: any }) => {
    try {
        const { data } = await axios.put(URL + "tasks/update", task, {
            headers: {
                "token": token
            }
        });
        return data;
    } catch (error) {
        return error;
    }
});