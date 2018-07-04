import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

@Injectable()
export class SearchingService {
  constructor(
    private httpClient: HttpClient) 
  {}

  	/**
     * Get Orcs information from server
     */
		getOrcsInfo(): Observable<any> {
      return this.httpClient.get(SERVER_URL);
		}
}