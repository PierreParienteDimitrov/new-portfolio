// app/music/Albums.tsx

import Image from "next/image";
import { GroupedAlbum } from "@/types/ISanity";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";


interface AlbumsProps {
    albums: GroupedAlbum[];
}

export default function Albums({ albums }: AlbumsProps) {

    return (
        <div className="grid grid-cols-1 gap-8">
            {albums.map((album, index) => {
                return (
                    <Link key={index}
                        href={album.link?.url || "#"} passHref target="_blank">
                        {album.coverUrl && (
                            <Image
                                src={album.coverUrl}
                                alt={`${album.name} cover`}
                                width={300}
                                height={300}
                                className="rounded-md object-cover"
                            />
                        )}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{album.name}</h3>
                            <p className="text-sm text-gray-500">{album.description}</p>
                            <p className="text-sm text-gray-500">
                                Composer: {album.composer || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Release Date: {album.releaseDate || "Unknown"}
                            </p>
                            <div className='flex items-center space-x-2 mt-4'>
                                <p>Listen now</p> <ArrowRightIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                )
            })}

        </div>
    );
}
