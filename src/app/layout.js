import "./globals.css";

export const metadata = {
  title: "FlyRank — Settings",
  description: "Manage your FlyRank account settings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
