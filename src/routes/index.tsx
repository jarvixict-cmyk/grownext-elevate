import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Briefcase,
  Wallet,
  Home,
  UserCog,
  ScanLine,
  CheckCircle2,
  Building2,
  Network,
  Zap,
  ShieldCheck,
  Menu,
  X,
  ChevronUp,
  MessageCircle,
  Linkedin,
  Clock,
  Award,
} from "lucide-react";
import companyLogo from "@/assets/grownext-logo.png";
import heroImg from "@/assets/hero-workforce.jpg";
import aboutImg from "@/assets/about-team.jpg";
import sbiLogo from "@/assets/clients/sbi-logo.png";
import maxicusLogo from "@/assets/clients/maxicus-logo.png";
import mevrickLogo from "@/assets/clients/mevrick-logo.png";
import iiestLogo from "@/assets/clients/iiest-logo.png";

const PHONE = "+91 94779 68556";
const PHONE_TEL = "+919477968556";
const EMAIL = "grownextsolutions@zohomail.in";
const WHATSAPP_URL = "https://wa.me/919477968556";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowNext Solutions — India's Trusted Workforce & Hiring Partner" },
      {
        name: "description",
        content:
          "GrowNext Solutions is one of India's leading manpower outsourcing companies providing Recruitment, Payroll Management, Work From Home Staffing, HR Outsourcing and Scanning & Digitization Services across India.",
      },
      { property: "og:title", content: "GrowNext Solutions" },
      {
        property: "og:description",
        content: "India's trusted workforce & hiring partner for enterprise organizations.",
      },
    ],
  }),
  component: LandingPage,
});

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
} as const;

/* ---------- helpers ---------- */
function Counter({
  to,
  suffix = "",
  duration = 2.2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: smoothEase,
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.75, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <span className="section-label">{label}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="heading-xl mt-4 text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={companyLogo}
      alt="GrowNext Solutions"
      width={48}
      height={48}
      className={`rounded-xl object-contain ${className}`}
    />
  );
}

/* ---------- sticky nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#why", label: "Why Us" },
    { href: "#process", label: "Process" },
    { href: "#clients", label: "Clients" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background,box-shadow] duration-500 ${
          scrolled ? "glass-strong py-3 shadow-[var(--shadow-nav)]" : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3"
          >
            <BrandLogo className="h-10 w-10 sm:h-11 sm:w-11 shadow-[var(--shadow-card)]" />
            <div className="hidden min-[380px]:block">
              <span className="font-display text-base font-bold leading-tight text-navy sm:text-lg">
                GrowNext
                <span className="text-royal"> Solutions</span>
              </span>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]">
                Workforce Partner
              </p>
            </div>
          </motion.a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                whileHover={{ y: -1 }}
                className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-royal transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-6 py-2.5 text-sm font-semibold btn-primary"
            >
              Hire Talent
            </motion.a>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="rounded-xl p-2.5 text-navy lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        <motion.div
          style={{ scaleX: progressWidth }}
          className="h-0.5 origin-left bg-gradient-to-r from-navy via-royal to-royal-light"
        />

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="overflow-hidden lg:hidden"
            >
              <div className="glass-strong mx-4 mt-3 rounded-2xl p-5 sm:mx-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-3.5 text-sm font-semibold text-navy last:border-0"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-full px-5 py-3 text-center text-sm font-semibold btn-primary"
                >
                  Hire Talent
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22 });
  const sy = useSpring(my, { stiffness: 45, damping: 22 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 24);
      }}
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: 4 + (i % 4) * 3,
              height: 4 + (i % 4) * 3,
              background:
                i % 2
                  ? "color-mix(in oklab, var(--royal) 30%, transparent)"
                  : "color-mix(in oklab, var(--royal-light) 40%, transparent)",
            }}
            animate={{ y: [0, -24, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 7 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          style={{ y }}
          className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--royal) 22%, transparent), transparent 68%)",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--navy) 1px, transparent 1px), linear-gradient(90deg, var(--navy) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-royal/15 bg-white/80 px-4 py-2 text-xs font-semibold text-royal shadow-[var(--shadow-card)] backdrop-blur-md">
              <Award className="h-3.5 w-3.5" /> Enterprise Workforce Solutions
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="heading-xl mt-7 text-[2rem] sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            India&apos;s Trusted <span className="text-gradient">Workforce &amp; Hiring</span>{" "}
            Partner
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground sm:text-lg"
          >
            GrowNext Solutions is one of India&apos;s leading manpower outsourcing companies
            providing Recruitment, Payroll Management, Work From Home Staffing, HR Outsourcing and
            Scanning &amp; Digitization Services across India.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold btn-primary sm:text-base"
            >
              Hire Talent <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold btn-outline sm:text-base"
            >
              Contact Us
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-1 gap-3 text-sm text-muted-foreground min-[480px]:grid-cols-3"
          >
            {[
              { icon: Network, text: "Pan India network" },
              { icon: ShieldCheck, text: "Compliance ready" },
              { icon: Clock, text: "48 hr turnaround" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl bg-white/50 px-3 py-2 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-royal" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x: sx, y: sy }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: smoothEase, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl glass-strong p-3 shadow-[var(--shadow-premium)]"
          >
            <img
              src={heroImg}
              alt="GrowNext workforce management"
              width={1280}
              height={1024}
              className="h-auto w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-inset ring-white/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: smoothEase }}
            className="absolute -left-2 top-8 hidden items-center gap-3 rounded-2xl glass-strong p-4 shadow-[var(--shadow-premium)] sm:flex md:-left-6"
          >
            <BrandLogo className="h-10 w-10" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Candidates Delivered</p>
              <p className="font-display text-xl font-bold text-navy">
                <Counter to={2000} suffix="+" />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.6, ease: smoothEase }}
            className="absolute -bottom-4 -right-2 hidden items-center gap-3 rounded-2xl glass-strong p-4 shadow-[var(--shadow-premium)] animate-float-slow sm:flex md:-right-4"
          >
            <BrandLogo className="h-10 w-10" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Happy Clients</p>
              <p className="font-display text-xl font-bold text-navy">
                <Counter to={20} suffix="+" />
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- stats ---------- */
function Stats() {
  const items = [
    { value: 2000, suffix: "+", label: "Candidates Delivered" },
    { value: 20, suffix: "+", label: "Happy Clients" },
    { text: "Pan India", label: "Hiring Network" },
    { text: "Fast", label: "Recruitment" },
  ];

  return (
    <section className="relative -mt-12 px-4 sm:-mt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="glass-strong grid grid-cols-2 gap-4 rounded-3xl p-6 shadow-[var(--shadow-premium)] sm:gap-6 sm:p-8 md:grid-cols-4 md:p-10"
        >
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: smoothEase }}
              whileHover={{ y: -4 }}
              className="group relative text-center"
            >
              <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-gradient-to-r from-royal to-royal-light opacity-60 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />
              <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl md:text-4xl">
                {"value" in s ? <Counter to={s.value!} suffix={s.suffix} /> : s.text}
              </p>
              <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-royal/15 to-royal-light/15 blur-3xl" />
            <img
              src={aboutImg}
              alt="GrowNext HR team"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative h-auto w-full rounded-3xl object-cover shadow-[var(--shadow-premium)] ring-1 ring-border/50"
            />
          </motion.div>
        </Reveal>
        <div>
          <SectionHeader
            label="Who We Are"
            title="Building India's most reliable workforce engine"
          />
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                GrowNext Solutions is one of India&apos;s leading manpower support and workforce
                management companies trusted by enterprises nationwide.
              </p>
              <p>
                We specialize in providing skilled manpower for{" "}
                <strong className="font-semibold text-navy">
                  BPO, ITES, Banking, Corporate, and Service Industries
                </strong>{" "}
                across India.
              </p>
              <p>
                Our experienced HR and Recruitment team makes hiring simple, fast, cost-effective,
                and hassle-free — reducing recruitment burden while helping organizations hire
                quality talent faster.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Network, label: "Pan India Reach" },
                { icon: ShieldCheck, label: "Fully Compliant" },
                { icon: Zap, label: "Faster Hiring" },
                { icon: Building2, label: "Enterprise Grade" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, ease: smoothEase }}
                  whileHover={{ y: -4, boxShadow: "var(--shadow-premium)" }}
                  className="enterprise-card flex items-center gap-3 p-4"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-[var(--shadow-card)]"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-navy">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */
const services = [
  {
    icon: Briefcase,
    title: "Recruitment & Staffing Solutions",
    desc: "End-to-end hiring across permanent, bulk, volume and campus recruitment.",
    bullets: ["Permanent Hiring", "Bulk Hiring", "Volume Hiring", "Campus Hiring"],
  },
  {
    icon: Wallet,
    title: "Payroll Management",
    desc: "Complete payroll handling with compliance, salary processing, attendance, employee management, documentation, and workforce responsibility managed by GrowNext Solutions.",
  },
  {
    icon: Home,
    title: "Work From Home Workforce",
    desc: "A large database of verified Work From Home candidates available across India.",
    bullets: [
      "Less office crowd",
      "Lower infrastructure cost",
      "Faster onboarding",
      "Ready workforce",
    ],
  },
  {
    icon: UserCog,
    title: "HR Outsourcing",
    desc: "Dedicated HR professionals manage recruitment efficiently, saving valuable business time and operational costs.",
  },
  {
    icon: ScanLine,
    title: "Scanning & Digitization Services",
    desc: "Professional document scanning, indexing, digital archiving, OCR processing, and secure digitization services for organizations.",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--royal-light) 6%, transparent), transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="What We Do"
          title="Workforce solutions, end to end"
          description="From sourcing to payroll — five integrated services that scale with enterprise organizations."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong p-7 shadow-[var(--shadow-card)]"
              >
                <div
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--royal) 25%, transparent), transparent 70%)",
                  }}
                />
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-glow)]"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                {s.bullets && (
                  <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm font-medium text-navy">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-royal" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- why ---------- */
function Why() {
  const reasons = [
    "Pan India Hiring Network",
    "Experienced HR Team",
    "Faster Hiring Process",
    "Payroll Management",
    "Bulk Recruitment Expertise",
    "Verified Work From Home Candidates",
    "Cost Effective Solutions",
    "Trusted by Leading Organizations",
  ];

  return (
    <section id="why" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label="Why GrowNext" title="The partner enterprises trust" />
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="enterprise-card flex h-full items-start gap-3 p-5"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-navy">{r}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */
function Process() {
  const steps = [
    "Requirement Analysis",
    "Candidate Sourcing",
    "Screening",
    "Interview Coordination",
    "Joining",
    "Payroll & Support",
  ];

  return (
    <section
      id="process"
      className="section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--navy) 3%, transparent))",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label="Hiring Process" title="Six steps from brief to onboarding" />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-royal/35 to-transparent lg:block" />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="relative text-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-white shadow-[var(--shadow-glow)]"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <span className="font-display text-lg font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                  <p className="mt-4 text-xs font-semibold leading-snug text-navy sm:text-sm">
                    {step}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- clients ---------- */
function Clients() {
  const logos = [
    { name: "SBI", src: sbiLogo },
    { name: "MAXICUS", src: maxicusLogo },
    { name: "MEVRICK SOLUTION PRIVATE LIMITED", src: mevrickLogo },
    { name: "IIEST SHIBPUR", src: iiestLogo },
  ];
  const row = [...logos, ...logos];

  return (
    <section id="clients" className="section-padding overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="Trusted By"
          title="Powering hiring at leading organizations"
          description="Partnering with India's most respected institutions and enterprises."
        />
        <div className="relative mt-16 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-10 animate-marquee sm:gap-16">
            {row.map((l, i) => (
              <motion.div
                key={`${l.name}-${i}`}
                whileHover={{ scale: 1.05, y: -4 }}
                className="grid h-24 w-52 shrink-0 place-items-center rounded-2xl bg-white px-8 shadow-[var(--shadow-card)] ring-1 ring-border/40 sm:h-28 sm:w-56"
              >
                <img
                  src={l.src}
                  alt={l.name}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--royal-light) 8%, transparent))",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="Get In Touch"
          title="Let's build your workforce"
          description="Speak with our workforce specialists — we respond within one business day."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex h-full flex-col gap-6 rounded-3xl glass-strong p-7 shadow-[var(--shadow-premium)] sm:p-9"
            >
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  content: (
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="font-display text-lg font-bold text-navy hover:text-royal"
                    >
                      {PHONE}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a
                      href={`mailto:${EMAIL}`}
                      className="block truncate font-display text-lg font-bold text-navy hover:text-royal"
                    >
                      {EMAIL}
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  label: "Reach",
                  content: <p className="font-display text-lg font-bold text-navy">Pan India</p>,
                },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-card)]"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <div className="mt-1">{content}</div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href={`tel:${PHONE_TEL}`}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold btn-primary"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </motion.a>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold btn-outline"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </motion.a>
              </div>

              <div className="mt-auto overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
                <iframe
                  title="Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=68.7%2C8.4%2C97.25%2C37.6&layer=mapnik"
                  className="h-48 w-full sm:h-52"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.form
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="grid grid-cols-1 gap-4 rounded-3xl glass-strong p-7 shadow-[var(--shadow-premium)] sm:grid-cols-2 sm:p-9"
            >
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "company", label: "Company", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone", type: "tel" },
              ].map((f) => (
                <motion.div key={f.name} whileFocus={{ scale: 1.01 }} className="flex flex-col">
                  <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    className="rounded-xl border border-border bg-white/90 px-4 py-3.5 text-sm text-navy outline-none transition-all focus:border-royal focus:ring-2 focus:ring-royal/15"
                  />
                </motion.div>
              ))}
              <div className="flex flex-col sm:col-span-2">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Requirement
                </label>
                <textarea
                  required
                  rows={4}
                  name="requirement"
                  className="rounded-xl border border-border bg-white/90 px-4 py-3.5 text-sm text-navy outline-none transition-all focus:border-royal focus:ring-2 focus:ring-royal/15"
                />
              </div>
              <div className="sm:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold btn-primary sm:w-auto"
                >
                  {sent ? (
                    "Thank you! We'll reach out shortly."
                  ) : (
                    <>
                      Submit <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const footerLinks = {
    Company: [
      { href: "#about", label: "About Us" },
      { href: "#why", label: "Why GrowNext" },
      { href: "#process", label: "Our Process" },
      { href: "#clients", label: "Clients" },
    ],
    Services: [
      { href: "#services", label: "Recruitment & Staffing" },
      { href: "#services", label: "Payroll Management" },
      { href: "#services", label: "Work From Home" },
      { href: "#services", label: "HR Outsourcing" },
    ],
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "var(--gradient-brand)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <BrandLogo className="h-12 w-12 bg-white/15 p-1 shadow-[var(--shadow-card)] backdrop-blur" />
              <div>
                <span className="font-display text-xl font-bold">GrowNext Solutions</span>
                <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                  Since 2020
                </p>
              </div>
            </motion.div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              India&apos;s Trusted Workforce &amp; Hiring Partner — delivering enterprise-grade
              recruitment, payroll, and HR outsourcing across India.
            </p>
            <div className="mt-6 flex gap-3">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={`mailto:${EMAIL}`}
                whileHover={{ scale: 1.1, y: -2 }}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-white/70">
                {title}
              </p>
              <ul className="mt-5 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <motion.a
                      href={l.href}
                      whileHover={{ x: 4 }}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-white/70">
              Contact Information
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`tel:${PHONE_TEL}`} className="hover:text-white">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-white">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Pan India Operations</span>
              </li>
            </ul>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
            >
              Hire Talent <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/65 sm:flex-row">
          <p>© Copyright GrowNext Solutions 2025. All Rights Reserved.</p>
          <p className="text-white/50">Recruitment · Payroll · HR Outsourcing · Digitization</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating actions ---------- */
function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.35, ease: smoothEase }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="grid h-12 w-12 place-items-center rounded-full glass-strong text-navy shadow-[var(--shadow-premium)]"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: smoothEase }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.55)]"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.a>
    </div>
  );
}

/* ---------- page ---------- */
function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Why />
      <Process />
      <Clients />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
