import { LinkURL } from './LinkURL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    const handleOpenSidebar = () => setShowSidebar(true)

    const handleCloseSidebar = () => setShowSidebar(false)

    return (
        <>
            <button
                className="block p-5 md:hidden md:p-4"
                onClick={handleOpenSidebar}
                aria-label="Open Sidebar"
            >
                <FontAwesomeIcon className="text-xl" icon={['fas', 'bars']} />
            </button>
            <Transition.Root show={showSidebar} as={Fragment}>
                <Dialog
                    as="aside"
                    role="dialog"
                    static
                    className="fixed inset-0 z-10 overflow-hidden"
                    onClose={handleCloseSidebar}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                aria-label="Overlay"
                                className="absolute inset-0 bg-black bg-opacity-40 transition-opacity"
                            />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="-translate-x-full"
                            enterTo="-translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom="-translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="fixed inset-y-0 left-0 max-w-full w-56 flex flex-col bg-gray-100 dark:dark-theme text-center">
                                <button
                                    className="py-5"
                                    onClick={handleCloseSidebar}
                                    aria-label="Closed Sidebar"
                                >
                                    <FontAwesomeIcon
                                        className="text-2xl"
                                        icon={['fas', 'times']}
                                    />
                                </button>
                                <LinkURL href="/">
                                    <span
                                        onClick={handleCloseSidebar}
                                        className="py-6 font-semibold hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-5"
                                    >
                                        Home
                                    </span>
                                </LinkURL>
                                <LinkURL href="/blog">
                                    <span
                                        onClick={handleCloseSidebar}
                                        className="py-6 font-semibold hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-5"
                                    >
                                        Blog
                                    </span>
                                </LinkURL>
                                <LinkURL href="/about">
                                    <span
                                        onClick={handleCloseSidebar}
                                        className="py-6 font-semibold hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-5"
                                    >
                                        About
                                    </span>
                                </LinkURL>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
