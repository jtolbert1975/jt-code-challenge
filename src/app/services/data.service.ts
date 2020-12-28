import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaborCostClass } from '../models/labor-cost-class';
import { LaborCosts } from '../models/labor-costs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DisplayLaborCostClass } from '../models/display-labor-cost-class';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiServer = 'http://localhost:6502/application/labourstats';
  public laborCosts: LaborCosts[] = [];
  public displayLaborCost: DisplayLaborCostClass[] = [];
  constructor(private httpClient: HttpClient

    ) { }

  public getLaborCost(): any {
    return this.httpClient.get(this.apiServer);
   }

 public setDisplayList(costs: any): any {

  const directContractors: any = costs[0].directContractors;
  const providers: any = costs[0].providers;
  const totals: any = costs[0].total;




  // tslint:disable-next-line:no-unused-expression
  (directContractors) ? this.addDirectContractorType(directContractors) : [];
  // tslint:disable-next-line:no-unused-expression
  (providers) ? this.addProviderType(providers) : [];





  this.displayLaborCost = this.createDisplayList(directContractors, providers, totals);



  return  this.displayLaborCost;

 }

   private addDirectContractorType(contractor: any): any{

     // tslint:disable-next-line:prefer-const
     const newContractorItems: any = [];
     const length = contractor.length;

     // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < length; i++){

      contractor[i].type = 'directcontractor';
      console.log('Contracotr: ', contractor);
      newContractorItems.push(contractor);
     }


     return newContractorItems;
   }

   private addProviderType(providers: any): any{

    // tslint:disable-next-line:prefer-const
    const newProviderItems: any = [];
    const length = providers.length;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < length; i++){

      providers[i].type = 'provider';

      newProviderItems.push(providers);
    }


    return newProviderItems;
  }

  private createDisplayList(directContractors: any, providers: any, totals: any): any{
    const providerList: any = [];


    if (directContractors.length > 0){
      const testList: any = [];
      for (const item of directContractors){
        testList.push(item);
      }

      providerList[0] = {providers: testList} ;
    }

    if (providers.length > 0) {
      const testList: any = [];
      for (const item of providers){
        providerList[0].providers.push(item);
      }



    }


    if (totals.length > 0){
      const testList: any = [];
      for (const item of totals){
        testList.push(item);
        // console.log('ProviderLIst1: ', testList);
      }

      providerList[1] = {totals: testList} ;

    }

    console.log(providerList[0].providers);
    if (providerList){

      // tslint:disable-next-line:prefer-for-of
       for (let i = 0; i < providerList[0].providers.length; i++){
         if (providerList[0].providers[i].complianceStats === null){

           providerList[0].providers[i].complianceStats = {Total: 0};
         }
      }


      }

    this.setWorkerPercentage(providerList);
    this.setTotalWorkersPercentage(providerList);


    return providerList;


  }

  setWorkerPercentage(providerList: any): any {
    const providers = providerList[0];
    const totalWorkers = providerList[1].totals[0].workerCount;
    const newProviderList: any = [];

    for (const item of providers.providers){
       const providerWorkers = item.workerCount;
       const workerPercentage = providerWorkers / totalWorkers;

       item.workerPercentage = workerPercentage;


       newProviderList.push(item);
     }



  }

  setTotalWorkersPercentage(providerList: any): any {
    let totals = providerList[1];
    const providers = providerList[0];
    let scoreTotal: any = 0;
    for (const item of providers.providers){
      scoreTotal += item.workerPercentage;
      totals = {totalWorkPercentage: scoreTotal};
    }

  }


}
