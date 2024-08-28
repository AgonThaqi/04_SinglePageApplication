<script>
    import KanbanColumn from './KanbanColumn.svelte';

    // Kombinierte Struktur für Spalten und Aufgaben
    let columns = [
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Bearbeitung', tasks: [] },
        { id: 3, title: 'In Überprüfung', tasks: [] },
        { id: 4, title: 'Erledigt', tasks: [] }
    ];

    function addTask(columnId, taskText) {
        const column = columns.find(col => col.id === columnId);
        if (column) {
            column.tasks.push({ text: taskText });
        }
    }

    function moveTask(columnId, taskIndex, direction) {
        const column = columns.find(col => col.id === columnId);
        const newColumn = columns.find(col => col.id === columnId + direction);

        if (column && newColumn) {
            const [task] = column.tasks.splice(taskIndex, 1);
            newColumn.tasks.push(task);
        }
    }

    function deleteTask(columnId, taskIndex) {
        const column = columns.find(col => col.id === columnId);
        if (column) {
            column.tasks.splice(taskIndex, 1);
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
