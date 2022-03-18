import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

// import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:3000/posts";
  // baseUrl ="http://localhost:9000/datas/";

   
  postUser(data:any){
      return this.http.post<any>(this.baseUrl,data)
  }

  getUser(){
       return this.http.get<any>(this.baseUrl)
       }

  updateUser(data:any , id:number){
      return this.http.put<any>(`${this.baseUrl}/${id}`,  data)
  }

  deleteUser(id:number){
      return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }

}
