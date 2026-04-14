'use client';

import { useState } from 'react';
import { CalendarIcon, ClockIcon, UserGroupIcon, VideoCameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const upcomingWebinars = [
  {
    id: 1,
    title: 'Burnout Prevention: From Awareness to Action',
    date: '2025-02-15',
    time: '14:00 – 15:30 CET',
    spots: 45,
    totalSpots: 100,
    price: '299 kr',
    description: 'A live, interactive session covering the science of burnout, early recognition, and evidence-based strategies for both individuals and teams.',
    tags: ['Burnout', 'Stress Management', 'Workplace Wellbeing'],
  },
  {
    id: 2,
    title: 'Mastering Public Speaking for Healthcare Professionals',
    date: '2025-03-08',
    time: '10:00 – 12:00 CET',
    spots: 22,
    totalSpots: 40,
    price: '499 kr',
    description: 'Build confidence and presence in presentations, conferences, and patient interactions. Practical exercises, live feedback, and personal coaching.',
    tags: ['Public Speaking', 'Communication', 'Leadership'],
  },
  {
    id: 3,
    title: 'The Resilient Leader: Managing Stress at the Top',
    date: '2025-03-25',
    time: '09:00 – 11:00 CET',
    spots: 30,
    totalSpots: 50,
    price: '599 kr',
    description: 'Designed for managers and executives: how to remain effective, empathetic, and resilient under sustained pressure.',
    tags: ['Leadership', 'Resilience', 'Executive Wellness'],
  },
];

const pastWebinars = [
  {
    id: 4,
    title: 'Understanding Work-Life Balance in a Hybrid World',
    date: '2024-11-20',
    attendees: 87,
    recording: true,
  },
  {
    id: 5,
    title: 'Nutrition, Sleep, and Mental Performance',
    date: '2024-10-12',
    attendees: 112,
    recording: true,
  },
  {
    id: 6,
    title: 'Anxiety in the Workplace: A Clinical Perspective',
    date: '2024-09-05',
    attendees: 95,
    recording: false,
  },
];

export default function WebinarsPage() {
  const [registering, setRegistering] = useState<number | null>(null);
  const [registered, setRegistered] = useState<number[]>([]);

  const handleRegister = (id: number) => {
    setRegistering(id);
    setTimeout(() => {
      setRegistered((prev) => [...prev, id]);
      setRegistering(null);
    }, 1200);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Live & Online</span>
          <h1 className="text-5xl font-black text-gray-900 mt-2 mb-4">Webinars</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join Dr. Alexandra Alexandru for live, interactive sessions on burnout prevention, 
            wellbeing, and professional development.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10">Upcoming Webinars</h2>
          <div className="space-y-6">
            {upcomingWebinars.map((w) => (
              <div key={w.id} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-teal-200 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {w.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{w.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{w.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-teal-500" />
                        {new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4 text-teal-500" />
                        {w.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4 text-teal-500" />
                        {w.spots} spots remaining
                      </span>
                    </div>
                    {/* Capacity bar */}
                    <div className="mt-4 max-w-xs">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all"
                          style={{ width: `${((w.totalSpots - w.spots) / w.totalSpots) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{w.totalSpots - w.spots} of {w.totalSpots} registered</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0">
                    <div className="text-2xl font-black text-teal-600">{w.price}</div>
                    {registered.includes(w.id) ? (
                      <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-xl font-semibold border border-green-200">
                        <CheckCircleIcon className="w-5 h-5" />
                        Registered!
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(w.id)}
                        disabled={registering === w.id}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                      >
                        {registering === w.id ? 'Registering...' : 'Register Now'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Room Preview */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Powered by Whereby</span>
            <h2 className="text-2xl font-black text-gray-900 mt-2">Live Webinar Room</h2>
            <p className="text-gray-600 mt-2 max-w-lg mx-auto text-sm">
              Our webinars run on Whereby — no downloads required. Register for an upcoming session 
              to receive your room link directly in your inbox.
            </p>
          </div>
          {/* Whereby embed placeholder */}
          <div className="mx-auto max-w-2xl bg-white border-2 border-dashed border-teal-200 rounded-2xl p-12 text-center">
            <VideoCameraIcon className="w-12 h-12 text-teal-300 mx-auto mb-4" />
            <p className="text-teal-600 font-semibold mb-2">Webinar Room</p>
            <p className="text-gray-400 text-sm">
              The live session will appear here when a registered webinar starts.
            </p>
            <p className="text-xs text-gray-300 mt-3 font-mono">
              {/* Replace with actual Whereby URL: */}
              {'<iframe src="https://whereby.com/your-room" allow="camera; microphone" />'}
            </p>
          </div>
        </div>
      </section>

      {/* Past Webinars */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10">Past Webinars</h2>
          <div className="space-y-4">
            {pastWebinars.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">{w.title}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>{new Date(w.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>{w.attendees} attendees</span>
                  </div>
                </div>
                {w.recording ? (
                  <Link href="/resources" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    <VideoCameraIcon className="w-4 h-4" />
                    Watch Recording
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400 px-4 py-2">Recording unavailable</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
