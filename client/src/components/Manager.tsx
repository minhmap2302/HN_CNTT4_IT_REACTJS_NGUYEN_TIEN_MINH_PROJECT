import Header from "../pages/Header";
import { Outlet, useParams } from "react-router-dom";
import Footer from "../pages/Footer";

export default function Manager() {
  const {userId} = useParams();
    console.log("id Management :",userId);
  return (
    <>
      <Header></Header>
      <div className="pt-[50px] pb-[60px]">
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
}
