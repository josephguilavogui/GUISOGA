import "./globals.css";

export const metadata = {
  title: "GUISOGA",
  description: "L’Empire de Joseph Guilavogui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
