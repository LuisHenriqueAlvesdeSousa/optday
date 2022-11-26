import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Inertia } from "@inertiajs/inertia";
import { Head , Link, usePage, useForm} from '@inertiajs/inertia-react';


export default function Edit(props) {

    const { habits } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        habitId: habits[0].id,
        redirect: 'tasks.index',
        cbMonday: null,
        cbTuesday: null,
        cbWednesday: null,
        cbThursday: null,
        cbFriday: null,
        cbSaturday: null,
        cbSunday: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleTaskStore = (e) => {
        
        e.preventDefault();
        post(route('tasks.store'));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Create</h2>}
        >
            <Head title="Habit Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <p>Task Create</p>

                            <form onSubmit={handleTaskStore}>
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
                                        
                                          <div className="relative w-full lg:max-w-sm">
                                            <select name="habitId" onClick={onHandleChange} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                                                {habits.map((habit) => (
                                                    <option value={habit.id}>{habit.name}</option>
                                                ))}
                                                
                                            </select>
                                        </div>

                                    <div className="ml-3 block w-full">
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbMonday" id="cbMonday" onChange={onHandleChange}/><span className="ml-2">Monday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbTuesday" id="cbTuesda" onChange={onHandleChange}/><span className="ml-2">Tuesday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbWednesday" id="cbWednesday" onChange={onHandleChange}/><span className="ml-2">Wednesday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbThursday" id="cbThursday" onChange={onHandleChange}/><span className="ml-2">Thursday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbFriday" id="cbFriday" onChange={onHandleChange}/><span className="ml-2">Friday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                            <input type="checkbox" name="cbSaturday" id="cbSaturday" onChange={onHandleChange}/><span className="ml-2">Saturday</span>
                                        </div>
                                        <div className="mt-1 block w-full">
                                          <input type="checkbox" name="cbSunday" id="cbSunday" onChange={onHandleChange}/><span className="ml-2">Sunday</span>
                                        </div>
                                    </div>

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <button 
                                    type="submit" 
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Create
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}