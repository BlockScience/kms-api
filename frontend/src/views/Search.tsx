import { useLocation, useSearchParams } from "react-router-dom";
import { SetTitle } from "@/utilities/metadata";

export default function Search() {
  const location = useLocation();
  // const [_, setSearchParams] = useSearchParams();
  // setSearchParams({ q: location.state.q });
  console.log(location.state.q);
  console.log(location.state);
  return (
    <div>
      <SetTitle text='Search' />
      Search View...
    </div>
  );
}