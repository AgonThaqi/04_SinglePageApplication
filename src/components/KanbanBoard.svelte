<script>
    import KanbanColumn from './KanbanColumn.svelte';

    // Initialisierung der Spalten mit LocalStorage-Fallback
    let columns = JSON.parse(localStorage.getItem('kanban-columns')) || [
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Bearbeitung', tasks: [] },
        { id: 3, title: 'In Überprüfung', tasks: [] },
        { id: 4, title: 'Erledigt', tasks: [] }
    ];

    // Funktion zum Speichern der Spalten in LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('kanban-columns', JSON.stringify(columns));
    }

    function addTask(columnId, taskText) {
        const column = columns.find(col => col.id === columnId);
        if (column) {
            column.tasks.push({ text: taskText });
            saveToLocalStorage();
        }
    }

    function moveTask(columnId, taskIndex, direction) {
        const column = columns.find(col => col.id === columnId);
        const newColumn = columns.find(col => col.id === columnId + direction);

        if (column && newColumn) {
            const [task] = column.tasks.splice(taskIndex, 1);
            newColumn.tasks.push(task);
            saveToLocalStorage();
        }
    }

    function deleteTask(columnId, taskIndex) {
        const column = columns.find(col => col.id === columnId);
        if (column) {
            column.tasks.splice(taskIndex, 1);
            saveToLocalStorage();
        }
    }
</script>

<style>
    .kanban-board {
        display: flex;
        justify-content: space-between;
    }
</style>

<div class="kanban-board">
    {#each columns as column (column.id)}
        <KanbanColumn
          {column}
          on:add-task={event => addTask(column.id, event.detail)}
          on:move-task={event => moveTask(column.id, event.detail.index, event.detail.direction)}
          on:delete-task={event => deleteTask(column.id, event.detail.index)}
        />
    {/each}
</div>
