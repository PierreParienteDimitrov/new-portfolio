"use client"

import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Updated import path
import { MusicTrack } from '@/types/ISanity';
import { client } from '@/sanity/lib/client';
import { PageIntro } from '@/components/PageIntro';
import { Container } from '@/components/Container';


// Fetch music tracks from Sanity (placeholder)
const getMusicTracks = async (): Promise<MusicTrack[]> => {
    const query = `*[_type == "music"] | order(trackNumber asc) {
    name,
    description,
    "musicUrl": musicFile.asset->url,
    meta,
    trackNumber
  }`;

    const musicTracks = await client.fetch(query);
    return musicTracks;
};

export default function MusicPage() {
    const [tracks, setTracks] = useState<MusicTrack[]>([]); // Store fetched tracks
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null); // Current playing track
    const [isPlaying, setIsPlaying] = useState(false); // Track playing status
    const [progress, setProgress] = useState(0); // Track progress
    const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
    const [durations, setDurations] = useState<Record<number, number>>({}); // Store track durations by index
    const audioRef = useRef<HTMLAudioElement | null>(null); // Audio reference

    // Fetch music tracks on component mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMusicTracks();
            setTracks(data);
            preloadTrackDurations(data);
        };

        fetchData();
    }, []);

    // Preload metadata to get track durations
    const preloadTrackDurations = (tracks: MusicTrack[]) => {
        tracks.forEach((track, index) => {
            const audio = new Audio(track.musicUrl);
            audio.addEventListener('loadedmetadata', () => {
                setDurations((prevDurations) => ({
                    ...prevDurations,
                    [index]: audio.duration,
                }));
            });
        });
    };

    // Play or pause the selected track
    const handlePlayPauseTrack = (index: number) => {
        if (currentTrackIndex === index) {
            // If the current track is already playing, toggle pause/play
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            // Play a different track
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    };

    // Handle track end (play next track automatically)
    const handleTrackEnd = () => {
        if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1); // Play next track
        } else {
            setIsPlaying(false); // Stop playing if no more tracks
        }
    };

    // Handle play/pause toggle
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle Next Track button
    const handleNextTrack = () => {
        if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            setIsPlaying(true);
        }
    };

    // Handle Previous Track button
    const handlePrevTrack = () => {
        if (currentTrackIndex !== null && currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
            setIsPlaying(true);
        }
    };

    // Update progress bar and current time as the track plays
    const updateProgress = () => {
        const audio = audioRef.current;
        if (audio) {
            const progressValue = (audio.currentTime / audio.duration) * 100;
            setProgress(progressValue);
            setCurrentTime(audio.currentTime); // Update the current time
        }
    };

    // Get the total duration of the track once it is loaded
    const updateDuration = () => {
        const audio = audioRef.current;
        if (audio) {
            setDurations((prevDurations) => ({
                ...prevDurations,
                [currentTrackIndex!]: audio.duration,
            }));
        }
    };

    // Seek to a specific point in the track
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            const seekTime = (audio.duration / 100) * parseFloat(e.target.value);
            audio.currentTime = seekTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    // Format time in mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Container>

            <PageIntro title="Les Carnets de l'Eveil" />

            {/* Track List */}
            <div className="grid grid-cols-1 gap-4">
                {tracks.map((track, index) => (
                    <div
                        key={track.trackNumber}
                        className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-4 justify-between
              ${currentTrackIndex === index
                                ? 'bg-blue-100 border-blue-500' // Active state
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex items-center space-x-4">
                            {/* Play/Playing Icon in Track List */}
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
                        {/* Display Track Duration */}
                        <div className="text-sm text-gray-600">
                            {durations[index] ? formatTime(durations[index]) : 'Loading...'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Audio Player */}
            {currentTrackIndex !== null && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 text-white">
                    <h2 className="text-lg font-bold">
                        Now Playing: {tracks[currentTrackIndex].name}
                    </h2>
                    <p>{tracks[currentTrackIndex].description}</p>

                    <div className="flex items-center space-x-4 mt-2">
                        {/* Previous Button */}
                        <button onClick={handlePrevTrack} disabled={currentTrackIndex === 0}>
                            <ChevronLeftIcon className="w-8 h-8 text-white" />
                        </button>

                        {/* Play/Pause Button */}
                        <button onClick={togglePlayPause}>
                            {isPlaying ? (
                                <PauseIcon className="w-8 h-8 text-white" />
                            ) : (
                                <PlayIcon className="w-8 h-8 text-white" />
                            )}
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={handleNextTrack}
                            disabled={currentTrackIndex === tracks.length - 1}
                        >
                            <ChevronRightIcon className="w-8 h-8 text-white" />
                        </button>
                    </div>

                    {/* Progress Bar with Time Display */}
                    <div className="mt-4 flex items-center justify-between">
                        <span>{formatTime(currentTime)}</span> {/* Current Time */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="w-full mx-4"
                        />
                        <span>{formatTime(durations[currentTrackIndex!] || 0)}</span> {/* Total Duration */}
                    </div>

                    {/* Audio element */}
                    <audio ref={audioRef} src={tracks[currentTrackIndex].musicUrl} autoPlay />
                </div>
            )}
        </Container>
    );
}
