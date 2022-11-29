import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , useForm, usePage } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

    const { habits, percentageToday, improvement} = usePage().props;

    const {data, setData, post} = useForm({
        name: '',
        habitId: habits[0].id,
        dailyGoalId: '',
        taskFinish: '',
        ExceptionFinish: false
    });

    function setDailyGoalId(e){
        e.preventDefault();
        setData({
            dailyGoalId : e.target.id,
            taskFinish : e.target.value
        });
    }

    const handleGoalStore = (e) => {
        e.preventDefault();
        if(data.taskFinish == '' || data.taskFinish == null){
            setData({
                ExceptionFinish : true
            })
        }else{
            setData({
                ExceptionFinish : false
            })

            post(route('dailygoals.store'));
        }
    }

    const handleTaskCreate = () => {
        window.location.replace(route('tasks.create'));
    }

    const ProgressBarProgress = ( progressPercentage ) => {
        return (
            <div className='h-1 w-full bg-gray-300'>
                <div
                    style={{ width: `${progressPercentage}%`}}
                    className={`h-full ${
                        progressPercentage > 80 ? 'bg-green-600' : 'bg-red-600'}`}>
                </div>
            </div>
        );
    };

    const ProgressBarImprovement = ( progressPercentage ) => {
        return (
            <div className='h-1 w-full bg-gray-300'>
                <div
                    style={{ width: `${progressPercentage}%`}}
                    className={`h-full ${
                        progressPercentage < 20 ? 'bg-green-600' : 'bg-red-600'}`}>
                </div>
            </div>
        );
    };
   
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
                            
                            <div className='mb-3'>
                                <div>
                                    <h2 className='text-lg text-center mb-2'>Objectives: {percentageToday}%</h2>
                                    { ProgressBarProgress(percentageToday) }
                                </div>
                                <div>
                                    <h2 className='text-lg text-center my-2'>Improvement: +{improvement}%</h2>
                                    { ProgressBarImprovement(improvement) }
                                </div>
                            </div>
                            <button 
                                        type="button" 
                                        class="text-white w-full mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        onClick={handleTaskCreate}
                                >
                                    New task
                            </button>
                            <button 
                                type="button"
                                
                                onClick={handleGoalStore}
                                className=" w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-greens-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            >
                                Finish {(data.taskFinish) ? (data.taskFinish) : ('task')}
                            </button>

                            {(data.ExceptionFinish) ? (<p className='text-red-700 mt-2 text-center text-sm'>Please, first select the task that you want finish.</p>):null}
                            
                            <div>
                                <div>
                                    <div>
                                        {habits.map((habit) => (
                                            <div className="p-6 bg-white border-b border-blue-200">
                                                <p className='text-center text-xl mb-2 text-blue-500 capitalize'>{habit.name}</p>
                                                <ul>
                                                    {habit.tasks.map((task) => (
                                                        <li
                                                            className='mb-4'
                                                        >
                                                            <div id={'task'.concat(task.id)}></div>
                                                            <button 
                                                                type="button"
                                                                id={task.id}
                                                                value={task.name}
                                                                onClick={setDailyGoalId}
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 mt-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            >
                                                                Select
                                                             </button>
                                                             <span>{task.name}</span>
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
