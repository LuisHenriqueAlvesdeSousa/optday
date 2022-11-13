import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    
    const { tasks } = usePage().props;

    const handleTaskEdit = () => {
        window.location.replace(route("tasks.edit",  e.currentTarget.id));
    }

    const handleTaskDelete = (e) =>{
        Inertia.delete(route('tasks.destroy', e.currentTarget.id));
    }

    const handleTaskCreate = () =>{
        window.location.replace(route('tasks.create'));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <p>Task index</p>


                            <button 
                                    type="button" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleTaskCreate}
                            >
                                Task Create
                            </button>

                            <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 w-20">ID</th>
                                            <th className="px-4 py-2">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map(({ id, name}) => (
                                            <tr>
                                                <td className="border px-4 py-2">{ id }</td>
                                                <td className="border px-4 py-2">{ name }</td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route("tasks.edit", id)}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={handleTaskDelete}
                                                        id={id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
    
                                        {tasks.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 border-t"
                                                    colSpan="4"
                                                >
                                                    No contacts found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}