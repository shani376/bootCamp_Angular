import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { ILocation } from 'src/app/interfaces/ILocation';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit{
  
  constructor(private httpService: HttpServiceService ) {
    this.httpService.getAllLocationsFromServer().subscribe((locs) => {
      // this.locations = locs;
      //why only in function can get to the locations?
      console.log(locs);
      this.displayTable(this.locations);
    }, 
      err=> console.log(err));
   }
   displayTable(locs:ILocation[]):void {
    
   }
  ngOnInit(): void {

      
  }
  getLocsByID():void{
    this.httpService.getLocationsByIDFromServer(this.patientId!).subscribe((locs) => {
      // this.locations = locs;
      //why only in function can get to the locations?
      console.log(locs);
      this.displayTable(this.locations);
    }, 
      err=> console.log(err));
  }
  locations: ILocation[] = [];
  patientId?: string;

}

