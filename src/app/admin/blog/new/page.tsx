'use client';

import { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { LockClosedIcon, PhotoIcon } from '@heroicons/react/24/outline';

function ToolbarBtn({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
        active ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

const CATEGORIES = ['Burnout & Stress', 'Family Medicine', 'Public Speaking', 'Workplace Wellness'];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function NewBlogPostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: 'Write your article here...' }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-[400px] focus:outline-none prose prose-lg max-w-none p-6',
      },
    },
  });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const uploadFileToStorage = async (file: File, path: string): Promise<string> => {
    const { getFirebaseStorage } = await import('@/lib/firebase');
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const storage = await getFirebaseStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleInlineImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    try {
      const slug = generateSlug(title) || 'untitled';
      const ext = file.name.split('.').pop();
      const path = `posts/${slug}/images/${Date.now()}.${ext}`;
      const url = await uploadFileToStorage(file, path);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error('Image upload failed:', err);
      setSaveError('Image upload failed. Check Firebase Storage configuration.');
    }
    // reset so the same file can be selected again
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!title.trim() || !editor?.getHTML()) {
      setSaveError('Please add a title and content before saving.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const slug = generateSlug(title);

      let coverImageUrl = '';
      if (coverImage) {
        const ext = coverImage.name.split('.').pop();
        coverImageUrl = await uploadFileToStorage(
          coverImage,
          `posts/${slug}/cover.${ext}`,
        );
      }

      const { getFirebaseDb } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const db = await getFirebaseDb();
      await addDoc(collection(db, 'posts'), {
        title,
        excerpt,
        category,
        content: editor.getHTML(),
        author: user?.email ?? 'Dr. Alexandra Alexandru',
        createdAt: serverTimestamp(),
        slug,
        ...(coverImageUrl ? { coverImage: coverImageUrl } : {}),
      });
      setSaved(true);
      setTimeout(() => router.push('/admin/blog'), 1500);
    } catch (err) {
      setSaveError(
        'Could not save. Firebase may not be configured — check your .env.local file.'
      );
      console.error(err);
    } finally {
      setSaving(false);
    }
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
          <p className="text-gray-600 mb-6">Please sign in to access the blog editor.</p>
          <NextLink
            href="/auth/login"
            className="block py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
          >
            Sign In
          </NextLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">New Blog Post</h1>
            <p className="text-sm text-gray-500 mt-1">Writing as {user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <NextLink
              href="/admin/blog"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </NextLink>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              {saved ? 'Saved! Redirecting...' : saving ? 'Saving...' : 'Publish Post'}
            </button>
          </div>
        </div>

        {saveError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {saveError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Title */}
          <div className="p-6 border-b border-gray-100">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className="w-full text-3xl font-black text-gray-900 placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="px-6 py-4 border-b border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Excerpt / Summary
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description shown on the blog listing page..."
              rows={2}
              className="w-full text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none"
            />
          </div>

          {/* Cover Image */}
          <div className="px-6 py-4 border-b border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Cover Image
            </label>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
            {coverPreview ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-48 w-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/90 text-xs font-medium rounded-lg border border-gray-200 hover:bg-white transition-colors"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors w-full justify-center"
              >
                <PhotoIcon className="w-5 h-5" />
                Upload cover image
              </button>
            )}
          </div>

          {/* Metadata row */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-4 text-sm">
            <label className="text-gray-600 font-medium">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Toolbar */}
          {editor && (
            <div className="px-6 py-2 border-b border-gray-100 flex flex-wrap gap-1 bg-gray-50">
              <ToolbarBtn
                label="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
              />
              <ToolbarBtn
                label="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
              />
              <ToolbarBtn
                label="H2"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
              />
              <ToolbarBtn
                label="H3"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive('heading', { level: 3 })}
              />
              <ToolbarBtn
                label="• List"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
              />
              <ToolbarBtn
                label="1. List"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
              />
              <ToolbarBtn
                label="Quote"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive('blockquote')}
              />
              <ToolbarBtn
                label="Undo"
                onClick={() => editor.chain().focus().undo().run()}
              />
              <ToolbarBtn
                label="Redo"
                onClick={() => editor.chain().focus().redo().run()}
              />
              {/* Inline image upload */}
              <input
                ref={inlineImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInlineImageChange}
              />
              <ToolbarBtn
                label="🖼 Image"
                onClick={() => inlineImageInputRef.current?.click()}
              />
            </div>
          )}

          <EditorContent editor={editor} />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
          <strong>Note:</strong> Posts and images are saved to Firebase. Ensure your{' '}
          <code>.env.local</code> is configured with Firebase credentials before publishing.
        </div>
      </div>
    </div>
  );
}
