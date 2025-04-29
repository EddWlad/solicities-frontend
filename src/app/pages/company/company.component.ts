import { Component,  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild, } from '@angular/core';

  import { MatDialog } from '@angular/material/dialog';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { SelectionModel } from '@angular/cdk/collections';
  import { Subject } from 'rxjs';
  import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
  import { DeleteDialogComponent } from './dialogs/delete/delete.component';
  import {
    MAT_DATE_LOCALE,
    MatOptionModule,
    MatRippleModule,
  } from '@angular/material/core';
  import { CommonModule, DatePipe, formatDate, NgClass } from '@angular/common';
  import { rowsAnimation, TableExportUtil } from '@shared';
  import { ReactiveFormsModule, FormsModule } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { MatSelectModule } from '@angular/material/select';
  import { MatTooltipModule } from '@angular/material/tooltip';
  import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
  import { HttpClient } from '@angular/common/http';
  import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
  import { Direction } from '@angular/cdk/bidi';
  import { image } from 'd3';
import { Company } from 'app/model/company';
import { CompanyService } from 'app/services/company.service';

@Component({
  selector: 'app-company',
  imports: [
    BreadcrumbComponent,
    FeatherIconsComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,

  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit, OnDestroy{

  columnDefinitions = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'ruc', label: 'RUC', type: 'ruc', visible: true },
    { def: 'name', label: 'Name', type: 'name', visible: true },
    { def: 'address', label: 'Address', type: 'address', visible: true },
    { def: 'status', label: 'Status', type: 'status', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

    dataSource = new MatTableDataSource<Company>([]);
    selection = new SelectionModel<Company>(true, []);
    contextMenuPosition = { x: '0px', y: '0px' };
    isLoading = true;
    private destroy$ = new Subject<void>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;

    breadscrums = [
      {
        title: 'COMPANIES',
        items: ['Home'],
        active: 'Table',
      },
    ];


  constructor(
    public httpClient: HttpClient,
    private companyService: CompanyService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.loadData();
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((cd) => cd.visible)
      .map((cd) => cd.def);
  }

    addNew() {
      this.openDialog('add');
      this.loadData();
    }

    editCall(row: Company) {
      this.openDialog('edit', row);
    }

      openDialog(action: 'add' | 'edit', data?: Company) {
        let varDirection: Direction;
        if (localStorage.getItem('isRtl') === 'true') {
          varDirection = 'rtl';
        } else {
          varDirection = 'ltr';
        }
        const dialogRef = this.dialog.open(FormDialogComponent, {
          width: '60vw',
          maxWidth: '100vw',
          data: { company: data, action },
          direction: varDirection,
          autoFocus: false,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            if (action === 'add') {
              setTimeout(() => {
                this.refresh();
              }, 300);
              this.dataSource.data = [result, ...this.dataSource.data];
            } else {
              this.updateRecord(result);
            }
            this.refreshTable();
            this.showNotification(
              action === 'add' ? 'snackbar-success' : 'black',
              `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
              'bottom',
              'center'
            );
          }
        });
      }

    private updateRecord(updatedRecord: Company) {
      const index = this.dataSource.data.findIndex(
        (record) => record.idCompany === updatedRecord.idCompany
      );
      if (index !== -1) {
        this.dataSource.data[index] = updatedRecord;
        this.dataSource._updateChangeSubscription();
      }
    }

      deleteItem(row: Company) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.dataSource.data = this.dataSource.data.filter(
              (record) => record.idCompany !== row.idCompany
            );
            this.refreshTable();
            this.showNotification(
              'snackbar-danger',
              'Delete Record Successfully...!!!',
              'bottom',
              'center'
            );
          }
        });
      }

      private refreshTable() {
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
          .trim()
          .toLowerCase();
        this.dataSource.filter = filterValue;
      }

      isAllSelected() {
        return this.selection.selected.length === this.dataSource.data.length;
      }

      masterToggle() {
        this.isAllSelected()
          ? this.selection.clear()
          : this.dataSource.data.forEach((row) => this.selection.select(row));
      }

      removeSelectedRows() {
        const totalSelect = this.selection.selected.length;
        this.dataSource.data = this.dataSource.data.filter(
          (item) => !this.selection.selected.includes(item)
        );
        this.selection.clear();
        this.showNotification(
          'snackbar-danger',
          `${totalSelect} Record(s) Deleted Successfully...!!!`,
          'bottom',
          'center'
        );
      }

    loadData() {
      this.isLoading = true; // Start loading

      this.companyService.findAll().subscribe({
        next: (data) => {
          this.dataSource.data = data; // Assign the data to your data source
          this.refreshTable();
          this.dataSource.filterPredicate = (data: Company, filter: string) => {
            return Object.values(data).some((value) => {
              if (value === null || value === undefined) return false;

              // Si es objeto, accedemos a sus propiedades internas
              if (typeof value === 'object') {
                return Object.values(value).some((v) =>
                  v?.toString().toLowerCase().includes(filter)
                );
              }

              return value.toString().toLowerCase().includes(filter);
            });
          };
          this.isLoading = false; // Stop loading
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; // Stop loading on error
        },
      });
    }


    showNotification(
      colorName: string,
      text: string,
      placementFrom: MatSnackBarVerticalPosition,
      placementAlign: MatSnackBarHorizontalPosition
    ) {
      this.snackBar.open(text, '', {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    exportExcel() {

      const exportData = this.dataSource.filteredData.map((x) => ({
        ruc: x.ruc,
        'name': x.name,
        address: x.address,
        //'Birth Date': formatDate(new Date(x.birthDate), 'yyyy-MM-dd', 'en') || '',
        status: x.status === 1 ? 'Active' : 'Inactive',
      }));

      TableExportUtil.exportToExcel(exportData, 'excel');
    }

      onContextMenu(event: MouseEvent, item: Company) {
        event.preventDefault();
        this.contextMenuPosition = {
          x: `${event.clientX}px`,
          y: `${event.clientY}px`,
        };
        if (this.contextMenu) {
          this.contextMenu.menuData = { item };
          this.contextMenu.menu?.focusFirstItem('mouse');
          this.contextMenu.openMenu();
        }
      }

}
