'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  coverImage?: string;
}

const categories = ['All', 'Burnout & Stress', 'Family Medicine', 'Public Speaking', 'Workplace Wellness'];

const categoryColors: Record<string, string> = {
  'Burnout & Stress': 'bg-orange-100 text-orange-700',
  'Family Medicine': 'bg-teal-100 text-teal-700',
  'Public Speaking': 'bg-purple-100 text-purple-700',
  'Workplace Wellness': 'bg-blue-100 text-blue-700',
};

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=640&h=400&fit=crop';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    (async () => {
      try {
        const { getFirebaseDb } = await import('@/lib/firebase');
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
        const db = await getFirebaseDb();
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetched: Post[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const ts = data.createdAt;
          const date = ts?.toDate
            ? ts.toDate().toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];
          return {
            id: doc.id,
            slug: data.slug ?? doc.id,
            title: data.title ?? '',
            excerpt: data.excerpt ?? '',
            date,
            category: data.category ?? '',
            author: data.author ?? '',
            coverImage: data.coverImage,
          };
        });
        setPosts(fetched);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    })();
  }, []);

  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Insights & Advice</span>
          <h1 className="text-5xl font-black text-gray-900 mt-2 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Evidence-based articles on health, burnout prevention, and professional development.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loadingPosts ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage || PLACEHOLDER_IMAGE}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <h2 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                        A
                      </div>
                      <span className="text-xs text-gray-500">{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!loadingPosts && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">No posts in this category yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
