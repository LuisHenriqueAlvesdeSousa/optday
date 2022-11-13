import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, InertiaLink } from '@inertiajs/inertia-react';

export default function Index(props) {

    const handleTaskEdit = () => {
        window.location.replace(route("tasks.edit", props.auth));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <p>Task show</p>

                            <button 
                                    type="button" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleTaskEdit}
                            >
                                Task Edit
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}