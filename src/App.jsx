import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Traer todas las tareas al cargar
  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async () => {
    if (!newTask.title) return;
    await createTask(newTask);
    setNewTask({ title: "", description: "" });
    refreshTasks();
  };

  const handleUpdate = async (id) => {
    const newTitle = prompt("Nuevo título:");
    const newDesc = prompt("Nueva descripción:");
    if (!newTitle) return;
    await updateTask(id, { title: newTitle, description: newDesc });
    refreshTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    refreshTasks();
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <div>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreate}>Agregar Tarea</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong>: {t.description}{" "}
            <button onClick={() => handleUpdate(t.id)}>Editar</button>
            <button onClick={() => handleDelete(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

