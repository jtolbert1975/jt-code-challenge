export class LaborCostClass {
  constructor(
    public providers: Providers,
    public directContractors: DirectContractors,
    public totals: Total
  ){}

}


interface ComplianceStatus {
   OpsEmpStatusChecked: number;
   Total: number;
   TaxStatus: number;
   Identification: number;
   RightToWork: number;
   OpsChecked: number;
   Contract: number;

}

interface Total {
  rebatesTotal: number;
  grossPayTotal: number;
  workerCount: number;
  complianceStats: ComplianceStatus;
  payrollAdminTotal: number;
  labourCostTotal: number;
  providerId: number;
  name: string;
}

interface Providers {
  Provider: Total;
}

interface DirectContractors {
  DirectContractor: Total;
}
