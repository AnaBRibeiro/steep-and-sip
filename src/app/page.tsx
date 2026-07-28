import AppShell from "@/components/AppShell";
import { getTeas } from "@/lib/teas";

export const dynamic = "force-dynamic";

export default async function Home() {
  const teas = await getTeas();
  return <AppShell teas={teas} />;
}
