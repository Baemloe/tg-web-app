import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  public gapiSetup: boolean = false; // Изменено на публичное свойство
  public authInstance!: gapi.auth2.GoogleAuth;

  constructor() { }

  async initGoogleAuth(): Promise<void> {
    // Load the Google API library
    await new Promise(resolve => gapi.load('client:auth2', resolve));

    // Initialize the Google API client
    await gapi.client.init({
      apiKey: environment.googleSheetsApiKey,
      clientId: environment.clientId,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    });

    this.authInstance = gapi.auth2.getAuthInstance();
    this.gapiSetup = true;
  }

  signIn(): void {
    this.authInstance.signIn();
  }

  signOut(): void {
    this.authInstance.signOut();
  }

  get isSignedIn(): boolean {
    return this.gapiSetup && this.authInstance?.isSignedIn.get() || false;
  }
}
