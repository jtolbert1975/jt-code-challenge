import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from './services/data.service';
import { DisplayLaborCostClass } from './models/display-labor-cost-class';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,  AfterViewInit {


 constructor(private dataService: DataService){}

  title = 'jt-code-challenge';
  costs: any = [];
  displayLists: DisplayLaborCostClass[] = [];
  displayedColumns: string[] = ['name', 'workerCount', 'complianceStats', 'blankColumn', 'grossPayTotal', 'payrollAdminTotal', 'labourCostTotal', 'blankColumn2', 'workerPercentage'];
  footerColumns: string[] = ['workerCount'];
  providerList: any;
  dataSource: any;
  sortedData: DisplayLaborCostClass[] = [];

  @ViewChild(MatSort) sort: MatSort | undefined;

 // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dataService.getLaborCost()
    .subscribe((data: any) => {
      this.costs = data;
      // console.log('TheCosts: ', this.costs);
      if (this.costs){
      this.displayLists = this.dataService.setDisplayList(this.costs);
      }


      this.providerList = this.displayLists[0].providers;
      this.dataSource = new MatTableDataSource(this.providerList);


    });
  }

  ngAfterViewInit(): any {
    console.log('Sort: ', this.sort);
    this.dataSource.sort = this.sort;

  }

  public getTotals(column: any): any {
    let results: any;
    if (this.displayLists){
      const columnValue: any = this.displayLists[1].totals;
      results = (column === 'Total') ? 'Total' : columnValue[0][column];
    }

    return results;

   }

   getTotalValue(val: any, column: any): any{
     if (val === column ) {
       return val;
     }

   }

   setWorkForce(providerList: any, workerTotal: any): any {
     console.log('providerList: ', providerList);
     console.log('workerTotal: ', workerTotal[0].workerCount);
     const totalWorkers = workerTotal[0].workerCount;
     const newProviderList: any = [];
     for (const item of providerList){
       const providerWorkers = item.workerCount;
       const workerPercentage = providerWorkers / totalWorkers;

       item.workerPercentage = workerPercentage;

       newProviderList.push(item);
     }
     console.log(newProviderList);
     return newProviderList;

   }

}
