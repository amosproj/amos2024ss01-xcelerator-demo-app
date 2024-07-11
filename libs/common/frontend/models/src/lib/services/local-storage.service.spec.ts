import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
	let service: LocalStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalStorageService);

		jest.spyOn(Storage.prototype, 'setItem');
		Storage.prototype.setItem = jest.fn();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('set should not do anything if getOrCreate was not called before', () => {
		service.set('test', 'true');

		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
		expect(service.getOrCreate('test', 'default')()).toBe('default');
	});

	it('getOrCreate should create it with default value if not set', () => {
		const signal = service.getOrCreate('test', 'default');

		expect(localStorage.setItem).toHaveBeenCalledWith('test', 'default');
		expect(signal()).toBe('default');
	});

	it('getOrCreate should not overwrite the value if it is already set', () => {
		Storage.prototype.getItem = jest.fn().mockReturnValue('true');

		const signal = service.getOrCreate('test', 'default');

		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
		expect(signal()).toBe('true');
	});

	it('set should correctly update signal', () => {
		const signal = service.getOrCreate('test', 'true');

		expect(signal()).toBe('true');

		service.set('test', 'false');
		expect(signal()).toBe('false');
	});
});
