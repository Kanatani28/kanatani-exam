import Rocon from "rocon/react";
import TopPage from "./components/page/TopPage";
import ExamPage from "./components/page/exam";

const toplevelRoutes = Rocon.Path()
  .exact({
    action: TopPage,
  })
  .route("exam", (r) => r.action(ExamPage));

export default toplevelRoutes;
