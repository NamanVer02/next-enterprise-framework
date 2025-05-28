interface UserProfileProps {
  user: any;
}
export function UserProfile({ user }: UserProfileProps) {
  return <div>{user?.name}</div>;
}
