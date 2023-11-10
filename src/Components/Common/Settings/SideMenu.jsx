
const SideMenu = ({ className, callback }) => {
    return (
        <div className={`${className} md:col-span-4 lg:col-span-3 font-primary`}>
            <div className="w-full rounded-xl shadow shadow-gray-400 py-4 px-5">
                <div>
                    <h1 className="text-lg">User Settings</h1>
                    <p className="mt-3 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2" onClick={()=>callback("profile-settings")}>Profile Settings</p>
                    <p className="mt-1 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Password & security</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-lg">Payments</h1>
                    <p className="mt-3 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Balance</p>
                    <p className="mt-1 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Transactions</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-lg">Notifications</h1>
                    <p className="mt-3 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Manage Notification</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-lg">Manage Account</h1>
                    <p className="mt-3 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Delete Account</p>
                    <p className="mt-1 bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer p-1 px-2">Hide Account</p>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
