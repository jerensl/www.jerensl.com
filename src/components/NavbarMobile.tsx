import React from 'react'
import { LinkURL } from './LinkURL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faSearch,
    faAddressCard,
} from '@fortawesome/free-solid-svg-icons'

export const NavbarMobile = () => {
    return (
        <div className="fixed flex w-full px-10 py-2 bottom-0 h-18 bg-white z-40 md:hidden">
            <div className="flex justify-between w-full">
                <div className="flex-1 group">
                    <LinkURL href="/">
                        <a className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <FontAwesomeIcon
                                    className="block"
                                    icon={faHome}
                                />
                                <span className="text-xs pb-1 block">Home</span>
                            </span>
                        </a>
                    </LinkURL>
                </div>
                <div className="flex-1 group">
                    <LinkURL href="/blog">
                        <a className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <FontAwesomeIcon
                                    className="block"
                                    icon={faSearch}
                                />
                                <span className="text-xs pb-1 block">Blog</span>
                            </span>
                        </a>
                    </LinkURL>
                </div>
                <div className="flex-1 group">
                    <LinkURL href="/about">
                        <a className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <FontAwesomeIcon
                                    className="block"
                                    icon={faAddressCard}
                                />
                                <span className="text-xs pb-1 block">
                                    About
                                </span>
                            </span>
                        </a>
                    </LinkURL>
                </div>
            </div>
        </div>
    )
}