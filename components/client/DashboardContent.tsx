'use client';

import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useMemo, useState } from 'react';

import AddProject from './AddProject';
import { Project } from '@/lib/type';
import ProjectItem from '../server/ProjectItem';
import NoProjects from '../server/NoProjects';
import { Input } from '../ui/input';
import NoProject from '../server/NoProject';

export default function DashboardContent({
    initialProjects,
}: {
    initialProjects: Project[];
}) {
    const { user, loading } = useAuth();
    const [emoji, setEmoji] = useState('');
    const [greeting, setGreeting] = useState('');
    const [search, setsearch] = useState('');

    const emojis = ['👋', '😊', '🫶', '🩷', '❤️‍🔥', '👀', '⭐', '✨', '👻', '🧛🏻', '😍', '💜', '🤍', '🖤', '🩵', '😇'];

    const projects = initialProjects

    // ✅ Greeting + emoji
    useEffect(() => {
        if (user) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            setEmoji(randomEmoji);

            const updateGreeting = () => {
                const hour = new Date().getHours();
                if (hour >= 5 && hour < 12) setGreeting('Good Morning');
                else if (hour >= 12 && hour < 18) setGreeting('Good Afternoon');
                else setGreeting('Good Evening');
            };

            updateGreeting();
            const interval = setInterval(updateGreeting, 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [user]);

    //Filter project

    const filterProject = useMemo(() => {
        if (!search.trim()) return projects
        const matchcard = projects.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
        return matchcard
    }, [projects, search])

    const handlerestfilter = () => {
        setsearch('')
    }

    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between xl:justify-center xl:flex-col xl:gap-5">
                {loading ? (
                    <Skeleton className="inline-block w-full md:w-100 h-9 md:h-11 rounded-md bg-gray-200 animate-pulse" />
                ) : (
                    <h1 className="text-xl mt-2 ml-0 md:ml-3 text-center md:text-left md:text-3xl font-light">
                        {greeting}, {user?.displayName || 'User'} {emoji}
                    </h1>
                )}
                {projects.length !== 0 && (
                    <div>
                        <AddProject />
                    </div>
                )}
            </div>

            {projects.length > 3 && <div className='my-3 flex items-center justify-center'>
                <div>
                    <Input value={search} type='text' className='w-xs mt-3 text-xs md:text-sm' placeholder='Search Projects' onChange={(e) => {
                        setsearch(e.target.value)
                    }} />
                </div>
            </div>}


            <div className="my-5 md:my-8 mx-auto max-w-[1400px] px-4">
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-4">
                        {filterProject.map((p) => (
                            <ProjectItem key={p.id} project={p} userId={user?.uid} />
                        ))}
                    </div>
                ) : (
                    <NoProjects />
                )}
            </div>

            {projects.length>0 && filterProject.length === 0 && <NoProject click={handlerestfilter} />}

        </div>
    );
}
