import { UserProfile } from "./UserProfile";
import { useUser } from "@/hooks/useUser";

export function UserProfileContainer({ userId }: { userId: string }) {
  const { user, isLoading, error } = useUser(userId);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <UserProfile user={user} />;
}
