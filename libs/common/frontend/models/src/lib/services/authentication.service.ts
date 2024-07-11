import { inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { APP_CONFIG } from '../tokens';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private readonly tokenKey = 'authToken';
	private readonly tokenExpirationTime = 1000 * 60 * 60;

	private readonly secretKey = inject(APP_CONFIG).secretKey;

	// this is a demo app, don't actually store these in the code
	private readonly userDataBase = [
		'U2FsdGVkX1/9RSRUE4j4qGAQ48gPSr8iLF242snE0hwJmOsluUk/hPzDuXgcgkSGNa8YCrm2GW8lxAxwCCDq1w==',
		'U2FsdGVkX1+ifYJJA7x2MVnkOiqx8DywlVyKYOzPM6HPftzUdoGrg8X2c9i2f2ofZKF8I7sKZGFhuJQtVqBeGA==',
		'U2FsdGVkX18yC09eQaBPI4LllwUbBAJTYWZoDmBROU4tOaHfB6n9+FCWMOUYGhbVJCV370aVvszr6YaFywC5AQ==',
		'U2FsdGVkX19BSG6V31LwzAGRkfYg2lFJ73Y2azUbT2E/qhUXXoqnjzsmBSUuOrJJFapTiYrAiVLzD5aVlAwSyA==',
		'U2FsdGVkX198xdVbzi9qI8e7hsQb6R7Tqr+H0TC0rXt/0fHYDzFAYZYvPNYbj9v/9kz9gIDcJ0ltqr0ykYoVfQ==',
		'U2FsdGVkX18OT9osxUQklFvha2WUhpKHMABSczBqbZM/aIwOpsOrmP+nLM40iKhQy93uRHYH9cDSRiRKXysYJg==',
		'U2FsdGVkX18Q9+qDzKhowDLaeKfC3JYs7bchhCrc1e1XHfme0WnWT8fmrjJYTPhlVcty1uRhxUSplmSqPbHI1g==',
		'U2FsdGVkX19jahQtTcRewdjzN9VinNEA5O5GAc42IcuMJ8u9qq2SoPlSZAVQKq0S55a33vFT0gE5KdB6sMw1kA==',
		'U2FsdGVkX18z8urywB/i1cCYvUs9QtcmiGIT7fMr8/romPQswAtQT0br6/Q5pyd5dyt9MmiIRzj5/3Hpbe0DEg==',
		'U2FsdGVkX19scTGfMHvQ9zQU2DnoQ3+OUHcZneou5CBC3oEiVGOk9j9tSG62qMXoGLV/kEPNRB0os3RrEaQkAK91JwiyJXkIK/OZQibRvnE=',
		'U2FsdGVkX19ZUtXbsjHxFCLMsf80K1lEUoavBNrqfrDLlKCqQ8lvvB69/oj3pCOeqS5krHHa2dfp+KtEfwzhYey6WeWBsg02XhnHdPL6uhQ=',
		'U2FsdGVkX1+TsxHJS6SCdDRXDrSmcSTLYFUt1eU+vOt3akqoeakFakr2kyxXUloxeCvEGtK54eDyPGssF2o+7xkWxPW+kHKgMdVk7aD7Ma4=',
		'U2FsdGVkX1/7vbTIhc5KsLi+Mv81zqX2905hWUa0mlZhkcxiTKcddtBR42SnW3/CmenCGGpQJOFJmyOZtFMCuA==',
		'U2FsdGVkX1805OkL41+N6QhaS38fAmqxTPsEUg1j30Y/x6sV9iyfQHYxMYhEtb/B231AfFTzPar9cF6N4AU6UQ==',
	];

	login(email: string, password: string) {
		if (this.checkCredentials(email, password)) {
			const token = this.generateToken(email, password);
			localStorage.setItem(this.tokenKey, token);
			return true;
		}

		return false;
	}

	logout() {
		localStorage.removeItem(this.tokenKey);
	}

	isLoggedIn() {
		const token = localStorage.getItem(this.tokenKey);
		if (!token) {
			return false;
		}

		const userData = this.decryptToken(token);
		if (!userData) {
			return false;
		}

		if (!this.checkCredentials(userData.userMail, userData.password)) {
			return false;
		}

		if (new Date().getTime() - userData.time > this.tokenExpirationTime) {
			this.logout();
			return false;
		}

		return true;
	}

	getUserMail() {
		const token = localStorage.getItem(this.tokenKey);
		if (!token) {
			return false;
		}

		const userData = this.decryptToken(token);
		if (!userData) {
			return false;
		}

		return userData.userMail;
	}

	private checkCredentials(email: string, password: string) {
		return this.userDataBase.some((encryptedUser) => {
			const user = this.decryptToken(encryptedUser);
			if (!user) {
				return false;
			}

			return user.userMail === email && user.password === password;
		});
	}

	private generateToken(email: string, password: string) {
		// ':' is not allowed in the email, so we can use it as a separator
		const time = new Date().getTime();
		const tokenData = `${email}:${password}:${time}`;
		return CryptoJS.AES.encrypt(tokenData, this.secretKey).toString();
	}

	private decryptToken(token: string) {
		try {
			const bytes = CryptoJS.AES.decrypt(token, this.secretKey);
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

			// the token should have the format email:password:time, where password could contain :
			const firstColonIndex = decryptedData.indexOf(':');
			const userMail = decryptedData.slice(0, firstColonIndex);

			const lastColonIndex = decryptedData.lastIndexOf(':');
			const password = decryptedData.slice(firstColonIndex + 1, lastColonIndex);
			const time = decryptedData.slice(lastColonIndex + 1);

			return { userMail: userMail, password: password, time: parseInt(time) };
		} catch (error) {
			return null;
		}
	}
}
