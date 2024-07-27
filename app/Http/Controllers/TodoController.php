<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        return Inertia::render('Todos/Index', ['todos' => $todos]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Todos/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Todo::create([
            'title' => $request->title,
        ]);

        return redirect(route('todos.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        if ($request->title) {
            $todo->title = $request->title;
            $todo->save();
            return Redirect::route('todos.index');
        }
        if ($todo->title) {
            $todo->status = $todo->status === 'pending' ? 'completed' : 'pending';
            $todo->title = $todo->title;
            $todo->save();
            return Redirect::route('todos.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return back();
    }
}
