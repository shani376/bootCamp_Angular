import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/Location';
import { ILocation } from '../interfaces/ILocation';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

public getAllLocationsFromServer():Observable<ILocation[]>{
  const Locs = this.http.get<ILocation[]>("https://localhost:44381/api/Location");
  return Locs;
}
public getLocationsByIDFromServer(patientId: string):Observable<ILocation[]>{
  const Locs = this.http.get<ILocation[]>(`https://localhost:44381/api/Location/id/${patientId}`);
  return Locs;
}
public postLocation(LocToSave: Location){
  return this.http.post("https://localhost:44381/api/Location", LocToSave);
}
public deleteLocation(LocIdToDelete: Number){
  return this.http.delete(`https://localhost:44381/api/Location/${LocIdToDelete}`);
}
  constructor(private http: HttpClient) { }
}


