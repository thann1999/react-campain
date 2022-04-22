import React, { useEffect, useState } from "react";
import { Table, Input, Button, message, Card, Pagination, Modal } from "antd";
import Wrapper from "../../common/Wrapper";
import { ReloadOutlined } from "@ant-design/icons";
import CreateCampaign from "./CreateCampaign";
import MockService from "../../services/mock.service";

const { Search } = Input;

export default function Campaign() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const params = {
        page: page,
        search: searchTxt,
      };
      const serviceData = MockService.getData(params);
      const tableData = serviceData.data.map((element, index) => ({
        ...element,
        key: index,
      }));
      setData(tableData);
      setTotal(serviceData.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Đã có lỗi xảy ra!");
    }
    // (async () => {
    //   try {
    //     const params = {
    //       enterprisenum: searchTxt,
    //       page: page,
    //     };
    //     const response = await CustomerCareService.getPackageAlert(params);
    //     if (response.status === 200) {
    //       const tableData = response.data.rows.map((element, index) => ({
    //         ...element,
    //         key: index,
    //       }));
    //       setData(tableData);
    //       setTotal(response.data.count);
    //       setLoading(false);
    //     } else {
    //       throw new Error();
    //     }
    //   } catch (error) {
    //     message.error("Đã có lỗi xảy ra!");
    //     setLoading(false);
    //   }
    // })();
  }, [refresh, searchTxt, page]);

  /*
  "enterprise_number": "0899186896",
            "createdAT": "2022-04-07T00:00:00.000Z",
            "expire_date": "2022-05-07T00:00:00.000Z",
            "total_time_package": 60000,
            "total_time_remain": 58200,
            "luuluongphatsinh": 12667,
            "Tylesudung": "10.72 %",
            "tyle": "0.1072"
  */

  const columns = [
    {
      dataIndex: "id",
      title: "ID",
      key: "id",
      witdh: "60px",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Tên Campaign",
    },
    {
      dataIndex: "sdtList",
      key: "sdtList",
      title: "Danh sách SDT",
    },
    {
      dataIndex: "audioFile",
      key: "audioFile",
      title: "File Audio",
    },
    {
      dataIndex: "startDate",
      key: "startdate",
      title: "Ngày bắt đầu",
    },

    {
      dataIndex: "endDate",
      title: "Ngày kết thúc",
      key: "endDate",
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      key: "status",
    },
  ];

  const handleSearch = (value) => {
    if (value !== searchTxt) {
      setLoading(true);
      setPage(1);
      setSearchTxt(value.trim());
    }
  };

  const handlePageChange = (value) => {
    setLoading(true);
    setPage(value);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      <Card
        extra={
          <>
            <div style={{ display: "flex" }}>
              <Search
                placeholder="Nhập tên campaign"
                onSearch={handleSearch}
                style={{ width: 300 }}
                enterButton="Search"
              />
              <Button
                icon={<ReloadOutlined />}
                style={{
                  marginLeft: 5,
                  width: 120,
                  backgroundColor: "orange",
                  color: "white",
                }}
                onClick={() => refreshPage()}
              >
                Refresh
              </Button>
              <CreateCampaign />
            </div>
          </>
        }
      >
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
        <Pagination
          style={{ float: "right", marginTop: 10 }}
          pageSize={10}
          total={total}
          current={page}
          onChange={handlePageChange}
        />
      </Card>
    </Wrapper>
  );
}
