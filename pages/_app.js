import SideMenu from "@/components/LeftSideBar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem attribute="class">
            <SideMenu/>
      
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
