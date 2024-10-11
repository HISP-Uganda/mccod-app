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
