const { openBrowser, goto, click, write, text, closeBrowser, button, $ } = require('taiko');

beforeSuite(async () => {
	await openBrowser({ headless: false });
});

afterSuite(async () => {
	await closeBrowser();
});

step("Öffne die Kanban-Seite", async () => {
	await goto("http://localhost:5173"); // Passe die URL entsprechend an
});

step("Füge eine neue Aufgabe <taskName> hinzu", async (taskName) => {
	await click(button("+ Aufgabe hinzufügen", { index: 0 })); // Klickt auf die Schaltfläche in der ersten Spalte
	await write(taskName);
	await press('Enter');
	await text(taskName).exists(); // Überprüft, ob die Aufgabe hinzugefügt wurde
});

step("Verschiebe die Aufgabe nach rechts bis zur letzten Spalte", async () => {
	let task = await text("Test Task");
	for (let i = 0; i < 3; i++) {
		await click($(task.parentNode).find(".move-right"));
	}
});

step("Verschiebe die Aufgabe nach links bis zur ersten Spalte", async () => {
	let task = await text("Test Task");
	for (let i = 0; i < 3; i++) {
		await click($(task.parentNode).find(".move-left"));
	}
});

step("Lösche die Aufgabe", async () => {
	let task = await text("Test Task");
	await click($(task.parentNode).find(".delete-task"));
	assert.ok(!(await task.exists())); // Überprüft, ob die Aufgabe gelöscht wurde
});
