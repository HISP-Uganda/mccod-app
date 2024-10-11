import type { TreeSelectProps, TreeDataNode } from "antd";
import { TreeSelect } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { FC } from "react";
import { getDHIS2Resource } from "../dhis2";
import { db } from "../db";

interface OrgUnit extends TreeDataNode {
  pId?: string;
  value: string;
  id: string;
  title: string;
  children?: OrgUnit[];
}

const OrgUnitSelect: FC<{
  value: string;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  const organisationUnits = useLiveQuery(() => db.organisationUnits.toArray());

  const onLoadData: TreeSelectProps["loadData"] = async ({ value }) => {
    if (value) {
      const { children } = await getDHIS2Resource<{
        children: Array<{
          id: string;
          name: string;
          leaf: boolean;
        }>;
      }>({
        resource: `organisationUnits/${value}`,
        params: {
          fields: "children[id,name,leaf]",
        },
      });

      const organisationUnits = children.map(({ id, name, leaf }) => {
        const current: OrgUnit = {
          id,
          title: name,
          isLeaf: leaf,
          value: id,
          key: id,
          pId: value.toString(),
        };
        return current;
      });
      await db.organisationUnits.bulkPut(organisationUnits);
    }
  };
  return (
    <TreeSelect
      treeDataSimpleMode
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Please select"
      onChange={onChange}
      loadData={onLoadData}
      treeData={organisationUnits}
    />
  );
};

export default OrgUnitSelect;
