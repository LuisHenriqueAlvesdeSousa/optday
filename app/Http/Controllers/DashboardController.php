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
        $dayOfWeek = date('w');
        $today = date('Y-m-d');

        $habits = Auth::user()->habits;

        /*
        $habits = DB::table('habits')
                    ->where('user_id', '=', Auth::user()->id)
                    ->whereIn('id', function ($query) {
                        $dayOfWeek = '%'.(date('w') + 1).'%';
                        $query->select('habit_id')
                            ->from('tasks')
                            ->whereColumn('tasks.habit_id', 'habits.id');
                            ->where('periodicity', 'like', $dayOfWeek);
                    })->get();
        */
        
        /*
        $habits = DB::select('select *
                                from habits
                                where user_id = '. Auth::user()->id .'
                                and id in ( select habit_id
                                                from tasks
                                                where periodicity like "%'.$dayOfWeek.'%")'
                            );
        */

        /*
        $tasks = DB::select('select *
                            from tasks
                            where periodicity like "%'.$dayOfWeek.'%"'
                            );

        */

        /*
        $habits = [];
        foreach ($listHabits as $habit) {
            $taskList = $habit->tasks;
            foreach ($taskList as $task) {
                if(str_contains($task->periodicity, $dayOfWeek)){
                    array_push($habits, $habit);
                }
            }
        }
        */

        //$habits = [];
        //$cont = 0;
        foreach ($habits as $habit) {
            //$taskList = $habit->tasks;
            /*$taskList = [];
            */
            $habit->tasks = DB::select('select * 
                                        from tasks
                                        where periodicity like "%'.$dayOfWeek.'%"
                                        and habit_id = "'.$habit->id.'"
                                        and id not in (select task_id
                                                            from daily_goals
                                                            where date  like "'. $today . '%") ');

        }
        
    $goals = DB::select('select * 
                        from daily_goals 
                        where date like "'. $today . '%"
                        and task_id in (select id
                                            from tasks
                                            where habit_id in (select id
                                                                from habits
                                                                where user_id  = '. Auth::user()->id .'
                                                                )
                                            and periodicity like "%'.$dayOfWeek.'%"
                                        )
                        ');



        
    return Inertia::render('Dashboard', ['habits' => $habits, 'goals' => $goals]);

    }

}