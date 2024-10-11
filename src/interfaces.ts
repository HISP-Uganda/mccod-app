import type { TreeDataNode } from "antd";
export interface OrgUnit extends TreeDataNode {
    pId?: string;
    value: string;
    id: string;
    title: string;
    children?: OrgUnit[];
}
export type OrgUnits = {
    organisationUnits: OrgUnit[];
};

export interface AnalyticsStructure {
    headers: Array<Record<string, string>>;
    metaData: MetaData;
    rows: string[][];
    height: number;
    headerWidth: number;
    width: number;
}

interface MetaData {
    items: Record<string, { name: string }>;
    ouNameHierarchy: Record<string, string>;
    dimensions: Dimensions;
}

interface Dimensions {
    pe: string[];
    ou: string[];
    co: string[];
}

export interface SQLView {
    pager: Pager;
    listGrid: ListGrid;
}

interface ListGrid {
    metaData: MetaData;
    headerWidth: number;
    subtitle: string;
    width: number;
    title: string;
    height: number;
    headers: Header[];
    rows: string[][];
}

interface Header {
    hidden: boolean;
    meta: boolean;
    name: keyof AnalyticData;
    column: string;
    type: string;
}

interface Pager {
    page: number;
    pageCount: number;
    total: number;
    pageSize: number;
}

export interface AnalyticData {
    uidlevel1: string;
    uidlevel2: string;
    uidlevel3: string;
    uidlevel4: string;
    uidlevel5: string;
    rabKTDhptNW: null | string;
    pvIOzuzeYrI: null | string;
    gjDR8EJ4TYj: null | string;
    pv1jqIeNLbO: string;
    qPIRLHZ6dTm: string;
    au4gnriblmx: string;
    Dz3bAHiSjAf: string;
    E2fcwOxOuR4: string;
    daily: string;
    weekly: string;
    weeklywednesday: string;
    weeklythursday: string;
    weeklysaturday: string;
    weeklysunday: string;
    biweekly: string;
    monthly: string;
    bimonthly: string;
    quarterly: string;
    sixmonthly: string;
    sixmonthlyapril: string;
    sixmonthlynov: string;
    yearly: string;
    financialapril: string;
    financialjuly: string;
    financialoct: string;
    financialnov: string;
    vlcuyaFe8XA: null | string;
    EF7Cwwpegv1: null | string;
    ef2RxnUK9ac: null | string;
    RgNQcLejbwX: null | number;
    TY4BoFr95UI: null | string;
    rVZlkzOwWhi: null | number;
    megrn75m57y: null | string;
    vj0HLP3eHbe: null | string;
    f9bjMbi3j3j: null | string;
    gB9GbPqeAzv: null | string;
    y3hJLGjctPk: string;
    iInAQ40vDGZ: string;
    WQcY6nfPouv: string;
    pIl8z4w8msL: string;
    EvGGaaviqOn: string;
    WEudJ6nxlzz: string;
    TG1QzFgGTex: string;
    kHRn35W3Gq4: string;
    VWxBILfLC9s: string;
    eCbusIaigyj: string;
    rFSjQbZjJwF: string;
    AETf2xvUmc8: string;
    eZrfD4QnQfl: null | string;
    psi: string;
    pi: string;
    ps: string;
    ao: string;
    enrollmentdate: string;
    incidentdate: string;
    executiondate: string;
    duedate: string;
    completeddate: null | string;
    created: string;
    lastupdated: string;
    storedby: string;
    pistatus: string;
    psistatus: string;
    psigeometry: null | string;
    longitude: null | string;
    latitude: null | string;
    ou: string;
    ouname: string;
    oucode: null | string;
    oulevel: number;
    ougeometry: Record<string, string>;
    pigeometry: null | string;
    tei: string;
}
