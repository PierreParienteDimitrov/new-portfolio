"use client"

import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { GroupedAlbum } from '@/types/ISanity'; // Ensure this is the correct path for Album interface

interface AlbumProps {
    albums: GroupedAlbum[];
}

export default function MusicPlayer({ albums }: AlbumProps) {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [durations, setDurations] = useState<Record<number, number>>({});
    const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Helper function to check if the device is mobile
    const isMobileDevice = () => {
        return typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    };

    useEffect(() => {
        if (isMobileDevice() && currentAlbumIndex !== null && currentTrackIndex !== null && 'mediaSession' in navigator) {
            const currentAlbum = albums[currentAlbumIndex];
            const currentTrack = currentAlbum.tracks[currentTrackIndex];

            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentTrack.name,
                artist: currentAlbum.album.composer,
                album: currentAlbum.album.name,
                artwork: [
                    {
                        src: currentAlbum.album.cover ? currentAlbum.album.cover.asset.url : '/path/to/placeholder.jpg',
                        sizes: '512x512',
                        type: 'image/jpg',
                    },
                ],
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audioRef.current?.play();
                setIsPlaying(true);
            });

            navigator.mediaSession.setActionHandler('pause', () => {
                audioRef.current?.pause();
                setIsPlaying(false);
            });

            navigator.mediaSession.setActionHandler('previoustrack', handlePrevTrack);
            navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);
        }
    }, [currentAlbumIndex, currentTrackIndex]);

    const preloadTrackDurations = (albumIndex: number) => {
        const album = albums[albumIndex];

        // Check if album.tracks exists and is an array before looping through it
        if (album.tracks && Array.isArray(album.tracks)) {
            album.tracks.forEach((track, trackIndex) => {
                const audio = new Audio(track.musicUrl);
                audio.addEventListener('loadedmetadata', () => {
                    const index = albumIndex * 100 + trackIndex; // Create unique index
                    setDurations((prevDurations) => ({
                        ...prevDurations,
                        [index]: audio.duration,
                    }));
                });
            });
        }
    };

    useEffect(() => {
        albums.forEach((_, albumIndex) => preloadTrackDurations(albumIndex));
    }, [albums]);

    const handlePlayPauseTrack = (albumIndex: number, trackIndex: number) => {
        const index = albumIndex * 100 + trackIndex;
        if (currentTrackIndex === index) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentAlbumIndex(albumIndex);
            setCurrentTrackIndex(trackIndex);
            setIsPlaying(true);
        }
    };

    const handleTrackEnd = () => {
        if (currentAlbumIndex !== null && currentTrackIndex !== null) {
            const album = albums[currentAlbumIndex];
            if (currentTrackIndex < album.tracks.length - 1) {
                setCurrentTrackIndex(currentTrackIndex + 1);
            } else if (currentAlbumIndex < albums.length - 1) {
                // Go to the next album's first track
                setCurrentAlbumIndex(currentAlbumIndex + 1);
                setCurrentTrackIndex(0);
            } else {
                setIsPlaying(false); // End of all albums
            }
        }
    };

    const handleNextTrack = () => {
        if (currentAlbumIndex !== null && currentTrackIndex !== null) {
            const album = albums[currentAlbumIndex];
            if (currentTrackIndex < album.tracks.length - 1) {
                setCurrentTrackIndex(currentTrackIndex + 1);
            }
        }
    };

    const handlePrevTrack = () => {
        if (currentAlbumIndex !== null && currentTrackIndex !== null) {
            if (currentTrackIndex > 0) {
                setCurrentTrackIndex(currentTrackIndex - 1);
            }
        }
    };

    const updateProgress = () => {
        const audio = audioRef.current;
        if (audio) {
            const progressValue = (audio.currentTime / audio.duration) * 100;
            setProgress(progressValue);
            setCurrentTime(audio.currentTime);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', handleTrackEnd);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('ended', handleTrackEnd);
            }
        };
    }, [currentTrackIndex, isPlaying]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            const seekTime = (audio.duration / 100) * parseFloat(e.target.value);
            audio.currentTime = seekTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    function togglePlayPause(event: React.MouseEvent<HTMLButtonElement>): void {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    }

    return (
        <div>
            <div className="space-y-8">
                {albums.map((album, albumIndex) => {
                    // Calculate total duration and number of tracks
                    const totalDuration = album.tracks.reduce(
                        (acc, track) => acc + (durations[albumIndex * 100 + track.trackNumber] || 0),
                        0
                    );
                    const totalTracks = album.tracks.length;

                    return (
                        <div key={albumIndex}>
                            {/* Album Header */}
                            <div className="flex flex-col md:flex-row items-center md:space-x-8 p-6">
                                {/* Album Cover */}
                                <div className="w-48 h-48 min-w-[150px]">
                                    {album.album.cover ? (
                                        <Image
                                            src={album.album.cover.asset.url}
                                            alt={album.album.name}
                                            width={200}
                                            height={200}
                                            className="rounded"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">{album.album.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Album Details */}
                                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                                    <h2 className="text-4xl font-bold">{album.album.name}</h2>
                                    <p className="text-lg text-gray-600">{album.album.composer}</p>
                                    <p className="text-sm text-gray-500">
                                        {totalTracks} tracks • {formatTime(totalDuration)}
                                    </p>
                                    <p className="text-gray-400">{album.album.releaseDate}</p>
                                </div>
                            </div>

                            {/* Track List */}
                            <div className="p-6">
                                {/* Table Header */}
                                <div className="grid grid-cols-[40px_auto_80px] text-gray-500 mb-4 border-b p-2 font-semibold">
                                    <span>#</span>
                                    <span>Title</span>
                                    <span className="text-right">Time</span>
                                </div>

                                {album.tracks && album.tracks.length > 0 ? (
                                    album.tracks.map((track, trackIndex) => {
                                        const index = albumIndex * 100 + trackIndex;

                                        return (
                                            <div
                                                key={track.trackNumber}
                                                className={`grid grid-cols-[40px_auto_80px] items-center p-2 hover:bg-gray-100 ${currentTrackIndex === trackIndex && currentAlbumIndex === albumIndex
                                                        ? 'bg-blue-100'
                                                        : ''
                                                    }`}
                                            >
                                                {/* Track Number / Play-Pause Icon */}
                                                <div className="flex items-center">
                                                    <button onClick={() => handlePlayPauseTrack(albumIndex, trackIndex)}>
                                                        {currentTrackIndex === trackIndex &&
                                                            currentAlbumIndex === albumIndex &&
                                                            isPlaying ? (
                                                            <PauseIcon className="w-6 h-6 text-blue-500" />
                                                        ) : (
                                                            <PlayIcon className="w-6 h-6 text-gray-500" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Track Title and Composer */}
                                                <div className="flex flex-col">
                                                    <span
                                                        className={`text-md ${currentTrackIndex === trackIndex && currentAlbumIndex === albumIndex
                                                                ? 'text-blue-500'
                                                                : ''
                                                            }`}
                                                    >
                                                        {track.name}
                                                    </span>
                                                    <span className="text-xs text-gray-600">{album.album.composer}</span>
                                                </div>

                                                {/* Track Duration */}
                                                <div className="text-right text-sm text-gray-600">
                                                    {durations[index] ? formatTime(durations[index]) : 'Loading...'}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500">No tracks available for this album.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>



            {/* Spotify-style Audio Player */}
            {currentTrackIndex !== null && currentAlbumIndex !== null && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-lg font-bold">
                                    {albums[currentAlbumIndex].tracks[currentTrackIndex].name}
                                </h2>
                                <p className="text-sm">{albums[currentAlbumIndex].tracks[currentTrackIndex].description}</p>
                            </div>
                        </div>

                        {/* Player Controls */}
                        <div className="flex items-center space-x-6">
                            <button onClick={handlePrevTrack} disabled={currentTrackIndex === 0}>
                                <ChevronLeftIcon className="w-8 h-8 text-white" />
                            </button>

                            <button
                                onClick={togglePlayPause}
                                className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center"
                            >
                                {isPlaying ? (
                                    <PauseIcon className="w-6 h-6" />
                                ) : (
                                    <PlayIcon className="w-6 h-6" />
                                )}
                            </button>

                            <button
                                onClick={handleNextTrack}
                                disabled={currentTrackIndex === albums[currentAlbumIndex].tracks.length - 1}
                            >
                                <ChevronRightIcon className="w-8 h-8 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="w-full mx-4"
                        />
                        <span className="text-sm">
                            {formatTime(durations[currentAlbumIndex * 100 + currentTrackIndex] || 0)}
                        </span>
                    </div>

                    {/* Audio element */}
                    <audio
                        ref={audioRef}
                        src={albums[currentAlbumIndex].tracks[currentTrackIndex].musicUrl}
                        autoPlay
                    />
                </div>
            )}
        </div>
    );
}
