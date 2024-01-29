import { ChangeEvent, MouseEvent, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../assets/images/logo.png";
import { TextField } from "@mui/material";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import MemberApiService from "../../app/ApiServices/memberApiService";
import BackButton from "./../../components/designLayouts/buttons/BackButton";

const SignIn = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [errClientName, setErrClientName] = useState<string>("");

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName("Enter your name");
    }

    if (!password) {
      setErrPassword("Please enter correct password");
    }

    if (clientName && password) {
      setClientName("");
      setPassword("");
    }

    try {
      const login_data = {
        mb_nick: clientName,
        mb_password: password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      await sweetTopSmallSuccessAlert("Log in successfully", 500, true);
      navigate("/");
      // window.location.reload();
      return true;
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={logoLight} alt="" className="max-w-[50px]" />
              Shopsy
            </h1>
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Shopsy
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Shopsy services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © Shopsy
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 ">
        <form className="w-full lgl:w-[450px] h-screen flex  justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-sans underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
              <BackButton onClick={() => navigate("/")} />
            </h1>
            <div className="flex flex-col gap-3">
              {/* client name */}
              <div className="flex flex-col gap-.5">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={clientName}
                  onChange={handleName}
                />
                {errClientName && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errClientName}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handlePassword}
                  value={password}
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>

              <button
                onClick={handleSignUp}
                className="bg-blue-400 hover:bg-blue-600  hover:text-lg text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Sign In
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?
                <Link to="/signup">
                  <span className="ml-2 text-blue-400 hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
