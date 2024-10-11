import Dexie, { Table } from "dexie";
import { OrgUnit } from "./interfaces";
export class CQIDexie extends Dexie {
  organisationUnits!: Table<OrgUnit>;
  constructor() {
    super("mccod");
    this.version(2).stores({
      organisationUnits: "id,value,key,title,pId",
    });
  }
}

export const db = new CQIDexie();
