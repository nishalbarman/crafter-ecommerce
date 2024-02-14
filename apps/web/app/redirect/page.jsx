import { redirect } from "next/navigation";
import Redirect from "../../components/Redirect/Redirect";

function page({ searchParams }) {
  const path = searchParams.path;
  return <Redirect path={path} />;
}

export default page;
