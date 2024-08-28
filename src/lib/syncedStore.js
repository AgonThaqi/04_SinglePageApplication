import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function syncedStore(key, initialValue) {
	let data = initialValue;

	// Überprüfe, ob wir im Browser sind
	if (browser) {
		const storedValue = localStorage.getItem(key);
		data = storedValue ? JSON.parse(storedValue) : initialValue;
	}

	const store = writable(data);

	if (browser) {
		// Speicher den aktuellen Wert in localStorage, wenn er sich ändert
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});

		// Synchronisiere mit BroadcastChannel
		const channel = new BroadcastChannel(key);
		channel.onmessage = (event) => {
			store.set(event.data);
		};

		store.subscribe((value) => {
			channel.postMessage(value);
		});
	}

	return store;
}
