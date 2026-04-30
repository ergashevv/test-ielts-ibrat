import { redirect } from "next/navigation";

export default function Home() {
  // Root route should show the new login screen.
  // Keeping the login UI only in `/login` avoids duplicate layouts.
  redirect("/login");
}
