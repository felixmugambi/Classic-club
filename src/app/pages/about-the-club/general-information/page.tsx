import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function GeneralInformation() {
    return (
        <div className="mb-2">

            <h2 className="mt-5 text-4xl font-bold text-black pt-10 pb-8 pl-14">General Information</h2>

            <div className="pl-16">
                <h2 className="mt-5 text-red-500 font-bold text-2xl">Address</h2>
                <p className="text-slate-500 mt-5 font-semibold">Gachua Primary School</p>
                <p className="text-slate-500 mt-2 font-semibold">P.O Box 621-60200 MERU</p>

                <h2 className="mt-5 text-red-500 font-bold text-2xl">Formed: 2010</h2>
            </div>

            <div className="pl-16">
                <h2 className="mt-7 text-red-500 font-bold text-2xl">Contact Details</h2>
                <p className="text-slate-500 mt-3 font-semibold">Enquiries: classicfc101@gmail.com</p>
            </div>
            
        </div>
    );
}
