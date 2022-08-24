
import { Component, ViewChild, Input, AfterContentInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage()
  }
}

addLocation(location: Location): void {
  this.httpService.postLocation(location).subscribe(res=>this.getLocationsById(this.patientId!),err=>console.log(err));
  
}
deleteLocation(location:Location):void{
  console.log(location);
  this.httpService.deleteLocation(location.locationId!).subscribe(res=>this.getLocationsById(this.patientId!),err=>console.log(err));
}
getAllLocations():void{
  this.httpService.getAllLocationsFromServer().subscribe(locs=>{
    this.locations=locs; 
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;
    },err=>console.log(err))
}
getLocationsById(id:string):void{
  this.httpService.getLocationsByIDFromServer(id).subscribe(locs=>{
    this.locations=locs; 
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;},
    err=>console.log(err))
}
constructor(private httpService: HttpServiceService ) {
  this.dataSource = new MatTableDataSource();
 }
}