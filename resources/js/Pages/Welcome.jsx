import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link , Head} from '@inertiajs/inertia-react';



export default function Welcome(props) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const handleLogin = () => {
        window.location.replace(route("login"));
    }

    const handleRegister = () => {
        window.location.replace(route("register"));
    }

    return (
        <>
        <Head title="Welcome" />

        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link>
                            </div>
                            
                                {props.auth.user ? (
                                        <>
                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            Dashboard
                                        </NavLink>
                                        </div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('users.show', props.auth)} active={route().current('users.show')}>
                                            Perfil
                                        </NavLink>
                                        </div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('habits.index')} active={route().current('habits.index')}>
                                            Habits
                                        </NavLink>
                                        </div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('tasks.index')} active={route().current('tasks.index')}>
                                            Tasks
                                        </NavLink>
                                        </div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('dailygoals.index')} active={route().current('dailygoals.index')}>
                                            Goals
                                        </NavLink>
                                        </div>
                                        </>
                                    ):(
                                        <div className="pt-4 md:p-5 text-center md:text-left space-y-3">
                                            <span className="text-lg font-large font-semibold">OptDay</span>
                                        </div>
                                        
                                    )
                                }
                            
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {props.auth.user ? (
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <span className="inline-flex rounded-md">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                            >
                                                                {props.auth.user.name}

                                                                <svg
                                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </Dropdown.Trigger>

                                                    <Dropdown.Content>
                                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                                            Log Out
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                ):(
                                    <>
                                        <button 
                                            type="button" 
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2.5 mb-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </button>
                                        <button 
                                            type="button" 
                                            class="py-2 px-5 mr-2 mb-1.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            onClick={handleRegister}
                                        >
                                                Register
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    {props.auth.user ? (
                                    <>
                                        <div className="pt-2 pb-3 space-y-1">
                                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                                Dashboard
                                            </ResponsiveNavLink>
                                        </div>

                                        <div className="pt-2 pb-3 space-y-1">
                                            <ResponsiveNavLink href={route('users.show', props.auth)} active={route().current('users.show')}>
                                                Perfil
                                            </ResponsiveNavLink>
                                        </div>

                                        <div className="pt-2 pb-3 space-y-1">
                                            <ResponsiveNavLink href={route('habits.index')} active={route().current('habits.index')}>
                                                Habits
                                            </ResponsiveNavLink>
                                        </div>

                                        <div className="pt-2 pb-3 space-y-1">
                                            <ResponsiveNavLink href={route('tasks.index')} active={route().current('tasks.index')}>
                                                Tasks
                                            </ResponsiveNavLink>
                                        </div>

                                        <div className="pt-2 pb-3 space-y-1">
                                            <ResponsiveNavLink href={route('dailygoals.index')} active={route().current('dailygoals.index')}>
                                                Goals
                                            </ResponsiveNavLink>
                                        </div>

                                        <div className="pt-4 pb-1 border-t border-gray-200">
                                            <div className="px-4">
                                                <div className="font-medium text-base text-gray-800">nombre usuario</div>
                                                <div className="font-medium text-sm text-gray-500">email usuario</div>
                                            </div>
                    
                                            <div className="mt-3 space-y-1">
                                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                    Log Out
                                                </ResponsiveNavLink>
                                            </div>
                                        </div>
                                    </>
                    ):(
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('login')} active={route().current('dashboard')}>
                                Login
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')} active={route().current('dashboard')}>
                                Register
                            </ResponsiveNavLink>
                        </div>
                    )}

                </div>
            </nav>

            
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <div>puesta de sol</div>
                                <div>
                                    OptDay
                                </div>
                                <div>
                                    <div>Agenda Rutina</div>
                                    <div>Mejora tu productividad y aumenta el crecimiento personal</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    libro de filosofia
                                </div>
                                <div>
                                    Desarrollarse al maximo como persona
                                </div>
                                <div>
                                    La filosofia se basa en mejorar 1% cada dia. Definimos nuestra rutina actual para valorar nuestros habitos y construir nuevos adapatados a nuestra rutina.
                                </div>
                            </div>
                                <div>
                                    areas de productividad
                                </div>
                                <div>
                                    circulos individual, social, material
                                </div>
                                <div>
                                    Nos fundamentamos en crecer en tus areas del dia a dia.
                                </div>
                                <div>
                                    <div>chica</div>
                                    <div>individual</div>
                                    <div>
                                        Somos la base de nuestro sia, tener buenos habitos diarios individuales nos proporcionara mayor sensaci??n de mejora.
                                    </div>
                                    <div>Algunos habitos individuales:</div>
                                    <ul>
                                        <li>Estuido</li>
                                        <li>Trabajo</li>
                                        <li>cuidado personal</li>
                                        <li>deporte</li>
                                        <li>nutricion</li>
                                        <li>meditacion</li>
                                        <li>proyectos personales</li>
                                        <li>busqueda de empleo</li>
                                    </ul>
                                </div>
                                <div>
                                    <div>tres personas</div>
                                    <div>social</div>
                                    <div>
                                        Compartir el pensamiento que las personas son lo mas importante en nuestro dia a dia.
                                    </div>
                                    <div>Pilares sociales</div>
                                    <ul>
                                        <li>familia</li>
                                        <li>amigos</li>
                                        <li>desconocidos</li>
                                    </ul>
                                </div>
                                <div>
                                    <div>casa</div>
                                    <div>material</div>
                                    <div>
                                        Construir y cuidar lo material nos permite valorar los objetos cotidianos que nos rodean.
                                    </div>
                                </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
)}