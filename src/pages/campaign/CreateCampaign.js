import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  DatePicker,
  Modal,
  Spin,
} from "antd";
import validateMessages from "../../common/ValidateForm";
import { ReloadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import audio from "../../assets/audio/audio.wav";
import UploadXLSX from "./UploadXLSX";
import UploadAudio from "./UploadAudio";
import { DATE_TIME_FORMAT } from "../../const/date-time.const";
import dayjs from "dayjs";
import { convertDateByFormat } from "../../helper/convert-date.helper";
import MockServe from "../../services/mock.service";
import CampaignAPI from "../../api/campaign.api";

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
    MockServe.addData(name, '', audio.name, startDateFormat, endDateFormat)

    const response = await CampaignAPI.createCampaign(formData)
    if(response.status === 200) {
      message.success(response.data.message)
    } else {
      message.error(response.data.message)
    }
    setSpinning(false)
    setVisible(false);

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
