import Link from 'next/link';
import { getRelativeTime } from "../helper/relativeTime";
import { slugify } from '../helper/slugify';

type Blog = {
  id: number;
  title: string;
  subtitle?: string;
  desc?: string;
  image: string;
  created_at: string;
  author?: string;
};

const LargeNewsCard = ({ data, layout }: { data: Blog, layout?: 'horizontal' | 'full' }) => {
  const isHorizontal = layout === 'horizontal';
  const isFull = layout === 'full';

  return (
    <Link href={`/news/${slugify(data.title)}`}>
      <div className={`
        flex flex-col ${isHorizontal ? 'md:flex-row' : ''}
        bg-white shadow-md hover:shadow-lg transition group rounded overflow-hidden h-full
      `}>
        {/* Image */}
        <div className={`relative w-full ${isHorizontal ? 'md:w-2/5 h-56 md:h-auto' : 'h-64'} overflow-hidden`}>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="relative mb-2">
            <div className="h-[2px] w-16 bg-clubRed transition-all duration-500 group-hover:w-full"></div>
          </div>
          <div>
            <h3 className={`text-xl ${isFull ? 'md:text-2xl' : ''} font-bold text-gray-800`}>{data.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{data.subtitle}</p>
            <p className="text-sm text-gray-700 mt-3 line-clamp-3">{data.desc}</p>
          </div>
          <p className="text-sm text-gray-700 mt-3">{data.desc}</p>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>{getRelativeTime(data.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default LargeNewsCard;
