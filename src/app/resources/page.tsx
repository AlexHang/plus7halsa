'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { LockClosedIcon, DocumentTextIcon, PresentationChartBarIcon, VideoCameraIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const resources = [
  {
    category: 'Workshop Materials',
    icon: PresentationChartBarIcon,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    items: [
      { title: 'Burnout Prevention Workshop – Slide Deck', type: 'PDF', size: '4.2 MB', date: '2024-12-01' },
      { title: 'Resilience Building Workbook', type: 'PDF', size: '1.8 MB', date: '2024-11-15' },
      { title: 'Stress Audit Template', type: 'XLSX', size: '0.5 MB', date: '2024-11-01' },
    ],
  },
  {
    category: 'Webinar Recordings',
    icon: VideoCameraIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      { title: 'Understanding Work-Life Balance – Recording', type: 'MP4', size: '512 MB', date: '2024-11-20' },
      { title: 'Nutrition, Sleep, and Mental Performance – Recording', type: 'MP4', size: '480 MB', date: '2024-10-12' },
    ],
  },
  {
    category: 'Reading & Research',
    icon: DocumentTextIcon,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    items: [
      { title: 'Burnout in Healthcare: A Review (2024)', type: 'PDF', size: '2.1 MB', date: '2024-10-05' },
      { title: 'Mindfulness in the Workplace – Evidence Summary', type: 'PDF', size: '1.4 MB', date: '2024-09-20' },
      { title: 'Recommended Reading List', type: 'PDF', size: '0.3 MB', date: '2024-09-01' },
    ],
  },
];

function ResourceCard({ item, typeColor }: { item: { title: string; type: string; size: string; date: string }; typeColor: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group">
      <div className="flex items-center gap-4">
        <div className={`px-2 py-1 rounded text-xs font-bold ${typeColor} bg-opacity-10`}>
          {item.type}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{item.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.size} · {new Date(item.date).toLocaleDateString('en-GB')}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors opacity-0 group-hover:opacity-100">
        <ArrowDownTrayIcon className="w-3.5 h-3.5" />
        Download
      </button>
    </div>
  );
}

function LockedState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LockClosedIcon className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Members Only</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The resources library is available to registered members. Sign in or create a free 
          account to access workshop materials, webinar recordings, and more.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/auth/login" className="block py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors">
            Log In
          </Link>
          <Link href="/auth/register" className="block py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-colors">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LockedState />;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Members Area</span>
          <h1 className="text-4xl font-black text-gray-900 mt-2 mb-3">Resources Library</h1>
          <p className="text-gray-600 max-w-xl">
            Welcome back! Access all workshop materials, webinar recordings, and research papers here.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {resources.map((section) => (
              <div key={section.category} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className={`flex items-center gap-3 px-6 py-5 ${section.bg} border-b border-gray-100`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                  <h2 className={`font-bold ${section.color}`}>{section.category}</h2>
                  <span className="ml-auto text-xs text-gray-400">{section.items.length} files</span>
                </div>
                <div className="px-6">
                  {section.items.map((item) => (
                    <ResourceCard key={item.title} item={item} typeColor={section.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
