
export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">Settings</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your workspace preferences and configurations.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="col-span-1">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">General</h4>
                    <p className="mt-1 text-xs text-slate-500">System-wide preferences.</p>
                </div>
                <div className="col-span-2 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
                            <p className="text-xs text-slate-500">Toggle system theme preference.</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-slate-700">
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="col-span-1">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">Notifications</h4>
                    <p className="mt-1 text-xs text-slate-500">Manage how you receive updates.</p>
                </div>
                <div className="col-span-2 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start">
                        <div className="flex h-6 items-center">
                            <input id="email-updates" name="email-updates" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 dark:border-slate-700 dark:bg-slate-800" />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="email-updates" className="font-medium text-slate-900 dark:text-white">Email updates</label>
                            <p className="text-slate-500">Get notified about project milestones and updates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
