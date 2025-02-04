import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

function ProductPage() {
  //const prams = useParams(); 를 desturcturing (jsx 문법)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(function () {
    // useEffect 렌더링 될때 한번만 호출되게끔
    axios
      .get(
        `https://612454ab-178d-4293-8332-ba86306a4bea.mock.pstmn.io/products/${id}`
      )
      .then(function (result) {
        setProduct(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []); // [] 처음 렌더링 시에만 호출

  if (product === null) {
    return <h1>상픔 정보를 받고 있습니다...</h1>;
  }
  return (
    <div>
      <div id="image-box">
        <img src={"/" + product.imageURL} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price.toLocaleString("ko-KR")}원</div>
        <div id="createdAt">2025년 2월 4일</div>
        <div id="despcription">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductPage;
