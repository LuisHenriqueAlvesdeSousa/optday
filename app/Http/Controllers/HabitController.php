<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $habits = Auth::user()->habits;
        return Inertia::render('Habit/Index', ['habits' => $habits]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Habit/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userId = Auth::user()->id;

        DB::table('habits')
            ->insert([
                'user_id' => $userId,
                'name' => $request->name
            ])
        ;

        return redirect()->route('habits.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Habit  $habit
     * @return \Illuminate\Http\Response
     */
    public function show(Habit $habit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Habit  $habit
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $habit = Habit::find($id);

        return Inertia::render('Habit/Edit', [ 'habit' => $habit]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Habit  $habit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Habit::find($id)
            ->update([
                'name' => $request->name
            ])
        ;

        return redirect()->route('habits.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Habit  $habit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Habit::find($id)->delete();
        return redirect()->route('habits.index');
    }
}
