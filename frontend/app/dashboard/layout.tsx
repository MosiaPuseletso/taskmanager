'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8 px-2" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">Task Manager</span>
                    </div>
                    <div className="lg:flex lg:gap-x-12 flex-wrap">
                        <Link href="/dashboard" className={`text-sm font-semibold leading-6 text-gray-900 hover:underline px-2 py-1 rounded-md ${pathname === '/dashboard' ? 'bg-gray-100 font-bold' : ''}`}>Create Task</Link>
                        <Link href="/dashboard/tasks" className={`text-sm font-semibold leading-6 text-gray-900 hover:underline px-2 py-1 rounded-md ${pathname === '/dashboard/tasks' ? 'bg-gray-100 font-bold' : ''}`}>View Tasks</Link>
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </nav>
            </header>
            <div className="py-32 sm:py-48 lg:pt-[10rem] lg:pb-8">
                {children}
            </div>
        </>
    )
}