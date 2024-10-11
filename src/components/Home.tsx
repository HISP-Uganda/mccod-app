import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";
import { Bar, Pie } from "@ant-design/plots";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  DatePicker,
  Layout,
  Row,
  Select,
  Tabs,
  Typography,
} from "antd";
import { useState } from "react";
import { initialQueryOptions } from "../queryOptions";
import OrgUnitSelect from "./OrgUnitSelect";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Title } = Typography;

interface Header {
  name: string;
  column: string;
  type: string;
  hidden: boolean;
  meta: boolean;
}

const Home: React.FC = () => {
  const {
    data: { orgUnit, gender, clientCategories },
  } = useSuspenseQuery(initialQueryOptions);

  const [value, setValue] = useState<string>(orgUnit);

  const data = [
    { category: "A", value: 30 },
    { category: "B", value: 70 },
    { category: "C", value: 45 },
  ];

  const barConfig = {
    data,
    xField: "value",
    yField: "category",
    seriesField: "category",
    color: ["#00c1de", "#ff69b4", "#ffec3d"],
  };

  const pieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "category",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <Layout
      style={{ minHeight: "100vh", minWidth: "100vw", background: "#f0f2f5" }}
    >
      <Header
        style={{
          background: "#1D5288",
          color: "white",
          fontSize: "28px",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        HMIS 100 Health Dashboard
      </Header>
      <Content
        style={{
          padding: "10px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Card style={{ marginBottom: "30px", borderRadius: "10px" }}>
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Filters
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <label>Organisation Unit</label>
              <OrgUnitSelect
                value={value}
                onChange={(value) => setValue(() => value)}
              />
            </Col>
            <Col span={8}>
              <label>Organisation Unit Level</label>
              <Select placeholder="Select Filter 2" style={{ width: "100%" }}>
                <Option value="filter2">Filter 2</Option>
              </Select>
            </Col>
            <Col span={8}>
              <label>Client Category</label>
              <Select
                placeholder="Client Category"
                style={{ width: "100%" }}
                options={clientCategories}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col span={6}>
              <label>Gender</label>
              <Select
                placeholder="Gender"
                style={{ width: "100%" }}
                options={gender}
              />
            </Col>
            <Col span={6}>
              <label>All Deaths Mortality Filter</label>
              <Select
                placeholder="All Deaths Mortality"
                style={{ width: "100%" }}
              >
                <Select.Option value="Stillbirth">Stillbirth</Select.Option>
                <Select.Option value="Neonatal">Neonatal</Select.Option>
                <Select.Option value="Early Neonatal">
                  Early Neonatal
                </Select.Option>
                <Select.Option value="Infant">Infant</Select.Option>
                <Select.Option value="Under-five">Under-five</Select.Option>
                <Select.Option value="Adolescent">Adolescent</Select.Option>
                <Select.Option value="Adult">Adult</Select.Option>{" "}
              </Select>
            </Col>
            <Col span={6}>
              <label>Filter Deaths</label>
              <Select placeholder="All Deaths" style={{ width: "100%" }}>
                <Select.Option value="">All Diseases</Select.Option>
                <Select.Option value="Malaria Deaths">
                  Malaria Deaths
                </Select.Option>
                <Select.Option value="TB Deaths">TB Deaths</Select.Option>
                <Select.Option value="HIV Related Deaths">
                  HIV Related Deaths
                </Select.Option>
                <Select.Option value="Deaths from cardiovascular diseases">
                  Cardiovascular Disease
                </Select.Option>
                <Select.Option value="Cancer Deaths">Cancer</Select.Option>
                <Select.Option value="Obstructive Pulmonary Disease">
                  Chronic Obstructive Pulmonary Disease
                </Select.Option>
                <Select.Option value="Diabetes Mellitus">
                  Diabetes Mellitus
                </Select.Option>
                <Select.Option value="Premature noncommunicable disease (NCD)">
                  Premature noncommunicable disease (NCD)
                </Select.Option>
                <Select.Option value="covid19">covid-19</Select.Option>
                <Select.Option value="pneumonia">pneumonia</Select.Option>
                <Select.Option value="Road traffic accidents">
                  Road traffic accidents
                </Select.Option>
                <Select.Option value="Suicide">Suicide</Select.Option>
                <Select.Option value="Maternal deaths">
                  Maternal deaths
                </Select.Option>
                <Select.Option value="injuries">Traffic Injuries</Select.Option>
                <Select.Option value="Total NCD Deaths">
                  Total Deaths from NCDs
                </Select.Option>
                <Select.Option value="Total Communicable Deaths">
                  Total Deaths from communicable Diseases
                </Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <label>Date Range</label>
              <RangePicker style={{ width: "100%" }} />
            </Col>
          </Row>
        </Card>

        {/* Lower Section: Tabs and Graphs */}
        <Card style={{ borderRadius: "10px" }}>
          <Tabs defaultActiveKey="1" centered>
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
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default Home;
