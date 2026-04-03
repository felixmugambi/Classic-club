import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AboutTheClub() {
    return (
        <div className="mb-2">

            <h2 className="mt-5 text-4xl font-bold text-black pt-10 pb-8 pl-14">About the Club</h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:mx-5 md:mx-10 ">
                <div className="rounded-md mx-3 my-3">

                    <Link href='/pages/about-the-club/general-information'>
                        <div className="bg-white rounded shadow hover:shadow-md transition group overflow-hidden flex flex-col">
                            {/* Image wrapper with hover zoom */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src='https://images.unsplash.com/photo-1718288434038-d7cc2ab7abef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbCUyMHBpdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800'
                                    alt='General Information About Classic FC'
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-3 flex flex-col justify-between flex-grow">

                                <h4 className="text-2xl mt-2 font-bold text-gray-800">General Information</h4>
                                <p className="text-md text-gray-500 mt-4">General Information about Classic FC</p>

                                <div className="flex items-center mt-4 ">
                                    <span className="text-md text-slate-950 font-semibold">Learn More</span>
                                    <ChevronRight className="text-lg" />
                                </div>


                            </div>
                        </div>
                    </Link>

                </div>

                <div className="bg-white rounded-md mx-3 my-3">

                    <Link href='/pages/about-the-club/history'>
                        <div className="rounded shadow hover:shadow-md transition group overflow-hidden flex flex-col">
                            {/* Image wrapper with hover zoom */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src='https://images.unsplash.com/photo-1632072835323-74659dd03a40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWwlMjBwaXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800'
                                    alt='General Information About Classic FC'
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-3 flex flex-col justify-between flex-grow">

                                <h4 className="text-2xl mt-2 font-bold text-gray-800">Club History</h4>
                                <p className="text-md text-gray-500 mt-4">The History of Classic FC</p>

                                <div className="flex items-center mt-4 ">
                                    <span className="text-md text-slate-950 font-semibold">Learn More</span>
                                    <ChevronRight className="text-lg" />
                                </div>

                            </div>
                        </div>
                    </Link>

                </div>
                {/*
                <div className="bg-white rounded-md mx-3 my-3">

                    <Link href='/'>
                        <div className="rounded shadow hover:shadow-md transition group overflow-hidden flex flex-col">
                            
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src='https://plus.unsplash.com/premium_photo-1663951813007-b99d97a8aaaf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb3RiYWwlMjBwaXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800'
                                    alt='General Information About Classic FC'
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                          
                            <div className="p-3 flex flex-col justify-between flex-grow">

                                <h4 className="text-2xl mt-2 font-bold text-gray-800">Classic on the Socials</h4>
                                <p className="text-md text-gray-500 mt-4">Find Classic FC on Socials</p>

                                <div className="flex items-center mt-4 ">
                                    <span className="text-md text-slate-950 font-semibold">Learn More</span>
                                    <ChevronRight className="text-lg" />
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
                **/}
            </div>
        </div>
    );
}
