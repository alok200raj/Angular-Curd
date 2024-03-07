import { Component ,OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import{MatDialog,MatDialogModule} from '@angular/material/dialog'
import { AddFormComponent } from './add-form/add-form.component';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmpserviceService } from './empservice.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from './core/core.service';





@Component({
  selector: 'app-root',
  standalone: true,
imports: [RouterOutlet,MatTableModule,MatDialogModule,MatIconModule,MatButtonModule,CommonModule,MatFormField,MatInputModule,MatToolbarModule,HttpClientModule,MatPaginatorModule,MatSortModule,MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DatePipe,EmpserviceService],
})
export class AppComponent implements OnInit {

    title = 'EmployeData';
  displayedColumns: string[] = ['position', 'empId', 'name','gender', 'mobile', 'doj','experiance','degination','department','edit','delete'];
  
  formatDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd-MM-yyyy') || '' : '';
  }
  dataSource!: MatTableDataSource<any>;
  constructor(private dialog: MatDialog,private datePipe: DatePipe,private empService:EmpserviceService ,private _coreService:CoreService){}
  ngOnInit(): void {
   this.getEmpList();
  }
 @ViewChild(MatSort) sort!: MatSort;
  addEmp() : void{
 const dialogRef = this.dialog.open(AddFormComponent, {
      width:'60%',
      height:'65%',
     
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmpList();
        }
      },
    })

  
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getEmpList(){
    this.empService.getEmpList().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
      },
      error:console.log,
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId) => data[sortHeaderId];
  }
  deleteEmployee(id:number){
    this.empService.deleteEmp(id).subscribe({
      next:(res) =>{
        this._coreService.openSnackBar('Employee deleted successfully','ok');
     
        this.getEmpList();
      },
      error:console.log
    })
  }
  editEmp(data:any){
    const dialogRef = this.dialog.open(AddFormComponent, {
      width:'60%',
      height:'65%',
    data
   
  });
  dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmpList();
      }
    },
  });

  }
}