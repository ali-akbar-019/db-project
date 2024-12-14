import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isLoading: updatingUserLoading } = useUpdateMyUser();
  //
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!currentUser) {
    return <span>Unable to load User Profile</span>;
  }
  return (
    <>
      <div className="my-10">
        <UserProfileForm
          currentUser={currentUser}
          onSave={updateUser}
          isLoading={updatingUserLoading}
        />
      </div>
    </>
  );
};

export default UserProfilePage;
