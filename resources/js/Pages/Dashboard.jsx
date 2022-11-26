import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , useForm, usePage, Link} from '@inertiajs/inertia-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Dashboard(props) {

    const { habits, goals} = usePage().props;

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };


    const handleTaskStore = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    }

    const getDate = () => {
        var now = new Date();
        var month = (now.getMonth() + 1);               
        var day = now.getDate();
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;
        return today;
    }

    const {data, setData, post, errors} = useForm({
        today : getDate(),
        name: '',
        habitId: ''/*habits[0].id*/,
        redirect: 'dashboard',
        dailyGoalId: '',
        taskFinish: ''
    });

    function setDailyGoalId(e){
        e.preventDefault();
        setData({
            dailyGoalId : e.target.id,
            taskFinish : e.target.value
        });
        alert(data.dailyGoalId);
    }

    const handleGoalStore = (e) => {
        alert(data.dailyGoalId);
        post(route('dailygoals.store'));
    }

    const handleTaskCreate = () => {

    }
    

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>foto</div>
                            <div>
                                <div>porcentaje del dia</div>
                                <div>porcentaje de mejora</div>
                            </div>
                            <div><input type="date" defaultValue={data.today}/></div>
                            <button 
                                    type="button" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={handleTaskCreate}
                            >
                                New task
                            </button>
                            <div id="newTaskContainer">
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
                            <button 
                                type="button"
                                
                                onClick={handleGoalStore}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Finish {data.taskFinish}
                            </button>
                            
                            <div>
                                <div>
                                    <div>
                                        {habits.map((habit) => (
                                            <div className="p-6 bg-white border-b border-blue-200">
                                                <p>{habit.name}</p>
                                                <p>{}</p>
                                                <ul>
                                                    {habit.tasks.map((task) => (
                                                        <li
                                                            className='mb-4'
                                                        >{/*
                                                            <Link
                                                                tabIndex="1"
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                                href={route("dailygoals.store", task.id)}
                                                            >
                                                                Edit
                                                            </Link>*/}
                                                            <div id={'task'.concat(task.id)}></div>
                                                            <button 
                                                                type="button"
                                                                id={task.id}
                                                                value={task.name}
                                                                onClick={setDailyGoalId}
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            >
                                                                Complet
                                                             </button>
                                                             {task.name}
                                                             {task.periodicity}
                                                            {/*
                                                                goals.forEach(goal => {
                                                                    if (goal.task_id == task.id) {
                                                                        <>
                                                                        <p>{goal.id}</p>
                                                                        <p>{goal.date}</p>
                                                                        </>
                                                                    }
                                                                })*/
                                                            }
                                                            {
                                                                goals.map((goal) => (

                                                                    (goal.task_id == task.id)?(
                                                                        <>
                                                                        <p>{goal.id}</p>
                                                                        <p>{goal.task_id}</p>
                                                                        <p>{goal.date}</p>
                                                                        </>
                                                                    ): null
                                                                ))
                                                            }
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
