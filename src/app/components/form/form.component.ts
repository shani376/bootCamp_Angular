import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/interfaces/Location';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  @Output() addedLoc: EventEmitter<Location> = new EventEmitter<Location>();
  @Input() patientId!: string;
  constructor() { }

  ngOnInit(): void {
  }
  //parameters get undefined
  newLoc!:Location;
  startDate!:Date;
  endDate!:Date;
  city!:string;
  address!:string;
  validateDate(startDate:Date,endDate:Date):boolean{
    if(startDate<endDate){
      return false;
    }
    return true;
  }
  postLocation(): void{
    //if(this.validateDate(this.startDate,this.endDate)){
    this.newLoc = new Location(this.patientId, this.startDate, this.endDate, this.city, this.address);
    this.addedLoc.emit(this.newLoc);
      this.startDate= new Date();
      this.endDate= new Date();
      this.city= '';
      this.address= '';}
  //}
}