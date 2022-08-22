import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, Input, AfterContentInit } from '@angular/core';
import { MatSort, SortDirection, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ILocation } from 'src/app/interfaces/ILocation';
import { Location } from 'src/app/interfaces/Location';
import { HttpServiceService } from 'src/app/services/http-service.service';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'location-table',
  styleUrls: ['location-table.component.css'],
  templateUrl: 'location-table.component.html',
})
export class LocationTableComponent implements AfterContentInit{
  
  @Input() patientId?: string;
  locations:ILocation[]=[];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  dataSource: MatTableDataSource<ILocation>;
  displayedColumns = ['startDate', 'endDate', 'city', 'address','delete'];
  ngAfterContentInit() {
    if (typeof (this.patientId) == 'undefined') {
      this.getAllLocations();
    }  
    else{
      this.getLocationsById(this.patientId!);
    } 
    // this.dataSource = new MatTableDataSource(this.locations);
    // this.dataSource.sort = this.empTbSort;
}
addLocation(location: Location): void {
  this.httpService.postLocation(location).subscribe(res=>this.getLocationsById(this.patientId!),err=>console.log(err));
  
}
deleteLocation(location:Location):void{
  console.log(location);
  
  this.httpService.deleteLocation(location).subscribe(res=>this.getLocationsById(this.patientId!),err=>console.log(err));
}
getAllLocations():void{
  this.httpService.getAllLocationsFromServer().subscribe(locs=>{
    this.locations=locs; 
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.sort = this.empTbSort;
    },err=>console.log(err))
}
getLocationsById(id:string):void{
  this.httpService.getLocationsByIDFromServer(id).subscribe(locs=>{
    this.locations=locs; 
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.sort = this.empTbSort;},
    err=>console.log(err))
}
constructor(private httpService: HttpServiceService ) {
  this.dataSource = new MatTableDataSource();
 }
}