import { ILocation } from "./ILocation";
export class Location implements ILocation{
    patientId:string;
    startDate:Date;
    endDate:Date;
    city:string;
    address:string;
    constructor(id:string, startDate:Date,endDate:Date,city:string,address:string) {
        this.patientId = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.address = address;
    };
}