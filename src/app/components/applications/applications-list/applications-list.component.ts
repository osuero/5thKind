import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApplicationService } from '../services/application.service';
import { application } from '../../model/application';
import { MatDialog } from '@angular/material/dialog'
import { DetailsComponent } from '../modals/details/details.component';
import { CreateComponent } from '../modals/create/create.component';
@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css']
})
export class ApplicationsListComponent implements OnInit {
  applicationList: application[] = []; // Initialize your array of items here
  filteredItems: application[] = [];
  pagedItems: application[] = [];
  searchQuery = '';
  constructor(private applicationService: ApplicationService, public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.applicationService.getApplications()
      .subscribe((data: application[]) => {
        this.applicationList = data;
        this.applyFilter();
        this.paginateItems(0, 9);
      });
  }
  onDialogClosed() {
    this.fetchItems();
  }
  applyFilter() {
    this.filteredItems = this.applicationList.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginateItems(0, 9);
  }

  paginateItems(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    this.pagedItems = [...(this.filteredItems.slice(start, start + pageSize))];
  }

  pageChanged(event: any) {
    this.paginateItems(event.pageIndex, event.pageSize);
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(
      CreateComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchItems();
      }
    });
  }

  openDialogDetials(item: any): void {
    const dialogRef = this.dialog.open(
      DetailsComponent, {
      width: '350px',
      data: { ...item }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchItems();
      }
    });
  }
}
