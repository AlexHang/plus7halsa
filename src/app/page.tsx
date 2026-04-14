import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, AcademicCapIcon, MicrophoneIcon, StarIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '2,500+', label: 'Patients Served' },
  { value: '50+', label: 'Workshops Delivered' },
  { value: '98%', label: 'Patient Satisfaction' },
];

const services = [
  {
    icon: HeartIcon,
    title: 'Family Medicine',
    desc: 'Comprehensive primary care for you and your family. Preventive screenings, chronic disease management, and personalised health plans.',
    href: '/services',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: AcademicCapIcon,
    title: 'Burnout & Stress Training',
    desc: 'Evidence-based webinars and training programmes helping individuals and organisations recognise, prevent, and recover from burnout.',
    href: '/webinars',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: MicrophoneIcon,
    title: 'Public Speaking Coaching',
    desc: 'Empowering healthcare professionals and corporate teams with effective communication, presentation, and leadership skills.',
    href: '/services',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

const testimonials = [
  {
    name: 'Maria S.',
    role: 'HR Manager, Tech Company',
    quote: "Dr. Alexandra's burnout workshop transformed how our team handles stress. Practical, insightful, and delivered with genuine care.",
    rating: 5,
  },
  {
    name: 'Johan L.',
    role: 'Patient, Gothenburg',
    quote: "Finally a family doctor who listens! She takes the time to understand not just the symptoms but the whole picture.",
    rating: 5,
  },
  {
    name: 'Anna K.',
    role: 'CEO, Healthcare Startup',
    quote: "The public speaking course gave our leadership team a completely new confidence. Highly recommend for any corporate team.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d9488' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full mb-6">
                🏥 Välkommen till plus7hälsa
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
                Hälsa &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  Välmående
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                Expert family medicine, burnout management training, and public speaking coaching 
                by <strong>Dr. Alexandra Alexandru</strong> — serving Gothenburg and beyond.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-200 transition-all"
                >
                  Explore Services
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/webinars"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all"
                >
                  Upcoming Webinars
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {['Family Medicine', 'Burnout Prevention', 'Corporate Training'].map((t) => (
                  <span key={t} className="flex items-center gap-1">
                    <CheckCircleIcon className="w-4 h-4 text-teal-500" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Doctor photo placeholder */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=640&h=800&fit=crop&crop=face"
                  alt="Dr. Alexandra Alexandru"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Dr. Alexandra Alexandru</p>
                    <p className="text-xs text-gray-500">Family Medicine, Gothenburg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-black text-white">{s.value}</p>
                <p className="text-teal-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Our Services</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              From primary healthcare to professional development — we support your wellbeing at every level.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${s.color}`}>
                  Learn more <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-teal-100 to-blue-100">
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=640&h=640&fit=crop&crop=face"
                  alt="Dr. Alexandra Alexandru - Family Doctor"
                  width={640}
                  height={640}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 max-w-xs hidden lg:block">
                <p className="text-xs text-gray-500 mb-1">Mission</p>
                <p className="text-sm font-medium text-gray-800">"Making healthcare and wellbeing accessible for everyone."</p>
              </div>
            </div>
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Meet the Doctor</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 mb-6">Dr. Alexandra Alexandru</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                With over a decade of experience in family medicine, Dr. Alexandra brings a holistic 
                approach to health — treating the whole person, not just the symptoms. Based in 
                Gothenburg, she combines clinical expertise with a passion for education.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Her pioneering work in burnout prevention has helped thousands of individuals and 
                organisations build healthier, more sustainable ways of working and living.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Board-certified Family Medicine Physician',
                  'Certified Burnout Prevention Specialist',
                  'Corporate Training & Public Speaking Expert',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors"
              >
                Read Full Bio <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Prioritise Your Health?</h2>
          <p className="text-teal-100 text-xl mb-8 max-w-2xl mx-auto">
            Book a consultation, join an upcoming webinar, or enquire about corporate training for your team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Today
            </Link>
            <Link
              href="/webinars"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              View Webinars
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
