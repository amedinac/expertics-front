import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '../interfaces/part.interface';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  baseUrl = 'http://localhost:3000/api/parts';

  constructor( private http: HttpClient) { }

  searchPart(part: string): Observable<Part>{
    const url = `${this.baseUrl}/${part}`;
    console.log(url);
    return this.http.get<Part>(url);
  }

}
