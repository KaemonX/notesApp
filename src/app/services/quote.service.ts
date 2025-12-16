import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private API_URL = 'https://zenquotes.io/api/random';

  constructor(private http: HttpClient) {}

  async getRandomQuote(): Promise<string> {
    try {
      const res: any = await this.http.get(this.API_URL).toPromise();
      return `„${res.content}“\n— ${res.author}`;
    } catch (e) {
      throw new Error('QUOTE_FAILED');
    }
  }
}
