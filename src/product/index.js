import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs"; // 날짜 가공 라이브러리
import { Button, message } from "antd";

function ProductPage() {
  //const prams = useParams(); 를 desturcturing (jsx 문법)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/purchase/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    // useEffect 렌더링 될때 한번만 호출되게끔
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []); // [] 처음 렌더링 시에만 호출

  useEffect(function () {
    getProduct();
  }, []);

  if (product === null) {
    return <h1 id="product-headline">상품 정보를 받고 있습니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        {/* <img src={"/" + product.imageURL} />2025.02.12 수정 */}
        <img src={`${API_URL}/${product.imageURL}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price.toLocaleString("ko-KR")}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          재빨리 구매하기
        </Button>
        <pre id="despcription">{product.description}</pre> {/* pre : 줄바꿈 */}
      </div>
    </div>
  );
}

export default ProductPage;
