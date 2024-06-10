export function initializeGapiClient() {
    return new Promise<void>((resolve) => {
      gapi.load('client', () => {
        gapi.client.init({
          apiKey: environment.googleSheetsApiKey,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(() => {
          resolve();
        });
      });
    });
  }
  