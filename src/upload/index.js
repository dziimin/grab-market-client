import { FundTwoTone } from "@ant-design/icons";
import {
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Descriptions,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageURL, setimageURL] = useState(null);
  const history = useHistory(); // React hook 중 하나
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageURL: imageURL,
      })
      .then((result) => {
        console.log(result);
        history.replace("/"); // 이전 페이지로 돌아간다
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status == "done") {
      const response = info.file.response;
      const imageURL = response.imageURL;
      //setimageURL(imageURL); 2025.02.12 수정
      setimageURL(imageURL.replace(/\\/g, "/")); // 강제 치환
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageURL ? (
              <img id="upload-img" src={`${API_URL}/${imageURL}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />{" "}
                <span>이미지를 업로드 해주세요.</span>{" "}
              </div>
            )}
            {/* name : 포스트맨 - upload image - Key , action : 목적지 */}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          name="seller"
          label={<div class="upload-label">판매자 명</div>}
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: "상품 소개를 입력해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
