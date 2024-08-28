<script>
    import { createEventDispatcher } from 'svelte';
    import Task from './Task.svelte';

    export let column;

    const dispatch = createEventDispatcher();

    function addTask() {
        const taskText = prompt("Aufgabe eingeben:");
        if (taskText) {
            dispatch('add-task', taskText);
        }
    }

    function moveTask(index, direction) {
        dispatch('move-task', { index, direction });
    }

    function deleteTask(index) {
        dispatch('delete-task', { index });
    }
</script>

<style>
    .kanban-column {
        width: 23%;
        background-color: #e2e4e6;
        padding: 10px;
        border-radius: 5px;
    }

    h2 {
        text-align: center;
    }

    .task-list {
        margin-top: 10px;
    }

    .add-task-btn {
        width: 100%;
        padding: 8px;
        margin-top: 10px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    .add-task-btn:hover {
        background-color: #0056b3;
    }
</style>

<div class="kanban-column">
    <h2>{column.title}</h2>
    <div class="task-list">
        {#each column.tasks as task, index}
            <Task
              {task}
              on:move-left={() => moveTask(index, -1)}
              on:move-right={() => moveTask(index, 1)}
              on:delete-task={() => deleteTask(index)}
            />
        {/each}
    </div>
    <button class="add-task-btn" on:click={addTask}>+ Aufgabe hinzufügen</button>
</div>
