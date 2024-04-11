import { Provider } from "react-redux";
import store from "@/src/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
