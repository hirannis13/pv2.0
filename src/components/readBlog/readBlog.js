import { useLocation } from "react-router-dom";
import BlogFull from "../guidelines/blogfull";

function ReadBlog() {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <>
      <BlogFull data={data}></BlogFull>
    </>
  );
}
export default ReadBlog;
