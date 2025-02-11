import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import { AuthProvider } from "../API/AuthContext";

export const metadata = {
  title: "JTM Application",
  description:
    "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <PluginInit />
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
