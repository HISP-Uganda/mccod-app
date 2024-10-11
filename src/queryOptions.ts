import { queryOptions } from "@tanstack/react-query";
import { getDHIS2Resource } from "./dhis2";
import { OrgUnit } from "./interfaces";
import { db } from "./db";

export const initialQueryOptions = queryOptions({
  queryKey: [],
  queryFn: async () => {
    const { dataViewOrganisationUnits } = await getDHIS2Resource<{
      dataViewOrganisationUnits: Array<{
        id: string;
        name: string;
        leaf: boolean;
        parent: { id: string };
      }>;
    }>({
      resource: "me.json",
      params: {
        fields: "dataViewOrganisationUnits[id,name,leaf,parent]",
      },
    });
    const { options } = await getDHIS2Resource<{
      options: Array<{ value: string; label: string }>;
    }>({
      resource: `optionSets/v49HLVv7S5F/options`,
      params: {
        fields: "code~rename(value),name~rename(label)",
      },
    });

    const { options: gender } = await getDHIS2Resource<{
      options: Array<{ value: string; label: string }>;
    }>({
      resource: `optionSets/jKGM574bFRG/options`,
      params: {
        fields: "code~rename(value),name~rename(label)",
      },
    });
    const organisationUnits = dataViewOrganisationUnits.map(
      ({ id, name, leaf, parent }) => {
        let current: OrgUnit = {
          id,
          title: name,
          isLeaf: leaf,
          value: id,
          key: id,
        };

        if (parent && parent.id) {
          current = {
            ...current,
            pId: parent.id,
          };
        }
        return current;
      }
    );
    await db.organisationUnits.bulkPut(organisationUnits);
    return {
      orgUnit: dataViewOrganisationUnits[0].id,
      clientCategories: options,
      gender,
    };
  },
});
