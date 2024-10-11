import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { Dayjs } from "dayjs";
import { eventsQueryOptions } from "../queryOptions";

// const { TabPane } = Tabs;

export default function Analytics({
    ou,
    pe,
    sex,
}: {
    ou: string;
    pe: [Dayjs | null, Dayjs | null];
    sex?: string;
}) {
    const { isLoading, error, data } = useQuery(
        eventsQueryOptions({ ous: ou, pe, sex }),
    );
    if (isLoading) return <div>Loading...</div>;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (data)
        return (
            <Card style={{ borderRadius: "10px" }}>
                {/* <Tabs defaultActiveKey="1" centered>
                    <TabPane
                        tab={
                            <span>
                                <BarChartOutlined />
                                Column Graph
                            </span>
                        }
                        key="1"
                    >
                        <Bar {...barConfig} />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <PieChartOutlined />
                                Pie Chart
                            </span>
                        }
                        key="2"
                    >
                        <Pie {...pieConfig} />
                    </TabPane>
                </Tabs> */}

                <pre>{JSON.stringify(data, null, 2)}</pre>
            </Card>
        );
    return null;
}
