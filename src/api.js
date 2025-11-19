const API_URL = "http://192.168.40.21:4000/api"; // Tu backend

// GET todas las tareas
export async function getTasks() {
    try {
        const res = await fetch(`${API_URL}/tasks`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
}

// POST crear tarea
export async function createTask(task) {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return await res.json();
    } catch (error) {
        console.error("Error al crear tarea:", error);
        return null;
    }
}

// PUT actualizar tarea
export async function updateTask(id, task) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return await res.json();
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        return null;
    }
}

// DELETE eliminar tarea
export async function deleteTask(id) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return null;
    }
}

