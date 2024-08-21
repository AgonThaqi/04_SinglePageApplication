<script>
    import { createEventDispatcher } from 'svelte';

    export let task;

    const dispatch = createEventDispatcher();

    function moveLeft() {
        dispatch('move-left');
    }

    function moveRight() {
        dispatch('move-right');
    }

    function deleteTask() {
        dispatch('delete-task');
    }
</script>

<style>
    .task {
        background-color: white;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .task-controls {
        display: flex;
        gap: 5px;
    }

    .task-controls button {
        padding: 5px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .move-left {
        background-color: #ffc107;
        color: white;
    }

    .move-right {
        background-color: #28a745;
        color: white;
    }

    .delete-task {
        background-color: #dc3545;
        color: white;
    }
</style>

<div class="task">
    <span>{task.text}</span>
    <div class="task-controls">
        <button class="move-left" on:click={moveLeft}>&#8592;</button>
        <button class="delete-task" on:click={deleteTask}>&#10006;</button>
        <button class="move-right" on:click={moveRight}>&#8594;</button>
    </div>
</div>
