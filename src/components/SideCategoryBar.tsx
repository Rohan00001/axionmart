import Link from 'next/link';
import React from 'react';
import { GiClothes, GiElectric } from "react-icons/gi";
import { SiNextra } from "react-icons/si";
import { TbHomeEco } from "react-icons/tb";
import { MdOutdoorGrill } from "react-icons/md";

function SideCategoryBar() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-800 border-r border-gray-700">
            <nav className="flex flex-col gap-2 p-4">
                <Link href="/categories/clothing" passHref>
                    <p className="flex items-center gap-3 p-2 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer">
                        <GiClothes />
                        <span>Clothing</span>
                    </p>
                </Link>
                <Link href="/categories/electronics" passHref>
                    <p className="flex items-center gap-3 p-2 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer">
                        <GiElectric />
                        <span>Electronics</span>
                    </p>
                </Link>
                <Link href="/categories/home" passHref>
                    <p className="flex items-center gap-3 p-2 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer">
                        <TbHomeEco />
                        <span>Home Decor</span>
                    </p>
                </Link>
                <Link href="/categories/outdoor" passHref>
                    <p className="flex items-center gap-3 p-2 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer">
                        <MdOutdoorGrill />
                        <span>Outdoor Decor</span>
                    </p>
                </Link>
                <Link href="/categories/others" passHref>
                    <p className="flex items-center gap-3 p-2 text-gray-400 transition-colors duration-200 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer">
                        <SiNextra />
                        <span>Others</span>
                    </p>
                </Link>
            </nav>
        </div>
    );
}

export default SideCategoryBar;
