import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Inertia } from "@inertiajs/inertia";
import { Head , Link, useForm} from '@inertiajs/inertia-react';

export default function Edit(props) {

    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        lastname: '',
        date_of_bith: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleBack = () => {
        window.location.replace(route('users.show', props.auth));
    }

    const handleUserUpdate = (e) => {
        e.preventDefault();
        put(route('users.update', props.auth));
    }

    const handleUserDelete = () => {
        Inertia.delete(route('users.destroy', props.auth));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Edit</h2>}
        >
            <Head title="User Edit" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <p>User Edit</p>

                            <form onSubmit={handleUserUpdate}>
                                <div>
                                    <InputLabel forInput="name" value="Name" />

                                    <TextInput
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="Lastname" value="Lastname" />

                                    <TextInput
                                        type="text"
                                        name="lastname"
                                        value={data.lastname}
                                        className="mt-1 block w-full"
                                        autoComplete="lastname"
                                        handleChange={onHandleChange}
                                        required
                                    />

                                    <InputError message={errors.lastname} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="date_of_birth" value="Date of birth" />

                                    <TextInput
                                        type="date"
                                        name="date_of_birth"
                                        value={data.date_of_birth}
                                        className="mt-1 block w-full"
                                        autoComplete="date_of_birth"
                                        handleChange={onHandleChange}
                                        required
                                    />

                                    <InputError message={errors.date_of_birth} className="mt-2" />
                                </div>

                                <button 
                                    type="submit" 
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleUserUpdate}
                                >
                                    Update
                                </button>
                            </form>

                            <button 
                                    type="button" 
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleBack}
                            >
                                Back
                            </button>

                            <button 
                                    type="button" 
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleUserDelete}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}