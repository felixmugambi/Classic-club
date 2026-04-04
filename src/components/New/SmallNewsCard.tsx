import Link from 'next/link';
import { FaShareAlt } from "react-icons/fa";
import { getRelativeTime } from "../helper/relativeTime";
import { slugify } from '../helper/slugify';

const SmallNewsCard = ({ data }: { data: any }) => {
  return (
    <Link href={`/news/${slugify(data.title)}`}>
    <div className="bg-white rounded shadow hover:shadow-md transition group overflow-hidden flex flex-col">
      {/* Image wrapper with hover zoom */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="p-3 flex flex-col justify-between flex-grow">
        {/* Red line above title */}
        <div className="mb-2">
          <div className="h-[2px] w-16 bg-clubRed transition-all duration-500 group-hover:w-full"></div>
        </div>

        <h4 className="text-base font-semibold text-gray-800 line-clamp-1">{data.title}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{data.subtitle}</p>

        <p className="text-xs text-gray-600 mt-2 flex-grow">{data.desc}</p>

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <span>{getRelativeTime(data.created_at)}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default SmallNewsCard;
