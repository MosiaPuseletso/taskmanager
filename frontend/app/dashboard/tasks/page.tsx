"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";

import CreateTask from "../page";

import { updateEdit } from "@/src/redux/slices/task";
import { deleteTask, fetchTasks } from "@/src/api";

export default function Tasks() {

    const [editing, setEditing] = useState(null);
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const user = useSelector((state: RootState) => state.user);

    const formatDate = (isoDate: any) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const editTask = (task: any) => {
        setEditing(task);
        dispatch(updateEdit(true));
    }

    const taskDelete = (id: string) => {
        dispatch(deleteTask({id, token: user.token}));
    }

    useEffect(() => {
        dispatch(fetchTasks({ token: user.token }));
    }, [])

    return (
        <>
            {tasks.edit ? (
                <CreateTask props={editing} />
            ) : (
                <ul style={{ display: 'flex',justifyContent: "center", flexWrap: "wrap", rowGap: '2rem', columnGap: '1.5rem' }}>
                    {
                        tasks && tasks.tasks && tasks.tasks.map((task) => (
                            <li key={task['id']} style={{ borderColor: 'rgba(229, 231, 235, var(--tw-border-opacity))', borderWidth: '1px', borderRadius: '0.75rem', overflow: 'hidden', width: '400px' }}>
                                <div style={{ padding: '1.5rem', backgroundColor: 'rgba(249, 250, 251, var(--tw-bg-opacity))', borderColor: 'rgba(17, 24, 39, 0.05)', borderBottomWidth: '1px', columnGap: '1rem', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ color: 'rgba(17, 24, 39, var(--tw-text-opacity))', lineHeight: '1.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                        {task['title']}
                                    </div>
                                    <div style={{ marginLeft: 'auto', position: 'relative' }}>
                                        <div className="flex items-center justify-end gap-x-6 mx-auto max-w-2xl">
                                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-10" onClick={() => editTask(task)}>Edit</button>
                                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 z-10" onClick={() => taskDelete(task['id'])}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 mt-2 ml-[1.5rem] mr-[1.5rem]">{task['description']}</div>
                                <dl style={{ lineHeight: '1.5rem', fontSize: '0.875rem', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', marginTop: '-0.75rem', marginBottom: '-0.75rem' }}>
                                    <div style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', columnGap: '1rem', justifyContent: 'space-between', display: 'flex' }}>
                                        <dt style={{ color: 'rgba(107, 114, 128, var(--tw-text-opacity))' }}>
                                            Due date
                                        </dt>
                                        <dd style={{ color: 'rgba(55, 65, 81, var(--tw-text-opacity))' }}>
                                            <time dateTime={task['dueDate']}>{formatDate(task['dueDate'])}</time>
                                        </dd>
                                    </div>
                                    <div style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', columnGap: '1rem', justifyContent: 'space-between', display: 'flex' }}>
                                        <dt style={{ color: 'rgba(107, 114, 128, var(--tw-text-opacity))' }}>
                                            Priority
                                        </dt>
                                        <dd style={{ color: 'rgba(55, 65, 81, var(--tw-text-opacity))' }}>
                                            <time dateTime="2022-12-13">{task['priority']}</time>
                                        </dd>
                                    </div>
                                    <div style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', columnGap: '1rem', justifyContent: 'space-between', display: 'flex' }}>
                                        <dt style={{ color: 'rgba(107, 114, 128, var(--tw-text-opacity))' }}>
                                            Status
                                        </dt>
                                        <dd style={{ color: 'rgba(55, 65, 81, var(--tw-text-opacity))' }}>
                                            <time dateTime="2022-12-13">{task['status']}</time>
                                        </dd>
                                    </div>
                                </dl>
                            </li>
                        ))
                    }
                </ul>
            )}
        </>
    )
}