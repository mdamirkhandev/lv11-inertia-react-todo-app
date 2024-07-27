import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, todos, editingTodo }) {
    const [currentEditingTodo, setCurrentEditingTodo] = useState(
        editingTodo || null
    );
    const {
        data,
        setData,
        post,
        delete: destroy,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        title: currentEditingTodo ? currentEditingTodo.title : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentEditingTodo) {
            put(route("todos.update", currentEditingTodo.id), {
                data,
                onSuccess: () => {
                    reset();
                    setCurrentEditingTodo(null);
                    Inertia.get(route("todos.index"));
                },
            });
        } else {
            post(route("todos.store"), {
                data,
                onSuccess: () => reset(),
            });
        }
    };

    const toggleTodo = (id) => {
        put(route("todos.update", id));
    };

    const deleteTodo = (id) => {
        destroy(route("todos.destroy", id));
    };

    const handleEdit = (todo) => {
        setCurrentEditingTodo(todo);
        setData("title", todo.title);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Index
                </h2>
            }
        >
            <Head title="Index" />

            <div className="py-12">
                <div className="w-1/2 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 items-center md:grid-cols-2">
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            placeholder="Add a new todo"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                                errors.title &&
                                                "!border-red-500"
                                            }`}
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            {currentEditingTodo
                                                ? "Update Todo"
                                                : "Add Todo"}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Todos
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Created
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Updated
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todos.map((todo) => (
                                            <tr
                                                key={todo.id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        id={`todo-checkbox-${todo.id}`}
                                                        type="checkbox"
                                                        checked={
                                                            todo.status ===
                                                            "completed"
                                                        }
                                                        onChange={() =>
                                                            toggleTodo(todo.id)
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td
                                                    className={`px-6 py-4 ${
                                                        todo.status ===
                                                        "completed"
                                                            ? "line-through"
                                                            : ""
                                                    }`}
                                                >
                                                    {todo.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(
                                                        todo.created_at
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(
                                                        todo.updated_at
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(todo)
                                                        }
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24px"
                                                            viewBox="0 -960 960 960"
                                                            width="24px"
                                                            fill="skyblue"
                                                        >
                                                            <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteTodo(todo.id)
                                                        }
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24px"
                                                            viewBox="0 -960 960 960"
                                                            width="24px"
                                                            fill="red"
                                                        >
                                                            <path d="M240-800v200-200 640-9.5 9.5-640Zm0 720q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v174q-19-7-39-10.5t-41-3.5v-120H520v-200H240v640h254q8 23 20 43t28 37H240Zm396-20-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
