"use client"; // Yeh Client Component hai

import { Provider } from "react-redux";
import { store } from "@/redux/store"; // Apna Redux Store Import Karo

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
