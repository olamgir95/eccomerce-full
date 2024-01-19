import Cookies from "universal-cookie";
import { serverApi } from "../../lib/config";
import { Member } from "../../types/user";

const cookie = new Cookies();
let member_data: any = null;

if (cookie.get("access_token")) {
  const memberDataJson: any = localStorage.getItem("member_data")
    ? localStorage.getItem("member_data")
    : null;
  member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
  if (member_data) {
    member_data.mb_image = member_data.mb_image
      ? `${serverApi}/${member_data.mb_image}`.replace(/\\/g, "/")
      : "/auth/default_user.svg";
  }
} else {
  localStorage.removeItem("member_data");
}

console.log("== verify ==");
console.log(member_data);

export const verifyMemberData: Member = member_data ?? null;
