import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleSheetService } from './services/google-sheet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'google-sheet-search-app';

  constructor(
    public googleAuthService: GoogleAuthService,
    public googleSheetService: GoogleSheetService
  ) { }

  async ngOnInit() {
    await this.googleAuthService.initGoogleAuth();
  }

  async getSheetData() {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const range = 'Sheet1!A1:D10';
    const data = await this.googleSheetService.getSheetData(spreadsheetId, range);
    console.log(data);
  }

  signIn() {
    this.googleAuthService.signIn();
  }

  signOut() {
    this.googleAuthService.signOut();
  }

  async updateSheetData() {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const range = 'Sheet1!A1:D1';
    const values = [['Updated Value1', 'Updated Value2', 'Updated Value3', 'Updated Value4']];
    const response = await this.googleSheetService.updateSheetData(spreadsheetId, range, values);
    console.log(response);
  }
}
