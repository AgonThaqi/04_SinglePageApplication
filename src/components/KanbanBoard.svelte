<script>
    import KanbanColumn from './KanbanColumn.svelte';
    import { syncedStore } from '$lib/syncedStore.js';

    // Verwende den syncedStore für das Kanban-Board
    const columns = syncedStore('kanban-columns', [
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Bearbeitung', tasks: [] },
        { id: 3, title: 'In Überprüfung', tasks: [] },
        { id: 4, title: 'Erledigt', tasks: [] }
    ]);

    function addTask(columnId, taskText) {
        columns.update(cols => {
            const column = cols.find(col => col.id === columnId);
            column.tasks.push({ text: taskText });
            return cols;
        });
    }

    function moveTask(columnId, taskIndex, direction) {
        columns.update(cols => {
            const column = cols.find(col => col.id === columnId);
            const newColumn = cols.find(col => col.id === columnId + direction);

            if (column && newColumn) {
                const [task] = column.tasks.splice(taskIndex, 1);
                newColumn.tasks.push(task);
            }
            return cols;
        });
    }

    function deleteTask(columnId, taskIndex) {
        columns.update(cols => {
            const column = cols.find(col => col.id === columnId);
            column.tasks.splice(taskIndex, 1);
            return cols;
        });
    }
</script>

<style>
    .kanban-board {
        display: flex;
        justify-content: space-between;
    }
</style>

<div class="kanban-board">
    {#each $columns as column (column.id)}
        <KanbanColumn
          {column}
          on:add-task={event => addTask(column.id, event.detail)}
          on:move-task={event => moveTask(column.id, event.detail.index, event.detail.direction)}
          on:delete-task={event => deleteTask(column.id, event.detail.index)}
        />
    {/each}
</div>
