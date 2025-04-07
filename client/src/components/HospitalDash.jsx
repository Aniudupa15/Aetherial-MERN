import React from 'react';

// Shared Tailwind CSS classes
const flexClass = 'flex';
const itemsCenterClass = 'items-center';
const spaceXClass = 'space-x-2';
const bgZinc700Class = 'bg-zinc-700';
const p4Class = 'p-4';

const Sidebar = () => {
    return (
        <div className="w-64 bg-zinc-900 p-5">
            <h1 className="text-xl font-bold mb-5">AETHERIAL</h1>
            <ul className="space-y-3">
                <li><a href="#" className={`${flexClass} ${itemsCenterClass} ${spaceXClass}`}><span>🏠</span><span>Dashboard</span></a></li>
                <li><a href="#" className={`${flexClass} ${itemsCenterClass} ${spaceXClass}`}><span>📁</span><span>Data</span></a></li>
                <li><a href="#" className={`${flexClass} ${itemsCenterClass} ${spaceXClass}`}><span>📅</span><span>Calendar</span></a></li>
                <li><a href="#" className={`${flexClass} ${itemsCenterClass} ${spaceXClass}`}><span>❓</span><span>FAQ Page</span></a></li>
                <li><a href="#" className={`${flexClass} ${itemsCenterClass} ${spaceXClass}`}><span>📊</span><span>Charts</span></a></li>
            </ul>
        </div>
    );
};

const MainContent = () => {
    return (
        <div className="flex-1 p-10">
            <h2 className="text-3xl font-bold mb-5">Hospital Dashboard</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className={`${bgZinc700Class} ${p4Class}`}>Name:</div>
                <div className={`${bgZinc700Class} ${p4Class}`}>Age:</div>
                <div className={`${bgZinc700Class} ${p4Class}`}>Blood group:</div>
                <div className={`${bgZinc700Class} ${p4Class} col-span-2`}>Emergency contact:</div>
            </div>
            <div className={`${bgZinc700Class} ${p4Class}`}>
                <img src="https://placehold.co/600x300" alt="Line Chart" className="w-full h-auto" />
            </div>
        </div>
    );
};

const HospitalDashboard = () => {
    return (
        <div className="bg-zinc-800 text-white font-sans">
            <div className="flex h-screen">
                <Sidebar />
                <MainContent />
            </div>
        </div>
    );
};

export default HospitalDashboard;