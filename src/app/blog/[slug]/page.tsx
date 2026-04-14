import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';

const posts: Record<string, {
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  content: string;
}> = {
  'recognising-burnout-early-signs': {
    title: '7 Early Warning Signs of Burnout You Should Never Ignore',
    date: '2024-12-10',
    category: 'Burnout & Stress',
    author: 'Dr. Alexandra Alexandru',
    image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1200&h=600&fit=crop',
    content: `
      Burnout rarely appears overnight. It is a gradual process that builds over weeks, months, and 
      sometimes years. The challenge is that many of its early symptoms mimic other conditions — 
      or are simply dismissed as "just stress."

      Here are seven warning signs that deserve your attention:

      **1. Persistent Exhaustion That Sleep Doesn't Fix**
      When you wake up feeling just as tired as when you went to bed, something deeper is happening. 
      This is not ordinary fatigue — it is the hallmark of burnout.

      **2. Increased Cynicism and Detachment**
      If you find yourself growing cynical about work, colleagues, or your purpose — where you once 
      felt engaged — this emotional detachment is a key burnout indicator.

      **3. Reduced Professional Efficacy**
      Tasks that were once straightforward now feel overwhelming. You question your abilities and 
      decisions in ways you never did before.

      **4. Physical Symptoms Without Clear Cause**
      Headaches, muscle tension, gastrointestinal issues, and frequent illness. Burnout is not 
      just psychological — it manifests physically.

      **5. Difficulty Concentrating**
      A persistent "brain fog" that makes it hard to focus, remember details, or make decisions.

      **6. Emotional Dysregulation**
      Irritability, unexpected tearfulness, or feeling emotionally numb. Your usual coping 
      mechanisms stop working.

      **7. Social Withdrawal**
      Avoiding friends, family, and social activities — even ones you previously enjoyed.

      **What to Do**
      
      If you recognise three or more of these signs, it is time to seek support. Burnout is treatable, 
      but the earlier it is addressed, the better the outcomes. Reach out to your GP, consider therapy, 
      and explore our burnout prevention webinars.
    `,
  },
  'family-medicine-preventive-care': {
    title: 'Why Preventive Care is the Most Powerful Medicine',
    date: '2024-11-28',
    category: 'Family Medicine',
    author: 'Dr. Alexandra Alexandru',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop',
    content: `
      In medicine, we often speak about treatment — but the most transformative interventions 
      happen before illness even takes hold. Preventive care is not merely a health system 
      strategy; it is the single most effective way to live a longer, healthier life.

      **The Statistics Are Clear**
      
      According to the World Health Organisation, up to 80% of premature heart disease and stroke, 
      and over 40% of cancers, could be prevented through lifestyle changes and early intervention. 
      Preventive care is not a luxury — it is essential medicine.

      **What Does a Good Preventive Check-Up Include?**

      A comprehensive annual health review should address:
      - Blood pressure and cholesterol screening
      - Blood glucose monitoring
      - BMI and body composition assessment
      - Cancer screenings (age and gender appropriate)
      - Mental health screening
      - Vaccination review
      - Personalised lifestyle counselling

      **The Family Medicine Advantage**
      
      Family physicians are uniquely placed to provide preventive care because we know your whole 
      history. We can spot patterns across years and connect symptoms that a specialist might miss 
      in isolation. That continuous relationship is one of the most valuable assets in healthcare.

      Schedule your annual check-up today — it could be the most important hour you spend this year.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <div>
      {/* Header Image */}
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={post.image}
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

        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{para.replace(/\*\*/g, '')}</h2>;
            }
            if (para.trim().startsWith('- ')) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                  {para.split('\n').filter(l => l.trim().startsWith('- ')).map((item, j) => (
                    <li key={j} className="text-gray-600">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
          })}
        </article>

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
