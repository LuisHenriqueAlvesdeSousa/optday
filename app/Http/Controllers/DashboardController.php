<?php
 
namespace App\Http\Controllers;
 
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
 
class DashboardController extends Controller
{
    /**
     * Provision a new web server.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $habits = Auth::user()->habits;
        $objective = 0;
        $finished = 0;
        $habWeek = 0;
        $habPlus = 0;
        $percentageToday = 0;
        $improvement = 0;
        $dayOfWeek = date('w');

        if($dayOfWeek == 0){
            $dayOfWeek = 7;
        }

        function getTasks($habit, $dayOfWeek){
            $today = date('Y-m-d');
            $habit->tasks = DB::select('select * 
                                        from tasks
                                        where periodicity like "%'.$dayOfWeek.'%"
                                        and habit_id = "'.$habit->id.'"
                                        and id not in (select task_id
                                                            from daily_goals
                                                            where date  like "'. $today . '%") ');
                
            
        }

        function getCountTasks($dayOfWeek){
            $n = DB::select('select count(id) as "number"
                                from tasks
                                where periodicity like "%'.$dayOfWeek.'%"
                                and habit_id in (select id
                                                    from habits
                                                    where user_id = "'.Auth::user()->id.'")');
            return $n[0]->number;
        }

        function getTotalTasks(){
            $n = DB::select('select count(id) as "number"
                                from tasks
                                where habit_id in (select id
                                                    from habits
                                                    where user_id = "'.Auth::user()->id.'")');
            return $n[0]->number;
        }

        function getTotalTaskWeek(){
            $n = DB::select('select sum(length(periodicity)) as "number"
                                from tasks
                                where habit_id in (select id
                                                    from habits
                                                    where user_id = "'.Auth::user()->id.'")');
            return $n[0]->number;
        }
        
        $objective = getCountTasks($dayOfWeek);
        $habPlus = getTotalTasks() * 7;
        $habWeek = getTotalTaskWeek();

        foreach ($habits as $habit) {
            getTasks($habit, $dayOfWeek);
            $finished =  $finished + count($habit->tasks);
        }

        if($objective != 0){
            $percentageToday = 100 - round($finished / $objective * 100, 1);
        }

        if($habPlus != 0){
            $improvement = 100 - round($habWeek / $habPlus * 100, 1);
        }

        return Inertia::render('Dashboard', ['habits' => $habits, 'percentageToday' =>$percentageToday,'improvement' => $improvement]);

    }

}