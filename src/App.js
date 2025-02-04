import "./App.css";
import MainPageComponent from "./main/index.js";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
//import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
function App() {
  const history = useHistory();
  return (
    <div>
      <div>
        <div id="header">
          {/* App.js가 가장 상위컴포넌트 이므로 어떤 페이지로 이동하더라도 이 헤더와 바디를 가지고 있는다 */}
          <div id="header-area">
            <Link to="/">
              <img src="/images/icons/logo.png" /> {/* 절대 경로로 표시 */}
            </Link>
            <Button
              size="large"
              onClick={function () {
                history.push("/upload");
              }}
              icon={<DownloadOutlined />}
            >
              상품 업로드
            </Button>
          </div>
        </div>
        <div id="body">
          <Switch>
            <Route exact={true} path="/">
              <MainPageComponent />
            </Route>
            <Route exact={true} path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact={true} path="/upload">
              <UploadPage />
            </Route>
          </Switch>
        </div>
        <div id="footer"></div>
      </div>
    </div>
  );
}

export default App;
