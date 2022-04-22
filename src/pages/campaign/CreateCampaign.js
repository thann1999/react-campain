import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button, DatePicker, Form,
  Input, message, Modal,
  Spin
} from "antd";
import React, { useEffect, useState } from "react";
import CampaignAPI from "../../api/campaign.api";
import validateMessages from "../../common/ValidateForm";
import { DATE_TIME_FORMAT } from "../../const/date-time.const";
import { convertDateByFormat } from "../../helper/convert-date.helper";
import MockServe from "../../services/mock.service";
import UploadAudio from "./UploadAudio";
import UploadXLSX from "./UploadXLSX";

export default function CreateCampaign() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState([])
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await CustomerCareService.getAllPackages();
    //     if (response.status === 200) {
    //       setPackageOptions(response.data);
    //     } else {
    //       message.error("Không có danh sách packages!");
    //     }
    //   } catch (error) {
    //     message.error("Có lỗi xảy ra!");
    //   }
    // })();
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = async (values) => {
    setSpinning(true);
    const {name, startDate, endDate} = values
    const startDateFormat = convertDateByFormat(startDate, DATE_TIME_FORMAT.CROSS_DATE)
    const endDateFormat = convertDateByFormat(endDate, DATE_TIME_FORMAT.CROSS_DATE)
    const formData = new FormData()

    formData.append('name', name)
    formData.append('phoneNumber', phoneNumber.toString())
    formData.append('audio', audio)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)

    try {
      const response = await CampaignAPI.createCampaign(formData)
      setSpinning(false)

      if(response.status === 200) {
        message.success(response.data.message)
        MockServe.addData(name, audio.name, startDateFormat, endDateFormat)
        setVisible(false);
        return
      }

      message.error(response.data.message)
      setSpinning(false)
    } catch (error) {
      setSpinning(false)
    }

    


    // try {
    //   const foundPackage = packageOptions.find(
    //     (element) => element.package_id === values.package_type
    //   );
    //   const body = {
    //     enterprise_number: values.enterprise_number,
    //     date: values.date.format("YYYY-MM-DD HH:mm:ss"),
    //     duration: foundPackage.duration,
    //   };
    //   const response = await CustomerCareService.registerKhaiBao(body);
    //   if (response.status === 200) {
    //     message.success("Đăng ký thành công.");
    //     form.resetFields();
    //     setSpinning(false);
    //     setVisible(false);
    //   }
    // } catch (error) {
    //   message.error("Đã có lỗi xảy ra!");
    //   setSpinning(false);
    // }
  };

  const onShowModal = () => {
    setVisible(true);
  };

  const onHideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ marginLeft: 5, width: 150 }}
        onClick={() => onShowModal()}
      >
        Tạo campaign
      </Button>

      {visible && <Modal
        title="Tạo campagin"
        visible={visible}
        onCancel={onHideModal}
        footer={
          <>
            <Button form="registerForm" htmlType="submit" type="primary" disabled={spinning}>
              Tạo campaign
            </Button>
            <Button onClick={() => onHideModal()} type="primary" danger>
              Hủy
            </Button>
          </>
        }
      >
        <Spin spinning={spinning}>
          <Form
            onFinish={onSubmit}
            form={form}
            {...layout}
            validateMessages={validateMessages}
            id="registerForm"
          >
            <Form.Item
              label="Tên campaign"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
              name={"name"}
            >
              <Input placeholder="Vui lòng nhập tên campaign" />
            </Form.Item>
            {/* <audio src={audio} controls>
              <p>Fallback content goes here.</p>
            </audio> */}
            <Form.Item label="Danh sách SDT" name={"sdtList"}>
              <UploadXLSX setPhoneNumber={setPhoneNumber} />
            </Form.Item>

            <Form.Item label="Audio" name={"audio"}>
              <UploadAudio setAudio={setAudio} />
            </Form.Item>
            <Form.Item
              label="Ngày bắt đầu"
              rules={[
                {
                  required: true,
                },
              ]}
              name={"startDate"}
            >
              <DatePicker
                placeholder="Vui lòng chọn thời gian"
                format={DATE_TIME_FORMAT.CROSS_DATE}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Ngày kết thúc"
              rules={[
                {
                  required: true,
                },
              ]}
              name={"endDate"}
            >
              <DatePicker
                placeholder="Vui lòng chọn thời gian"
                format={DATE_TIME_FORMAT.CROSS_DATE}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>}
      
    </>
  );
}
