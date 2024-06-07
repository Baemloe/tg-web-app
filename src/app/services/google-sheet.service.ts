import { Injectable } from '@angular/core';

/// <reference types="gapi.client" />
/// <reference types="gapi.client.sheets" />

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  constructor() { }

  async getSheetData(spreadsheetId: string, range: string): Promise<any> {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
    return response.result;
  }

  async updateSheetData(spreadsheetId: string, range: string, values: any[][]): Promise<any> {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values
      }
    });
    return response.result;
  }
}
