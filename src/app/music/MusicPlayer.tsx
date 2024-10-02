// app/music/MusicPlayer.tsx (Client Component)

"use client"; // Ensures this component runs only on the client

import { useState, useEffect, useRef } from "react";
import {
    PlayIcon,
    PauseIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { MusicTrack } from "@/types/ISanity";

interface MusicPlayerProps {
    tracks: MusicTrack[];
}

// Client-side Music Player component
export default function MusicPlayer({ tracks }: MusicPlayerProps) {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [durations, setDurations] = useState<Record<number, number>>({});
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentTrackIndex !== null ? tracks[currentTrackIndex].name : "",
                artist: "Pierre Pariente Dimitrov",
                album: "Les Carnets de l'Éveil",
                artwork: [
                    {
                        src: "/path/to/album-art.jpg", // Optional: Add album art
                        sizes: "512x512",
                        type: "image/jpg",
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
    }, [currentTrackIndex, tracks]);


    useEffect(() => {
        preloadTrackDurations(tracks);
    }, [tracks]);

    const preloadTrackDurations = (tracks: MusicTrack[]) => {
        tracks.forEach((track, index) => {
            const audio = new Audio(track.musicUrl);
            audio.addEventListener("loadedmetadata", () => {
                setDurations((prevDurations) => ({
                    ...prevDurations,
                    [index]: audio.duration,
                }));
            });
        });
    };

    const handlePlayPauseTrack = (index: number) => {
        if (currentTrackIndex === index) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    };

    const handleTrackEnd = () => {
        if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextTrack = () => {
        if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            setIsPlaying(true);
        }
    };

    const handlePrevTrack = () => {
        if (currentTrackIndex !== null && currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
            setIsPlaying(true);
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
            audio.addEventListener("timeupdate", updateProgress);
            audio.addEventListener("ended", handleTrackEnd);
        }
        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", updateProgress);
                audio.removeEventListener("ended", handleTrackEnd);
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
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div>
            {/* Track List */}
            <div className="grid grid-cols-1 gap-4">
                {tracks.map((track, index) => (
                    <div
                        key={track.trackNumber}
                        className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-4 justify-between
                            ${currentTrackIndex === index
                                ? "bg-blue-100 border-blue-500" // Active state
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        <div className="flex items-center space-x-4">
                            <button onClick={() => handlePlayPauseTrack(index)}>
                                {currentTrackIndex === index && isPlaying ? (
                                    <PauseIcon className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <PlayIcon className="w-6 h-6 text-gray-500" />
                                )}
                            </button>
                            <div>
                                <h2 className="text-xl font-semibold">{track.name}</h2>
                                <p className="text-sm text-gray-600">{track.description}</p>
                                <p className="text-sm text-gray-400">{track.meta}</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            {durations[index] ? formatTime(durations[index]) : "Loading..."}
                        </div>
                    </div>
                ))}
            </div>

            {/* Spotify-style Audio Player */}
            {currentTrackIndex !== null && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-lg font-bold">
                                    {tracks[currentTrackIndex].name}
                                </h2>
                                <p className="text-sm">{tracks[currentTrackIndex].description}</p>
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
                                disabled={currentTrackIndex === tracks.length - 1}
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
                            {formatTime(durations[currentTrackIndex!] || 0)}
                        </span>
                    </div>

                    {/* Audio element */}
                    <audio ref={audioRef} src={tracks[currentTrackIndex].musicUrl} autoPlay controls />
                </div>
            )}
        </div>
    );
}
