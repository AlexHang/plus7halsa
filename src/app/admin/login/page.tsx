import { redirect } from 'next/navigation';

// Convenience route: /admin/login redirects to the shared auth login page.
export default async function AdminLoginPage() {
  redirect('/auth/login');
}
