// import { HttpClient } from '@angular/common/http';
// import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort, SortDirection } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { merge, Observable, of as observableOf } from 'rxjs';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { ILocation } from 'src/app/interfaces/ILocation';
// import { Location } from 'src/app/interfaces/Location';
// import { HttpServiceService } from 'src/app/services/http-service.service';

// /**
//  * @title Table retrieving data through HTTP
//  */
// @Component({
//   selector: 'location-table',
//   styleUrls: ['location-table.component.css'],
//   templateUrl: 'location-table.component.html',
// })
// export class LocationTableComponent implements AfterViewInit{
//   displayedColumns = ['startDate', 'endDate', 'city', 'address'];
//   exampleDatabase!: ExampleHttpDatabase | null;
//   // data: ILocation[] = [];
//   @Input() patientId?: string;

// addLocation(location: Location): void {
//     this.httpService.postLocation(location).subscribe(res=>console.log(res),err=>console.log(err));
    
//   }
//   data!: MatTableDataSource<ILocation>;
//   resultsLength = 0;
//   isLoadingResults = true;
//   isRateLimitReached = false;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild('empTbSort') empTbSort = new MatSort();

//   constructor(private _httpClient: HttpClient,private httpService: HttpServiceService ) { }
//   ngAfterViewInit(): void {
//     this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this.patientId);
//     this.data = new MatTableDataSource(this.locations);
//     this.paginator = this.paginator;
//     this.sort = this.empTbSort;
//   }
// }
// //   ngAfterViewInit() {
// //     this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this.patientId);

// //     // If the user changes the sort order, reset back to the first page.
// //     this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

// //     merge(this.sort.sortChange, this.paginator.page)
// //       .pipe(
// //         startWith({}),
// //         switchMap(() => {
// //           this.isLoadingResults = true;
// //           return this.exampleDatabase!.getRepoIssues(
// //             this.sort.active,
// //             this.sort.direction,
// //             this.paginator.pageIndex,
// //           ).pipe(catchError(() => observableOf(null)));
// //         }),
// //         map(data => {
// //           // Flip flag to show that loading has finished.
// //           this.isLoadingResults = false;
// //           this.isRateLimitReached = data === null;

// //           if (data === null) {
// //             return [];
// //           }

// //           // Only refresh the result length if there is new data. In case of rate
// //           // limit errors, we do not want to reset the paginator to zero, as that
// //           // would prevent users from re-triggering requests.
// //           // this.resultsLength = data.total_count;
// //           return data;
// //         }),
// //       )
// //       .subscribe(data => (this.data = data));
// //   }
// // }


// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDatabase {
//   _patientId?: string;
//   href?: string;
//   constructor(private _httpClient: HttpClient, patientId?: string) {
//     this._patientId = patientId;
//   }

//   getRepoIssues(): Observable<ILocation[]> {
//     console.log(this._patientId);
//     if (typeof (this._patientId) == 'undefined') {
//       this.href = "https://localhost:44381/api/Location";
//     }
//     else {
//       this.href = `https://localhost:44381/api/Location/id/${this._patientId}`;
//     }
//     //const requestUrl = `${this.href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1
//      // }`;

//     return this._httpClient.get<ILocation[]>(this.href);
//   }
// }










// // import { Component, OnInit, ViewChild } from '@angular/core';
// // import { PLocation } from 'src/app/models/location';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable, of } from 'rxjs';
// // import {MatTableDataSource} from '@angular/material/table';
// // import { catchError, map, tap } from 'rxjs/operators';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import { MatPaginator } from '@angular/material/paginator';
// // import { MatSort, Sort } from '@angular/material/sort';

// // @Component({
// //   selector: 'app-main',
// //   templateUrl: './main.component.html',
// //   styleUrls: ['./main.component.css']
// // })
// // export class MainComponent implements OnInit {

// //   locations: PLocation[] = [];
// //   addLocationForm: FormGroup;
// //   PatientId: string = "";
// //   locationsUrl: string = "";
// //   dataSource: MatTableDataSource<PLocation>;
// //   displayedColumns: string[] = ['fromDate', 'toDate', 'city', 'address'];
// //   patientIdFormControl = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
// //   @ViewChild('paginator') paginator!: MatPaginator;
// //   @ViewChild('empTbSort') empTbSort = new MatSort();

// //   constructor(private http: HttpClient) { 
// //     this.dataSource = new MatTableDataSource();
// //     this.addLocationForm = new FormGroup({
// //       fromDate :new FormControl(),
// //       toDate :new FormControl(),
// //       city :new FormControl(),
// //       adress :new FormControl(),
// //     });
// //   }

// //   ngOnInit(){
// //     this.addLocationForm = new FormGroup({
// //       fromDate :new FormControl(),
// //       toDate :new FormControl(),
// //       city :new FormControl(),
// //       adress :new FormControl(),
// //     });
// //   }

// //   ngAfterViewInit() {
// //     this.dataSource = new MatTableDataSource(this.locations);
// //     this.dataSource.paginator = this.paginator;
// //      this.dataSource.sort = this.empTbSort;
// //   }
// //   applyFilter(event: Event) {
// //     const filterValue = (event.target as HTMLInputElement).value;
// //     this.dataSource.filter = filterValue.trim().toLowerCase();
// //     if (this.dataSource.paginator) {
// //       this.dataSource.paginator.firstPage();
// //     }
// //   }
// //   displayeTable(): void {
// //     console.log(this.locations);
// //   }
// //   getLocationFromServer(): Observable<PLocation[]> {
// //     this.locationsUrl = `https://localhost:44371/api/Patient/GetLocations/${this.PatientId}`;
// //     return this.http.get<PLocation[]>(this.locationsUrl);
// //   }
// //    getAllLocations(): void{
// //      this.getLocationFromServer().subscribe(locs => {
// //       this.locations = locs;
// //       this.dataSource.data = this.locations;
// //       // this.dataSource.paginator?.firstPage();
// //       this.displayeTable();
// //     }
// //       , err => console.log(err));
// //       // if (this.dataSource.paginator) {
// //       //   this.dataSource.paginator.firstPage();
// //       // }
// //   }
// //   changePatient(event: any): void {
// //     let currentId: string = event.target.value;
// //     if (currentId.length <= 9 && currentId.length >= 7) {
// //       this.PatientId = currentId;
// //     }
// //     else {
// //       return;
// //     }
// //     this.getAllLocations();
// //     this.displayeTable();
// //   }
// //   postLocation():Observable<Object>{
// //     var newLoc: PLocation ={
// //       fromDate: this.addLocationForm.value.fromDate,
// //       toDate: this.addLocationForm.value.toDate,
// //       city: this.addLocationForm.value.city,
// //       adress: this.addLocationForm.value.adress,
// //       patientId:this.PatientId,
// //     }
// //     return this.http.post(`https://localhost:44371/api/Location`,newLoc);
// //   }
// //   AddLocation(event:any):void{
  
// //     this.postLocation().subscribe(b=>
// //       this.getAllLocations(),err=> console.log(err));
// //       this.addLocationForm.reset();
// //   }



// // }