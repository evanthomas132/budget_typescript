import Header from "./components/Header/Header";
import "./index.css";
import Spline from "@splinetool/react-spline";
import {useState} from "react";

function App() {
  const [showSpline, setShowSpline] = useState(true);

  return (
      <div className="App">
        <Header title={"Budget Tracker"} />

        <div className="spline">
          {showSpline && <Spline scene="https://prod.spline.design/NeBOTdRHfSMbCWZm/scene.splinecode" />}
        </div>
      </div>
  );
}

export default App;
