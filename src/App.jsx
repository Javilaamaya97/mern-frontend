import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "./styles.css";//

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

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
    <div className="app-container">
      <h1>Lista de Tareas</h1>

      <div className="form-container">
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
        <button className="add-btn" onClick={handleCreate}> ➕ Agregar Tarea</button>
      </div>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className="task-card">
            <div className="task-info">
              <span className="task-title">{t.title}</span>
              <span className="task-desc">{t.description}</span>
            </div>

            <div className="task-buttons">
              <button className="btn-edit" onClick={() => handleUpdate(t.id)}> ✏️</button>
              <button className="btn-delete" onClick={() => handleDelete(t.id)}> 🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

