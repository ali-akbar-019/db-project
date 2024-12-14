const AdminSettingsPage = () => {
  return (
    <div className="h-[100vh] overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white p-5 text-2xl font-bold text-gray-900 shadow-sm">
        <h3>Settings</h3>
      </div>

      {/* Main Content */}
      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        {/* Profile Section */}
        <div className="flex items-center gap-5">
          {/* Profile Image */}
          <img
            src="/imgs/horizontal_05.jpg"
            alt="user profile image"
            className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
          />
          {/* User Info */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800">Ali Akbar</h4>
            <p className="text-gray-500">gamesforever018@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Additional Settings Sections */}
      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        <h4 className="text-lg font-semibold text-gray-800">
          Account Information
        </h4>
        <p className="text-gray-600 mt-2">
          Manage your account details, including changing your email or
          password.
        </p>
      </div>

      <div className="bg-white mt-5 rounded-xl p-5 mx-10 shadow">
        <h4 className="text-lg font-semibold text-gray-800">Preferences</h4>
        <p className="text-gray-600 mt-2">
          Update your preferences, such as notification settings and display
          options.
        </p>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
