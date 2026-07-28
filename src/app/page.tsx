import AppShell from "@/components/AppShell";
import { getTeas } from "@/lib/teas";

export default async function Home() {
  const teas = await getTeas();
  return <AppShell teas={teas} />;
}
