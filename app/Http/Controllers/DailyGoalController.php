<?php

namespace App\Http\Controllers;

use App\Models\DailyGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DailyGoalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dailyGoals= DailyGoal::all();
        return Inertia::render('DailyGoal/Index', ['dailyGoals' => $dailyGoals]);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $date = now();

        DB::table('daily_goals')
            ->insert([
                'task_id' => $request->dailyGoalId,
                'date' => $date
            ])
        ;
        
        return redirect(route('dashboard'));

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DailyGoal  $dailyGoal
     * @return \Illuminate\Http\Response
     */
    public function show(DailyGoal $dailyGoal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DailyGoal  $dailyGoal
     * @return \Illuminate\Http\Response
     */
    public function edit(DailyGoal $dailyGoal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DailyGoal  $dailyGoal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DailyGoal $dailyGoal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DailyGoal  $dailyGoal
     * @return \Illuminate\Http\Response
     */
    public function destroy(DailyGoal $dailyGoal)
    {
        //
    }
}
