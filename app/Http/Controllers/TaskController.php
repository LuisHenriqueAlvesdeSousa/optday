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
        DB::table('tasks')
            ->insert([
                'habit_id' => $request->habitId,
                'name' => $request->name,
                //'periodity' => ''
            ])
        ;

        return redirect()->route('tasks.index');
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
