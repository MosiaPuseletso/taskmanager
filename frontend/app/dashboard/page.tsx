"use client";

import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";

import { updateEdit } from "@/src/redux/slices/task";
import { createTask, updateTask } from "@/src/api";

export default function CreateTask(props: any) {

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [task, setTask] = useState({
        id: props && props.props && props.props.id || '',
        title: props && props.props && props.props.title || '',
        description: props && props.props && props.props.description || '',
        dueDate: props && props.props && props.props.dueDate || '',
        priority: props && props.props && props.props.priority || 'low',
        status: props && props.props && props.props.status || 'pending',
    });

    const formattedDueDate = (props && props.props && props.props.dueDate) ? props.props.dueDate.split('T')[0] : '';

    const cancelEdit = () => {
        dispatch(updateEdit(false));
    }

    const taskChange = (event: any) => {
        const { name, value } = event.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    }

    useEffect(() => {
        const form = document.querySelector("form");

        const handleSubmit = (event: any) => {
            event.preventDefault();
            if ((props && props.props && props.props.title)) {
                dispatch(updateTask({ task, token: user.token })).then(() => {
                    setTask({
                        id: '',
                        title: '',
                        description: '',
                        dueDate: '',
                        priority: 'low',
                        status: 'pending'
                    });
                    cancelEdit();
                });
            } else {
                dispatch(createTask(task)).then(() => {
                    setTask({
                        id: '',
                        title: '',
                        description: '',
                        dueDate: '',
                        priority: 'low',
                        status: 'pending'
                    });
                });
            }
        };

        form?.addEventListener("submit", handleSubmit);

        return () => {
            form?.removeEventListener("submit", handleSubmit);
        };
    }, [dispatch, task]);

    return (
        <form>
            <div className="space-y-12 mx-auto max-w-2xl">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4 z-10">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        value={task.title}
                                        onChange={taskChange}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full z-10">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={task.description}
                                    onChange={taskChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-5">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Task Information</h2>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4 z-10">
                            <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">Due date</label>
                            <div className="mt-2">
                                <input id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    autoComplete="date"
                                    value={task.dueDate}
                                    onChange={taskChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 z-10"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 z-10">
                            <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">Priority</label>
                            <div className="mt-2">
                                <select
                                    id="priority"
                                    name="priority"
                                    autoComplete="priority"
                                    value={task.priority}
                                    onChange={taskChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="low">low</option>
                                    <option value="medium">medium</option>
                                    <option value="high">high</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3 z-10">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    autoComplete="status"
                                    value={task.status}
                                    onChange={taskChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="pending">pending</option>
                                    <option value="busy">busy</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mx-auto max-w-2xl">
                {!(props && props.props && props.props.title) ? '' : (
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900 z-10" onClick={cancelEdit}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-10">
                    {!(props && props.props && props.props.title) ? 'Save' : ('Update')}
                </button>
            </div>
        </form>
    )
}