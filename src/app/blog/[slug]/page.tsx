'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface Post {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  coverImage?: string;
  content: string;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const { getFirebaseDb } = await import('@/lib/firebase');
        const { collection, getDocs, query, where, limit } = await import('firebase/firestore');
        const db = await getFirebaseDb();
        const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setMissing(true);
          return;
        }
        const doc = snapshot.docs[0];
        const data = doc.data();
        const ts = data.createdAt;
        const date = ts?.toDate
          ? ts.toDate().toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
        setPost({
          id: doc.id,
          title: data.title ?? '',
          date,
          category: data.category ?? '',
          author: data.author ?? '',
          coverImage: data.coverImage,
          content: data.content ?? '',
        });
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setMissing(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (missing || !post) return notFound();

  return (
    <div>
      {/* Header Image */}
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={post.coverImage || PLACEHOLDER_IMAGE}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">A</div>
            <span className="text-sm text-gray-500">{post.author}</span>
          </div>
        </div>

        <article
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 p-6 bg-teal-50 rounded-2xl border border-teal-100">
          <p className="font-semibold text-teal-800 mb-2">Found this article helpful?</p>
          <p className="text-teal-700 text-sm mb-4">
            Join our upcoming webinars or book a consultation with Dr. Alexandra Alexandru.
          </p>
          <div className="flex gap-3">
            <Link href="/webinars" className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors">
              View Webinars
            </Link>
            <Link href="/auth/register" className="px-4 py-2 border border-teal-600 text-teal-600 text-sm font-semibold rounded-lg hover:bg-teal-50 transition-colors">
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

