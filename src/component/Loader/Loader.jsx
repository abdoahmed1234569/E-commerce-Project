import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Oval
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
