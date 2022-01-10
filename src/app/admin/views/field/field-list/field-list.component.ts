import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {
	public tableColumns = ["name"];
	public dataSource!: MatTableDataSource<Field>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
  
  constructor(private fieldService: FieldService) { }

  ngOnInit(): void {
    this.loadFields()
  }

  public loadFields(): void {
    this.fieldService.getList().subscribe({next: (fields) => {
      this.dataSource = new MatTableDataSource(fields);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      console.log(this.dataSource)
    }, error: (err) => {
      // TODO: Handle error
      console.log(err)
    }})
  }

	public applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
