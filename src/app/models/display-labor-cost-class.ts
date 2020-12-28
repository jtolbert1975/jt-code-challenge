export class DisplayLaborCostClass {
  constructor(
  public providers: Provider,
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

interface Provider {
  Provider: Total;
  type: string;
}
