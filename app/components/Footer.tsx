
export default function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <p className="text-gray-400 text-sm">Contact Support: support@shabalink.com</p>
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} Shabalink VTU. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
