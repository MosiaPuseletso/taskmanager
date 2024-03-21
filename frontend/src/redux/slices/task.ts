import { createSlice } from "@reduxjs/toolkit";

import { fetchTasks, deleteTask, updateTask } from "@/src/api";

interface Task {
    id: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    title: string;
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] as Task[], edit: false },
    reducers: {
        updateEdit: (state, action) => {
            state.edit = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
        }).addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(task => task['id'] !== action.payload['id']);
        }).addCase(updateTask.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.tasks = state.tasks.map((task) => {
                if (task.id === updatedTask.id) {
                    task = {
                        ...task,
                        description: updatedTask.description || task.description,
                        dueDate: updatedTask.dueDate || task.dueDate,
                        priority: updatedTask.priority || task.priority,
                        status: updatedTask.status || task.status,
                        title: updatedTask.title || task.title,
                    };
                }
                return task;
            });
        });
    }
});

export const { updateEdit } = taskSlice.actions;
export default taskSlice;