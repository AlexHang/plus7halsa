import Link from 'next/link';
import {
  HeartIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const medicalServices = [
  { icon: ClipboardDocumentListIcon, title: 'General Consultations', desc: 'Routine check-ups, illness assessment, referrals, and preventive care.' },
  { icon: HeartIcon, title: 'Chronic Disease Management', desc: 'Ongoing care for diabetes, hypertension, asthma, and other conditions.' },
  { icon: ShieldCheckIcon, title: 'Preventive Screenings', desc: 'Health screenings tailored to your age, lifestyle, and family history.' },
];

const trainingServices = [
  { icon: AcademicCapIcon, title: 'Burnout Prevention Workshops', desc: 'Practical, evidence-based workshops to help teams recognise and address burnout early.' },
  { icon: VideoCameraIcon, title: 'Online Webinars', desc: 'Live and recorded webinars on stress management, resilience, and workplace wellbeing.' },
  { icon: MicrophoneIcon, title: 'Public Speaking Coaching', desc: 'Build confidence and presence for presentations, conferences, and leadership roles.' },
];

const pricingTiers = [
  {
    name: 'Individual',
    price: 'From 1,200 kr',
    per: 'per session',
    features: ['Single consultation or coaching session', 'Personalised health plan', 'Email follow-up', 'Access to resource library'],
    cta: 'Book a Session',
    highlight: false,
  },
  {
    name: 'Team Package',
    price: 'From 8,500 kr',
    per: 'per workshop',
    features: ['Full-day workshop (up to 20 participants)', 'Custom content for your industry', 'Pre & post workshop assessment', 'Follow-up materials & recordings', 'Certificate of completion'],
    cta: 'Get a Quote',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: 'tailored pricing',
    features: ['Ongoing wellness programme', 'Quarterly workshops & webinars', 'Individual coaching sessions', 'Dedicated support contact', 'Impact reporting & analytics'],
    cta: 'Contact Us',
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h1 className="text-5xl font-black text-gray-900 mt-2 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From primary healthcare in our Gothenburg clinic to online workshops and corporate training — 
            we have a service to support every dimension of your wellbeing.
          </p>
        </div>
      </section>

      {/* Medical Cabinet */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Medical Cabinet</h2>
              <p className="text-gray-600">Comprehensive primary care in Gothenburg</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {medicalServices.map((s) => (
              <div key={s.title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
            <p className="text-teal-800 font-medium">
              📍 <strong>Location:</strong> Gothenburg, Sweden — both in-person and teleconsultation available
            </p>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Workshops & Training</h2>
              <p className="text-gray-600">Burnout management, stress resilience, and public speaking</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingServices.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Flexible Plans</h2>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto">Whether you are an individual, a team, or a large organisation, we have a plan for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 border-2 ${
                  tier.highlight
                    ? 'border-teal-600 bg-teal-600 text-white shadow-2xl scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4">Most Popular</span>
                )}
                <h3 className={`text-xl font-black mb-1 ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                <div className={`text-3xl font-black mb-1 ${tier.highlight ? 'text-white' : 'text-teal-600'}`}>{tier.price}</div>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-teal-100' : 'text-gray-500'}`}>{tier.per}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-teal-200' : 'text-teal-500'}`} />
                      <span className={tier.highlight ? 'text-teal-50' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-white text-teal-600 hover:bg-gray-50'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Not Sure Which Service Is Right for You?</h2>
          <p className="text-teal-100 mb-8">Book a free 15-minute discovery call and we&apos;ll find the best fit together.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
            Book Free Discovery Call <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
