import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Index(props) {


    const handleUserEdit = () => {
        window.location.replace(route("users.edit", props.auth));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil</h2>}
        >
            <Head title="Perfil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <span>Perfil Data</span>
                            <ul>
                                <li>Name: {props.user.name}</li>
                                <li>Lastname: {props.user.lastname}</li>
                                <li>Date of birth: {props.user.date_of_birth}</li>
                                <li>Email: {props.user.email}</li>
                            </ul>

                            <button 
                                    type="button" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleUserEdit}
                            >
                                Perfil Edit
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}