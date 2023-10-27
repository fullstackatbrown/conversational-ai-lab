"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image"

import photo from "../public/assets/logo.png";
import { useRouter } from "next/navigation";

// placeholder links below for testing
const navigation = [
    { name: "About", href: "/about/", current: false },
    {
        name: "Our Team",
        href: "https://nextjs.org/learn/basics/navigate-between-pages/link-component",
        current: false,
    },
    { name: "Forum", href: "#", current: false },
    { name: "Blog", href: "/posts/", current: false },
];


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
    uid: string;
    profileUrl: string;
    handleSignIn: () => void;
    handleSignOut: () => void;
}

export default function Navbar({ uid, profileUrl, handleSignIn, handleSignOut }: NavbarProps) {
    const router = useRouter();
    return (
        // can change font by adding font (e.g. "font-serif") to className in next line
        <Disclosure as="nav" className="bg-gray-200 px-12">
            {({ open }) => (
                <>
                    {/* below originally had max-w-7xl */}
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-20 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="h-44 w-auto py-5"
                                        src={photo}
                                        alt="Brown Conversational AI Lab Logo"
                                    />
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-900 text-black"
                                                        : "text-black hover:bg-gray-300 hover:text-black",
                                                    "rounded-md px-3 py-2 text-sm font-medium"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {/* Profile dropdown */}
                                {uid != "" ? (<Menu as="div" className="relative ml-4">
                                    <div>
                                        <Menu.Button className="ml-2 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                rel="noreferrer noopener"
                                                src={profileUrl}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => router.push("/editProfile")}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Edit Profile
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleSignIn}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Switch Accounts
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleSignOut}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Sign Out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>) : (
                                    <button
                                        className="text-sm px-3 ml-5 font-bold bg-green-300 p-2 rounded-full"
                                        onClick={handleSignIn}>Log in
                                    </button>)}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-300 text-black"
                                            : "text-black hover:bg-gray-300 hover:text-black",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
