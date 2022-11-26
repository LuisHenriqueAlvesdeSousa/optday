<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Habit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $habits = Auth::user()->habits;
        $tasks = [];
        foreach ($habits as $habit) {
            $taskList = $habit->tasks;
            foreach ($taskList as $task) {
                array_push($tasks, $task);
            }
        }

        //$tasks = Task::all();
        

        return Inertia::render('Task/Index', ['tasks' => $tasks]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user_id = Auth::user()->id;

        $habits = DB::table('habits')
                        ->where('user_id', '=', $user_id)
                        ->get()
                    ;
        return Inertia::render('Task/Create', ['habits' => $habits]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $periodity = '';

        if ($request->cbMonday != null) {
            $periodity = $periodity . '1';
        }

        if ($request->cbTuesday != null) {
            $periodity = $periodity . '2';
        }

        if ($request->cbWednesday != null) {
            $periodity = $periodity . '3';
        }

        if ($request->cbThursday != null) {
            $periodity = $periodity . '4';
        }

        if ($request->cbFriday != null) {
            $periodity = $periodity . '5';
        }

        if ($request->cbSaturday != null) {
            $periodity = $periodity . '6';
        }

        if ($request->cbSunday != null) {
            $periodity = $periodity . '7';
        }

        DB::table('tasks')
            ->insert([
                'habit_id' => $request->habitId,
                'name' => $request->name,
                'periodicity' => $periodity
            ])
        ;

        $redirect = $request->redirect;

        return redirect()->route($redirect);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $task = Task::find($id);

        return Inertia::render('Task/Edit', ['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Task::find($id)
            ->update([
                'name' => $request->name
            ])
        ;

        return redirect()->route('tasks.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::find($id)->delete();
        return redirect()->route('tasks.index');
    }
}
