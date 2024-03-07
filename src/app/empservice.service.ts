import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
  constructor(private _http: HttpClient) { }
  post(data: any) :Observable<any>{
    return this._http.post<any>("http://localhost:3000/emplyee", data);
    
  }
  UpdateEmp(id:number,data:any):Observable<any>{
    return this._http.put('http://localhost:3000/emplyee/'+id,data);    
  }
  getEmpList( ) :Observable<any>{
    return this._http.get<any>("http://localhost:3000/emplyee");
    
  }
  deleteEmp( id:number) :Observable<any>{
    return this._http.delete('http://localhost:3000/emplyee/'+id);
    
  }
 
}
