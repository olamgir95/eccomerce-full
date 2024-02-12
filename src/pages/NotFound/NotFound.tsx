import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will go back one step in history
  };

  return (
    //@ts-nocheck
    <div
      className=" flex justify-center items-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url("/notfound.jpg")' }}
    >
      <div className="message-box gap-5 items-center text-3xl flex-col text-white flex">
        <h1 className="text-center">404</h1>
        <p>Page not found</p>
        <div className="buttons-con">
          <div className="action-link-wrap flex items-center  gap-8">
            <Button
              onClick={handleGoBack}
              className="link-button bg-primary link-back-button text-white px-2 hover:bg-orange-500 capitalize"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="link-button bg-primary text-white px-2 hover:bg-orange-500 capitalize"
            >
              Go to Home Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
