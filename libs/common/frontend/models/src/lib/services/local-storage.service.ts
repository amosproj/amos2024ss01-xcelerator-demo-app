import { Injectable, signal, WritableSignal } from '@angular/core';

/**
 * Manages string values in localStorage with reactive signals.
 * Allows registering keys with default values, setting, and getting values reactively.
 */

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private signals = new Map<string, WritableSignal<string>>();

	/**
	 * Sets the value for a key and updates its signal.
	 * Does nothing if getOrCreate was not called before
	 * @param key The localStorage key.
	 * @param value The string value to set.
	 */
	set(key: string, value: string) {
		const signal = this.signals.get(key);
		if (signal !== undefined) {
			localStorage.setItem(key, value);
			signal.set(value);
		}
	}

	/**
	 * Returns the signal for a key, returning signal(defaultValue) if it was not registered before
	 * @param key The localStorage key
	 * @param defaultValue the value it should have if it is not in the localStorage yet
	 * @returns The signal for the key.
	 */
	getOrCreate(key: string, defaultValue: string) {
		let sig = this.signals.get(key);
		if (sig !== undefined) {
			return sig;
		}

		// create the signal
		let value = localStorage.getItem(key);
		if (value === null) {
			value = defaultValue;
			localStorage.setItem(key, value);
		}
		sig = signal(value);
		this.signals.set(key, sig);
		return sig;
	}
}
