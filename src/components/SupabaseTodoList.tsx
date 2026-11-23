import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

interface Todo {
  id: string | number;
  name: string;
}

export function SupabaseTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data, error: err } = await supabase.from('todos').select();
        if (err) {
          setError(err.message);
        } else if (data) {
          setTodos(data as Todo[]);
        }
      } catch (e: any) {
        setError(e.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading todos from Supabase...</div>;
  }

  if (error) {
    return <div className="p-4 text-sm text-amber-600">Notice: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-2">Supabase Todos</h3>
      {todos.length === 0 ? (
        <p className="text-sm text-slate-500">No items found in 'todos' table.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
