"use client"

import { store } from "./store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

export default function StoreContainer({
    children
}: {
    children: ReactNode
}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}