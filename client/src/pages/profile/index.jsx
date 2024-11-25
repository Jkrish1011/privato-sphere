import { useAppStore } from "@/store"

const Profile = () => {
  const { userInfo } = useAppStore();
  console.log(userInfo);
  return (
    <div>
      <h1>Profile</h1>
      <div>{userInfo.email}</div>
    </div>
  )
}

export default Profile