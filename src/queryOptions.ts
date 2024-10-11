import { queryOptions } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { db } from "./db";
import { getDHIS2Resource } from "./dhis2";
import { AnalyticsStructure, OrgUnit } from "./interfaces";

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
            },
        );
        await db.organisationUnits.bulkPut(organisationUnits);
        return {
            orgUnit: dataViewOrganisationUnits[0].id,
            clientCategories: options,
            gender,
        };
    },
});

export const eventsQueryOptions = ({
    ous,
    pe,
    sex,
}: {
    ous: string;
    pe: [Dayjs | null, Dayjs | null];
    sex?: string;
}) => {
    return queryOptions({
        queryKey: [
            ous,
            pe[0]?.format("YYYY-MM-DD"),
            pe[1]?.format("YYYY-MM-DD"),
            sex,
        ],
        queryFn: async () => {
            if (ous && pe[0] && pe[1]) {
                const params = new URLSearchParams();
                params.append("hierarchyMeta", "true");
                params.append("filter", `ou:${ous}`);
                params.append("ouMode", "DESCENDANTS");
                params.append("dimension", "sfpqAeqKeyQ");
                params.append("startDate", pe[0].format("YYYY-MM-DD"));
                params.append("endDate", pe[1].format("YYYY-MM-DD"));
                params.append("limit", "20");
                params.append("sortOrder", "DESC");
                if (sex) {
                    params.append("filter", `e96GB4CXyd3:eq:${sex}`);
                }

                const results = await getDHIS2Resource<AnalyticsStructure>({
                    resource: `analytics/events/aggregate/vf8dN49jprI?${params.toString()}`,
                });
                return results.rows.map((row) => ({
                    disease: row[0],
                    count: Number(row[1]),
                }));
            }
            return [];
        },
    });
};
