import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Accordion } from '../../components/ui/Accordion';
import { Footer } from '../../components/layout/Footer';
import {
  HeartPulse,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileSpreadsheet,
  Stethoscope,
  Users,
  Activity,
  Award,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
  UserCheck,
  Building,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const LandingPage: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { switchRole } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleQuickDemoLogin = (role: 'doctor' | 'patient' | 'receptionist' | 'admin') => {
    switchRole(role);
    showToast(`Logged in as Demo ${role.toUpperCase()}`, `Welcome to PulseCare Portal`, 'success');
    navigate(`/${role}/dashboard`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message Transmitted', 'Thank you! Our hospital desk will respond within 2 hours.', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const faqItems = [
    {
      id: 'faq-1',
      title: 'How does PulseCare ensure patient data privacy and HIPAA compliance?',
      content:
        'PulseCare implements enterprise AES-256 encryption at rest and TLS 1.3 in transit. All health records, lab documents, and prescriptions are access-restricted according to strict role-based permission matrices.',
    },
    {
      id: 'faq-2',
      title: 'Can patients book emergency appointments directly through the portal?',
      content:
        'Yes! The Patient module includes an interactive Emergency Booking button that bypasses standard queues, automatically flagging ER triage and assigning available emergency medical personnel.',
    },
    {
      id: 'faq-3',
      title: 'How do doctors create and send digital prescriptions?',
      content:
        'Clinicians use the Doctor Module to search patient histories, configure dosage/frequency/duration parameters, and generate digital PDF-downloadable prescriptions that instantly notify the patient.',
    },
    {
      id: 'faq-4',
      title: 'What features are available for Receptionists and Hospital Admins?',
      content:
        'Receptionists have a master admissions desk for walk-in registrations, doctor shift rosters, and patient search. Admins gain access to financial revenue charts, audit trail logs, and system backup controls.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white dark:bg-blue-500 shadow-soft-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100">
              Pulse<span className="text-blue-600 dark:text-blue-400">Care</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#roles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Portals</a>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Light/Dark Theme"
            >
              {effectiveTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <Link to="/auth/patient-login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/auth/doctor-login" className="hidden sm:inline-flex">
              <Button variant="glow" size="sm">
                Doctor Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-28">
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
            <span>Next-Gen Enterprise SaaS Healthcare Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Unified Healthcare Operations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Digital Patient Care</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering patients, doctors, receptionists, and hospital executives with real-time appointment booking, electronic health records, digital prescriptions, and duty scheduling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="glow"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => handleQuickDemoLogin('patient')}
            >
              Explore Patient Portal Demo
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleQuickDemoLogin('doctor')}
            >
              Doctor Portal Demo
            </Button>
          </motion.div>

          {/* Quick Portal Switcher Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">
              Instant Hackathon Demo:
            </span>
            <button
              onClick={() => handleQuickDemoLogin('doctor')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:border-blue-500 transition-colors shadow-soft-sm flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
              Doctor
            </button>
            <button
              onClick={() => handleQuickDemoLogin('patient')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:border-emerald-500 transition-colors shadow-soft-sm flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
              Patient
            </button>
            <button
              onClick={() => handleQuickDemoLogin('receptionist')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:border-amber-500 transition-colors shadow-soft-sm flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-amber-500" />
              Receptionist
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:border-purple-500 transition-colors shadow-soft-sm flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-purple-500" />
              Admin
            </button>
          </div>
        </div>
      </section>

      {/* Hospital Stats Section */}
      <section className="py-10 bg-blue-600 dark:bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black">99.9%</h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">Uptime & Reliability</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black">45,000+</h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">Active Consultations</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black">120+</h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">Specialized Doctors</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black">15 Mins</h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">Avg. ER Wait Time</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Built for Modern Hospital Workflows
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            PulseCare replaces fragmented legacy hospital portals with a unified, high-performance web platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300 w-fit">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Smart Appointment Booking</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive date selector, department filter, physician profiles, and real-time slot reservation with instant confirmation toasts.
            </p>
          </Card>

          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300 w-fit">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Digital Health Records & Labs</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Centralized view of patient vitals, blood groups, allergies, chronic conditions, downloadable lab test reports, and DICOM MRI previews.
            </p>
          </Card>

          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/60 dark:text-purple-300 w-fit">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">e-Prescription Management</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Clinicians quickly prescribe multi-medicine regimens with dosage frequency and duration parameters, generating downloadable PDFs.
            </p>
          </Card>

          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300 w-fit">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Shift & Duty Scheduling</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Receptionists and hospital administrators manage morning, evening, and night shift duty rosters across all medical departments.
            </p>
          </Card>

          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-300 w-fit">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Emergency Triage Dispatch</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              1-Click ER alert system instantly notifies attending emergency physicians and reserves trauma bay slots.
            </p>
          </Card>

          <Card hoverEffect glass className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-300 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Executive Analytics & Audit Logs</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Comprehensive hospital revenue metrics, department distribution pie charts, role permission matrices, and audit trail security logging.
            </p>
          </Card>
        </div>
      </section>

      {/* Role Portals Showcase */}
      <section id="roles" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              4 Specialized Role Portals
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
              Tailored interfaces designed specifically for each healthcare stakeholder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Doctor */}
            <Card hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 w-fit mb-4">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Doctor Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  View daily appointment queues, approve/reject consultations, inspect health records, and create digital prescriptions.
                </p>
              </div>
              <Link to="/auth/doctor-login">
                <Button variant="primary" size="sm" className="w-full">
                  Doctor Login
                </Button>
              </Link>
            </Card>

            {/* Patient */}
            <Card hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 w-fit mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Patient Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Book appointments, view medical history timelines, download e-prescriptions, and review billing statements.
                </p>
              </div>
              <Link to="/auth/patient-login">
                <Button variant="success" size="sm" className="w-full">
                  Patient Login
                </Button>
              </Link>
            </Card>

            {/* Receptionist */}
            <Card hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 w-fit mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Receptionist Desk</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Manage admissions desk, schedule walk-in consultations, assign doctor & nurse shift rosters, and search patient files.
                </p>
              </div>
              <Link to="/auth/receptionist-login">
                <Button variant="secondary" size="sm" className="w-full">
                  Receptionist Login
                </Button>
              </Link>
            </Card>

            {/* Admin */}
            <Card hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 w-fit mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Admin Dashboard</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Executive revenue charts, system uptime status, department configuration, role permission matrix, and backup tool.
                </p>
              </div>
              <Link to="/auth/admin-login">
                <Button variant="outline" size="sm" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trusted by Clinicians & Patients
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            Here is what health system leaders and patients say about PulseCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "PulseCare simplified our entire Cardiology department workflow. Creating digital prescriptions takes under 30 seconds and patients love instant notification updates."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                alt="Dr. Sarah Jenkins"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold">Dr. Sarah Jenkins, MD</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Chief of Cardiology</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "Booking specialist consultations used to require long phone queues. With PulseCare, I picked my doctor, date, and slot in 2 minutes right from my phone."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Alexander Wright"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold">Alexander Wright</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Patient</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "The admissions desk roster tool is a lifesaver. We manage 40+ nurse and doctor shifts across 6 hospital wings without single scheduling conflict."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Elena Rostova"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold">Elena Rostova</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Lead Receptionist</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Everything you need to know about PulseCare Portal.
            </p>
          </div>
          <Accordion items={faqItems} defaultOpenId="faq-1" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Contact Hospital Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Have questions regarding portal integration, billing, or appointment scheduling? Send us a message.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Your Full Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Dr. John Doe"
                className="w-full mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Message</label>
              <textarea
                rows={4}
                required
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Write your inquiry here..."
                className="w-full mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm"
              />
            </div>
            <Button variant="glow" size="md" className="w-full mt-4" leftIcon={<MessageSquare className="w-4 h-4" />}>
              Send Inquiry
            </Button>
          </form>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
