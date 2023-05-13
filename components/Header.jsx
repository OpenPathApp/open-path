import React from 'react';
import Image from 'next/image';

export const Header = () => {
    return (
        <header className="flex justify-start items-center p-4 bg-neutral-900 shadow-md">
            <div className="flex items-center px-4">
                <Image
                    src="/rainbow.png" 
                    alt="Logo"
                    width={35}
                    height={35}
                />
            </div>

            <div className="relative text-gray-600 w-2/5">
                <input
                    className="border-2 border-gray-600 text-gray-400 bg-black h-10 px-5 pr-10 w-full rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search for a place"
                />
                <button type="submit" className="absolute right-0 top-1 mt-2 mr-4">
                    <svg className="text-gray-600 h-4 w-4 fill-current" version="1.1" id="Layer_1" viewBox="0 0 56.966 56.966">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837  C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"/>
                    </svg>
                </button>
            </div>
        </header>
    );
};
