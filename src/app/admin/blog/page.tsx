'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  TrashIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
}

const categoryColors: Record<string, string> = {
  'Burnout & Stress': 'bg-orange-100 text-orange-700',
  'Family Medicine': 'bg-teal-100 text-teal-700',
  'Public Speaking': 'bg-purple-100 text-purple-700',
  'Workplace Wellness': 'bg-blue-100 text-blue-700',
};

export default function AdminBlogPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const loadPosts = async () => {
      setLoadingPosts(true);
      setError('');
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
            ? ts.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            : '—';
          return {
            id: doc.id,
            slug: data.slug ?? doc.id,
            title: data.title ?? '(untitled)',
            category: data.category ?? '',
            date,
            author: data.author ?? '',
          };
        });
        setPosts(fetched);
      } catch (err) {
        console.error(err);
        setError('Could not load posts. Check your Firebase configuration.');
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPosts();
  }, [user, loading]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This action cannot be undone.')) return;
    setDeletingId(id);
    try {
      const { getFirebaseDb } = await import('@/lib/firebase');
      const { doc, deleteDoc } = await import('firebase/firestore');
      const db = await getFirebaseDb();
      await deleteDoc(doc(db, 'posts', id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete post.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <LockClosedIcon className="w-12 h-12 text-teal-300 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-gray-900 mb-3">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to manage blog posts.</p>
          <Link
            href="/auth/login"
            className="block py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Blog Posts</h1>
            <p className="text-sm text-gray-500 mt-1">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Sign Out
            </button>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              New Post
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Posts table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loadingPosts ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="mb-4">No posts yet.</p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Write your first post
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3 hidden md:table-cell">Category</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="font-medium text-gray-900 hover:text-teal-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{post.author}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-gray-500">{post.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                        {deletingId === post.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
          <strong>Tip:</strong> Click on a post title to preview it on the public blog. Posts are
          stored in Firestore and images in Firebase Storage.
        </div>
      </div>
    </div>
  );
}
