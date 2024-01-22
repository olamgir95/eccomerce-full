import React from "react";
import { Route, Routes, useSearchParams, useMatch } from "react-router-dom";
import VisitOtherPage from "./OtherPage";
import VisitMyPage from "./MyPage";

function MemberPage() {
  const [searchParams] = useSearchParams();
  const member = useMatch("/member-page/*");
  const chosen_mb_id = searchParams.get("mb_id") || null;
  const chosen_art_id = searchParams.get("art_id") || null;

  return (
    <div className="member_page">
      <Routes>
        <Route
          path={`${member}`}
          element={<VisitMyPage chosen_mb_id={chosen_mb_id} />}
        />
        <Route
          path={`${member}/other`}
          element={
            <VisitOtherPage
              chosen_mb_id={chosen_mb_id}
              chosen_art_id={chosen_art_id}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default MemberPage;
