import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const credentials = [
  { year: '2010', title: 'MD – Karolinska Institutet', desc: 'Doctor of Medicine, with specialisation in General Practice' },
  { year: '2013', title: 'Family Medicine Specialist', desc: 'Swedish Board of Medicine certified Family Physician' },
  { year: '2017', title: 'Burnout Prevention Certification', desc: 'Advanced training in occupational stress and burnout recovery' },
  { year: '2020', title: 'Corporate Training Programme', desc: 'Certified facilitator for workplace wellbeing programmes' },
];

const values = [
  { title: 'Whole-Person Care', desc: 'Treating the physical, mental, and social dimensions of health together.' },
  { title: 'Evidence-Based Practice', desc: 'Every recommendation grounded in the latest clinical research.' },
  { title: 'Accessibility', desc: 'Healthcare and education that reaches everyone, regardless of background.' },
  { title: 'Prevention First', desc: 'Empowering patients to prevent illness before it starts.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">About</span>
              <h1 className="text-5xl font-black text-gray-900 mt-2 mb-6">
                Dr. Alexandra<br />
                <span className="text-teal-600">Alexandru</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Family physician, burnout specialist, and public speaking coach — dedicated to 
                transforming how we think about health and wellbeing in Sweden and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With roots in Romania and a practice built in the heart of Gothenburg, Dr. Alexandra 
                brings a uniquely multicultural perspective to patient care and professional education.
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=640&h=800&fit=crop&crop=face"
                  alt="Dr. Alexandra Alexandru"
                  width={640}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">My Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Growing up, I witnessed first-hand how burnout could silently erode not only 
              productivity but joy, relationships, and health. That experience shaped everything 
              about my approach to medicine.
            </p>
            <p>
              After completing my medical degree at Karolinska Institutet, I spent years in clinical 
              practice in Gothenburg, where I noticed a recurring pattern: patients presenting with 
              physical symptoms that were deeply rooted in chronic stress and workplace overwhelm. 
              This realisation pushed me to specialise in burnout prevention and recovery.
            </p>
            <p>
              Today, plus7hälsa is the culmination of that journey — a place where family medicine 
              meets wellness education. I consult patients, deliver training to companies across 
              Sweden, and coach professionals on how to communicate with confidence and clarity.
            </p>
            <p>
              Whether you are a patient seeking holistic primary care, a company wanting to protect 
              your people, or a professional wanting to improve your public presence — you are in 
              the right place.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Qualifications</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Education & Credentials</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block"></div>
            <div className="space-y-8">
              {credentials.map((c) => (
                <div key={c.year} className="relative flex gap-8">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-teal-600 text-white font-bold text-sm flex-shrink-0 z-10 shadow-lg">
                    {c.year}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="md:hidden text-teal-600 font-bold text-sm">{c.year}</span>
                      <h3 className="font-bold text-gray-900">{c.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-teal-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-6">My Mission</h2>
          <p className="text-xl text-teal-100 leading-relaxed">
            To bridge the gap between medical knowledge and everyday wellbeing — making 
            evidence-based healthcare and burnout education accessible to every person and 
            every organisation in Sweden.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Principles</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircleIcon className="w-10 h-10 text-teal-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to Work Together?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Whether for personal healthcare or professional development, let's start a conversation.
          </p>
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors">
            View Services <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
