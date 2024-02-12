import { ChangeEvent, MouseEvent, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../assets/images/logo.svg";
import { TextField } from "@mui/material";
import MemberApiService from "../../app/ApiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import BackButton from "../../components/designLayouts/buttons/BackButton";
import assert from "assert";

const SignUp = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [errClientName, setErrClientName] = useState<string>("");
  const [errPhone, setErrPhone] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);

    setErrPhone("");
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (checked) {
        if (!clientName) {
          setErrClientName("Enter your name");
        }

        if (!phone) {
          setErrPhone("Enter your phone number");
        }
        if (!password) {
          setErrPassword("Create a password");
        } else {
          if (password.length < 4) {
            setErrPassword("Passwords must be at least 4 characters");
          }
        }

        if (isNaN(Number(phone))) {
          setErrPhone("Please enter only number for phone number");
        }
      }
      assert.ok(Number(phone), "Please enter only number for phone number");

      const signup_data = {
        mb_nick: clientName,
        mb_password: password,
        mb_phone: phone,
      };
      assert.ok(!errClientName, errClientName);
      assert.ok(!errPassword, errPassword);
      assert.ok(!errPhone, errPhone);
      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(signup_data);

      await sweetTopSmallSuccessAlert("Sign up successfully", 700, true);
      navigate("/");
      return true;
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-start ">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <h1 className="sm:text-3xl text-xl align-middle text-orange-500 font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={logoLight} alt="" className="max-w-[40px]" />
              FurniShop
            </h1>
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with FurniShop
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
                Access all FurniShop services
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
            <p
              onClick={() => navigate("/")}
              className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300"
            >
              © FurniShop
            </p>
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
      <div className="w-full lgl:w-[500px] h-full -mt-32 flex flex-col justify-center">
        <form className="w-full mt-32 lgl:w-[500px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-sans underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-4xl mb-4">
              Create your account
              <BackButton onClick={() => navigate(-1)} />
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

              {/* Phone Number */}
              <div className="flex flex-col gap-.5">
                <TextField
                  id="outlined-password-input"
                  label="Phone Number"
                  type="phone"
                  onChange={handlePhone}
                  value={phone}
                />
                {errPhone && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPhone}
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

              {/* Checkbox */}
              <div className="flex items-start mdl:items-center gap-2">
                <input
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                  type="checkbox"
                />
                <p className="text-sm text-primeColor">
                  I agree to the FurniShop
                  <span className="text-blue-500"> Terms of Service </span> and
                  <span className="text-blue-500"> Privacy Policy</span>.
                </p>
              </div>
              <button
                onClick={handleSignUp}
                className={`${
                  checked
                    ? "bg-blue-500 hover:bg-blue-700   cursor-pointer"
                    : " bg-blue-300 hover:bg-blue-400  cursor-none"
                } w-full  text-base font-medium h-10 rounded-md text-white duration-300`}
              >
                Create Account
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?
                <Link to="/signin">
                  <span className="ml-2 text-blue-400 hover:text-blue-600 duration-300">
                    Sign in
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

export default SignUp;
