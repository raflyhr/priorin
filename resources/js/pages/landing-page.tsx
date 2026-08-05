import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CursorGrid from '@/components/cursor-grid';
import '@/components/cursor-grid.css';
import { useAppearance } from '@/hooks/use-appearance';

const navigation = [
    { id: 'cara-kerja', label: 'Cara Kerja' },
    { id: 'fitur', label: 'Fitur' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'faq', label: 'FAQ' },
];

const problems = [
    {
        icon: 'timer_off',
        title: 'Siklus Scroll TikTok',
        description:
            'Kehilangan berjam-jam waktu berharga hanya karena tidak tahu harus mulai dari mana. Hiburan pasif seringkali menguras energi mental tanpa memberikan kepuasan nyata.',
    },
    {
        icon: 'psychology',
        title: 'Burnout Akademik',
        description:
            'Terlalu memaksakan kursus online tanpa istirahat yang cukup. Liburan seharusnya menjadi momen pemulihan, bukan sekadar memindahkan beban kerja ke format lain.',
    },
    {
        icon: 'explore',
        title: 'FOMO Berlebihan',
        description:
            'Merasa harus melakukan segalanya sekaligus hingga akhirnya tidak melakukan apa-apa dengan maksimal. Tekanan sosial membuat perencanaan menjadi beban pikiran.',
    },
];

const steps = [
    {
        number: '',
        title: 'Input Preferensi',
        description:
            'Ceritakan pada AI kami tentang minat Anda, tingkat kelelahan saat ini, dan target yang ingin dicapai selama liburan semester.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz9ektHYdkdkgsKxC-_YoLFRj5Auu5PHcOXu4mk02v2HVy7-4anrYgM66vnZsGxZUwW8i1fiQAw4d-oPuHy0Q_ZwRzFR5cgKJcjF4643qtUq_lrsEnkirZLHQEJeqLub7DVkDXZgzVMLv5fSROcYUI11dy-T9mJZqk7i0gGHt_OXQvV_H7X6bPrVLxjUFCsfwUQCwe1d9IipOKNZxWLhpqw5jv6s679RX3HhoO8sPo0oc2PAV1Vaw',
    },
    {
        number: '',
        title: 'Analisis AI',
        description:
            'Algoritma Priorin menghitung alokasi waktu optimal untuk belajar, hobi, dan istirahat total berdasarkan data psikologi kognitif.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMoD03NuOQeQfR-SSqZfawFcvzpBGQgbr_ScUekhzn2E9evtjDsKrorGOyNoed2kNNyPIcA9EyQ389q-e4RnAz9S-nWfyi_JXAROh4Wa3-dyNpaQ-A2XvVyLmesZ6NXCVm4EL8X_s-toASC30Y2eDDN57S_IzrW7LAzeAbx9pHrhD4IhEXPpdJ6UFc0HmGi7PnSk_hEY5u75ckeGv1gHSyslHDANmc8kf3IGf9w6KvLgMpqyLRcXg',
    },
    {
        number: '',
        title: 'Eksekusi & Pantau',
        description:
            'Dapatkan jadwal harian yang dinamis. Jika Anda merasa lelah, AI akan menyesuaikan jadwal hari berikutnya secara otomatis.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_CKngBnonghEU2gcUFB0X2vJw0tk9hHWl8qVwwr3cASs682ImLPHw1XQ5LX8azIVkQ8eoTy2SiJknqLsBJ4KeNhKvesBtqg-9NdbQz9tJ1fKeAx8MamWDWmoZypIdmqDOG_FyDSnPbmRtKUPsrVChfORGMDfPvaoX77R53yMx8esdnbS16FVy_41X_TnN5ilFp57ot9oUimbyhdNRXybVJln0F_345QiytsQFEYv7jDNYV3kQkI',
    },
];

const testimonials = [
    {
        quote: 'Dulu liburan cuma scroll TikTok seharian sampai pusing, sekarang waktu saya jauh lebih bermakna dan teratur.',
        author: 'REHAN, AMIKOM',
    },
    {
        quote: 'Priorin membantu saya belajar Python sambil tetap punya waktu buat marathon series tanpa rasa bersalah.',
        author: 'SARAH, ITB',
    },
    {
        quote: 'Sangat adaptif! Kalau saya lagi malas, jadwalnya berubah sendiri jadi lebih santai. Pas banget buat jiwa mager.',
        author: 'RIAN, UGM',
    },
];

const faqs = [
    {
        question: 'Apakah berbayar?',
        answer: 'Kami menawarkan versi gratis yang fungsional. Untuk fitur sinkronisasi lanjutan dan analisis AI yang lebih mendalam, tersedia paket Priorin Pro.',
        open: true,
    },
    {
        question: 'Bagaimana AI bekerja?',
        answer: 'Priorin menggunakan pemrosesan bahasa alami (NLP) untuk memahami chat Anda dan algoritma penjadwalan berbasis prioritas yang mempertimbangkan aspek kesehatan mental.',
        open: false,
    },
    {
        question: 'Bisa sinkron ke Google Calendar?',
        answer: 'Tentu saja! Semua rencana yang dibuat di Priorin dapat langsung disinkronkan secara real-time ke Google Calendar maupun Apple Calendar.',
        open: true,
    },
];

const border = 'border-2 border-[#191c1d]';
const shadow = 'shadow-[4px_4px_0_0_#000]';
const hoverShadow =
    'transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#000]';
const label =
    "font-['JetBrains_Mono'] text-xs leading-none font-semibold tracking-[0.1em] uppercase";
const headline =
    "font-['Archivo_Narrow'] text-4xl leading-[1.1] font-bold tracking-[-0.02em] uppercase md:text-5xl";

export default function LandingPage() {
    const [activeLink, setActiveLink] = useState(navigation[0].id);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    useEffect(() => {
        const sections = navigation
            .map(({ id }) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        const updateNavigation = () => {
            setHasScrolled(window.scrollY > 24);

            const currentSection = sections.reduce((activeSection, section) => {
                return section.getBoundingClientRect().top <= 120
                    ? section
                    : activeSection;
            }, sections[0]);

            if (currentSection) {
                setActiveLink(currentSection.id);
            }
        };

        updateNavigation();
        window.addEventListener('scroll', updateNavigation, { passive: true });

        return () => window.removeEventListener('scroll', updateNavigation);
    }, []);

    return (
        <>
            <Head title="Priorin - Minimalist Brutalist Redesign">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;700;800&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="landing-page bg-[#f8f9fa] font-['Inter'] text-[#191c1d] selection:bg-[#0021e4] selection:text-white dark:bg-[#0b1020] dark:text-[#f0f1f2]">
                <header
                    className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all duration-500 md:px-8 ${
                        hasScrolled
                            ? 'border-b-2 border-[#191c1d] bg-[#f8f9fa] dark:border-[#2e3132] dark:bg-[#0b1020]'
                            : 'border-b-2 border-transparent bg-transparent'
                    }`}
                >
                    <a
                        href="#top"
                        aria-label="Priorin"
                        className={`shrink-0 transition-all duration-500 ${
                            hasScrolled
                                ? 'translate-x-0 opacity-100'
                                : 'pointer-events-none -translate-x-4 opacity-0 max-md:pointer-events-auto max-md:translate-x-0 max-md:opacity-100'
                        }`}
                    >
                        <img
                            src="/images/logo%20navbar.png"
                            alt="Priorin"
                            className="h-8 w-auto"
                        />
                    </a>

                    <nav
                        className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 border border-[#c5c5da] bg-[#f8f9fa]/90 p-1 shadow-sm backdrop-blur transition-all duration-500 md:flex ${
                            hasScrolled
                                ? 'backdrop-blur-0 rounded-none border-transparent bg-transparent shadow-none'
                                : 'rounded-full'
                        }`}
                    >
                        {navigation.map(({ id, label: itemLabel }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={`${label} rounded-full px-3 py-3 transition-colors duration-200 lg:px-6 ${
                                    activeLink === id
                                        ? hasScrolled
                                            ? 'border-b-2 border-[#0021e4] text-[#0021e4]'
                                            : 'bg-[#191c1d] text-white'
                                        : hasScrolled
                                          ? 'border-b-2 border-transparent text-[#444557] hover:text-[#0021e4]'
                                          : 'text-[#444557] hover:bg-[#edeeef] hover:text-[#191c1d]'
                                }`}
                                onClick={() => setActiveLink(id)}
                            >
                                {itemLabel}
                            </a>
                        ))}
                    </nav>

                    <nav
                        aria-label="Navigasi mobile"
                        className={`absolute top-full right-4 left-4 flex flex-col border-2 border-[#191c1d] bg-[#f8f9fa] p-2 shadow-[4px_4px_0_0_#000] transition-all duration-300 md:hidden dark:border-[#657093] dark:bg-[#151b2d] dark:shadow-[4px_4px_0_0_#0021e4] ${
                            isMenuOpen
                                ? 'visible translate-y-0 opacity-100'
                                : 'invisible -translate-y-2 opacity-0'
                        }`}
                    >
                        {navigation.map(({ id, label: itemLabel }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={`${label} border-b border-[#c5c5da] px-4 py-4 text-left last:border-b-0 dark:border-[#444557] ${
                                    activeLink === id
                                        ? 'bg-[#0021e4] text-white'
                                        : 'text-[#444557] dark:text-[#aeb6cc]'
                                }`}
                                onClick={() => {
                                    setActiveLink(id);
                                    setIsMenuOpen(false);
                                }}
                            >
                                {itemLabel}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            type="button"
                            aria-label={
                                isDark
                                    ? 'Aktifkan mode terang'
                                    : 'Aktifkan mode gelap'
                            }
                            aria-pressed={isDark}
                            onClick={() =>
                                updateAppearance(isDark ? 'light' : 'dark')
                            }
                            className="flex size-11 items-center justify-center rounded-full border border-[#c5c5da] bg-[#f8f9fa]/90 text-[#0021e4] backdrop-blur transition-all hover:border-[#0021e4] hover:bg-[#dfe0ff] dark:border-[#444557] dark:bg-[#191c1d]/90 dark:text-[#bdc2ff] dark:hover:border-[#bdc2ff] dark:hover:bg-[#2e3132]"
                        >
                            <span className="material-symbols-outlined">
                                {isDark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                        <button
                            type="button"
                            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className="flex size-11 items-center justify-center border-2 border-[#191c1d] bg-[#f8f9fa] shadow-[4px_4px_0_0_#000] md:hidden dark:border-[#657093] dark:bg-[#151b2d] dark:text-white dark:shadow-[4px_4px_0_0_#0021e4]"
                        >
                            <span className="material-symbols-outlined">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                        <a
                            href="#cta"
                            className={`${label} hidden bg-[#0021e4] px-4 py-3 text-white shadow-[4px_4px_0_0_#000] transition-all duration-500 active:translate-x-1 active:translate-y-1 active:shadow-none md:block md:px-6 ${
                                hasScrolled
                                    ? 'translate-x-0 opacity-100'
                                    : 'pointer-events-none translate-x-4 opacity-0'
                            }`}
                        >
                            Buat Rencana
                        </a>
                    </div>
                </header>

                <main
                    id="top"
                    className="relative pt-[66px] [&>section]:relative [&>section]:z-10"
                >
                    <CursorGrid
                        cellSize={40}
                        color={isDark ? '#bdc2ff' : '#0021e4'}
                        radius={140}
                        falloff="smooth"
                        holdTime={400}
                        fadeDuration={800}
                        lineWidth={1.2}
                        maxOpacity={isDark ? 0.75 : 0.45}
                        fillOpacity={0}
                        gridOpacity={isDark ? 0.14 : 0.1}
                        cellRadius={0}
                        clickPulse
                        pulseSpeed={600}
                        className="pointer-events-none fixed inset-x-0 top-[116px] bottom-0 z-0 md:top-[66px]"
                    />
                    <section className="relative flex min-h-[819px] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:px-8">
                        <div className="landing-float pointer-events-none absolute top-32 left-[6%] hidden w-52 border-2 border-[#191c1d] bg-white p-4 text-left shadow-[6px_6px_0_0_#000] [--float-duration:6.5s] [--float-rotate:-6deg] [--float-tilt:2deg] lg:block dark:border-[#657093] dark:bg-[#151b2d] dark:shadow-[6px_6px_0_0_#0021e4]">
                            <div className="mb-3 flex items-center justify-between font-['JetBrains_Mono'] text-[10px] tracking-widest text-[#444557] uppercase dark:text-[#aeb6cc]">
                                <span>Battery Level</span>
                                <span className="text-[#0021e4]">82%</span>
                            </div>
                            <div className="mb-3 h-4 border-2 border-[#191c1d] p-0.5 dark:border-[#657093]">
                                <div className="h-full w-[82%] bg-[#0021e4]" />
                            </div>
                            <p className="font-['JetBrains_Mono'] text-[10px] text-[#444557] uppercase dark:text-[#aeb6cc]">
                                Energy: ready to focus
                            </p>
                        </div>
                        <div className="landing-float landing-float-delay-1 pointer-events-none absolute top-44 right-[7%] hidden w-56 border-2 border-[#191c1d] bg-[#e1e3e4] p-4 text-left shadow-[6px_6px_0_0_#000] [--float-duration:7.2s] [--float-rotate:6deg] [--float-tilt:-2deg] lg:block dark:border-[#657093] dark:bg-[#20283d] dark:shadow-[6px_6px_0_0_#0021e4]">
                            <div className="mb-3 flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] font-bold tracking-widest uppercase">
                                <span className="material-symbols-outlined text-base text-[#0021e4]">
                                    auto_awesome
                                </span>
                                AI PRIORIN
                            </div>
                            <p className="font-['Archivo_Narrow'] text-xl font-bold uppercase">
                                Your day, balanced.
                            </p>
                            <div className="mt-4 flex gap-1">
                                <span className="h-2 w-10 bg-[#0021e4]" />
                                <span className="h-2 w-6 bg-[#bdc2ff]" />
                                <span className="h-2 w-14 bg-[#191c1d] dark:bg-[#aeb6cc]" />
                            </div>
                        </div>
                        <div className="landing-float landing-float-delay-2 pointer-events-none absolute bottom-28 left-[11%] hidden w-48 border-2 border-[#191c1d] bg-[#0021e4] p-4 text-left text-white shadow-[6px_6px_0_0_#000] [--float-duration:5.8s] [--float-rotate:3deg] [--float-tilt:-1deg] lg:block">
                            <p className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase opacity-80">
                                Today&apos;s plan
                            </p>
                            <p className="mt-2 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                Rest / Learn / Explore
                            </p>
                        </div>
                        <div className="landing-float landing-float-delay-3 pointer-events-none absolute right-[11%] bottom-32 hidden w-44 border-2 border-[#191c1d] bg-white p-4 text-left shadow-[6px_6px_0_0_#000] [--float-duration:6.8s] [--float-rotate:-3deg] [--float-tilt:2deg] lg:block dark:border-[#657093] dark:bg-[#151b2d] dark:shadow-[6px_6px_0_0_#0021e4]">
                            <div className="mb-3 grid grid-cols-7 gap-1 font-['JetBrains_Mono'] text-[9px] text-[#444557] dark:text-[#aeb6cc]">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
                                    (day, index) => (
                                        <span key={`${day}-${index}`}>
                                            {day}
                                        </span>
                                    ),
                                )}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {[...Array(14)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`h-4 ${index === 8 ? 'bg-[#0021e4]' : index % 3 === 0 ? 'bg-[#bdc2ff]' : 'bg-[#e1e3e4] dark:bg-[#2e3132]'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="relative z-10 max-w-4xl">
                            <h1 className="mb-6 font-['Archivo_Narrow'] text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl md:text-7xl">
                                Tingkatkan Kualitas
                                <br />
                                <span className="text-[#0021e4] italic">
                                    Masa Liburan
                                </span>{' '}
                                Anda
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-lg leading-[1.6] text-[#444557]">
                                AI yang memahami ritme akademik Anda untuk
                                menyusun rencana kegiatan yang seimbang antara
                                pengembangan diri, istirahat, dan eksplorasi.
                            </p>
                            <div className="flex flex-col justify-center gap-6 sm:flex-row">
                                <a
                                    href="#cta"
                                    className={`${border} ${hoverShadow} ${label} w-full bg-[#0021e4] px-8 py-5 text-center text-base text-white shadow-[4px_4px_0_0_#000] sm:w-auto`}
                                >
                                    Mulai Gratis Sekarang
                                </a>
                                <a
                                    href="#langkah"
                                    className={`${border} ${hoverShadow} ${label} flex w-full items-center justify-center gap-2 bg-white px-8 py-5 text-base text-[#191c1d] shadow-[4px_4px_0_0_#000] sm:w-auto dark:border-[#657093] dark:bg-[#151b2d] dark:text-white dark:shadow-[4px_4px_0_0_#0021e4]`}
                                >
                                    <span className="material-symbols-outlined">
                                        play_circle
                                    </span>
                                    Lihat Demo
                                </a>
                            </div>
                        </div>
                    </section>

                    <section
                        id="cara-kerja"
                        className="scroll-mt-20 bg-[#f8f9fa] px-4 py-20 md:px-8"
                    >
                        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
                            <h2 className={`${headline} max-w-md`}>
                                Mengapa Liburan Mahasiswa Sering Terasa{' '}
                                <span className="underline">Sia-sia</span>?
                            </h2>
                            <p className="max-w-sm leading-6 text-[#444557]">
                                Banyak mahasiswa terjebak dalam siklus yang
                                tidak produktif karena kurangnya perencanaan
                                yang adaptif.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {problems.map((problem) => (
                                <article
                                    key={problem.title}
                                    className={`${border} ${shadow} bg-white p-8`}
                                >
                                    <span className="material-symbols-outlined mb-6 text-4xl text-[#0021e4]">
                                        {problem.icon}
                                    </span>
                                    <h3 className="mb-4 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                        {problem.title}
                                    </h3>
                                    <p className="leading-6 text-[#444557]">
                                        {problem.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section
                        id="langkah"
                        className="scroll-mt-20 px-4 py-20 md:px-8"
                    >
                        <h2 className={`${headline} mb-16 text-center`}>
                            3 Langkah Menuju Liburan Bermakna
                        </h2>
                        <div className="mx-auto flex max-w-5xl flex-col gap-12">
                            {steps.map((step, index) => (
                                <article
                                    key={step.number}
                                    className={`flex flex-col items-center gap-12 ${
                                        index === 1
                                            ? 'md:flex-row-reverse'
                                            : 'md:flex-row'
                                    }`}
                                >
                                    <div className="w-full md:w-1/2">
                                        <div className="mb-[-32px] ml-0 font-['Archivo_Narrow'] text-7xl font-extrabold text-[#0021e4] opacity-20 sm:mb-[-40px] sm:ml-[-20px] sm:text-8xl">
                                            {step.number}
                                        </div>
                                        <h3 className="mb-4 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                            {step.title}
                                        </h3>
                                        <p className="text-lg leading-[1.6] text-[#444557]">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div
                                        className={`${border} aspect-video w-full overflow-hidden bg-[#edeeef] md:w-1/2`}
                                    >
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section
                        id="fitur"
                        className="scroll-mt-20 bg-[#f3f4f5] px-4 py-20 md:px-8"
                    >
                        <h2 className={`${headline} mb-16`}>Fitur Unggulan</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                            <article
                                className={`${border} ${hoverShadow} bg-white p-8 md:col-span-7`}
                            >
                                <div className="mb-8 flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="mb-2 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                            Alokasi Waktu Cerdas
                                        </h3>
                                        <p className="max-w-md leading-6 text-[#444557]">
                                            AI kami tidak hanya membagi waktu,
                                            tapi menghitung &apos;Battery
                                            Level&apos; Anda. Jika energi
                                            rendah, Priorin akan memprioritaskan
                                            kegiatan restoratif secara otomatis.
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-[#0021e4]">
                                        bolt
                                    </span>
                                </div>
                                <div className="flex h-32 items-end gap-2 border-t-2 border-[#191c1d] bg-[#edeeef] p-4">
                                    {[
                                        'h-4/6',
                                        'h-5/6',
                                        'h-full',
                                        'h-3/6',
                                        'h-1/6',
                                    ].map((height, index) => (
                                        <div
                                            key={height}
                                            className={`w-full ${height} ${
                                                index === 2
                                                    ? 'bg-[#bdc2ff]'
                                                    : index === 4
                                                      ? 'bg-[#191c1d]'
                                                      : 'bg-[#0021e4]'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </article>

                            <article
                                className={`${border} ${hoverShadow} bg-[#191c1d] p-8 text-white md:col-span-5`}
                            >
                                <h3 className="mb-4 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                    Chat Interaktif
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <div className="max-w-[80%] self-start rounded-r-lg border-l-4 border-[#0021e4] bg-[#e1e3e4] p-3 text-[#191c1d]">
                                        <p className={`${label} mb-1`}>
                                            AI PRIORIN
                                        </p>
                                        <p className="text-sm">
                                            &quot;Sepertinya kamu belajar
                                            terlalu lama. Mau aku geser kursusmu
                                            ke besok dan ganti dengan istirahat
                                            30 menit?&quot;
                                        </p>
                                    </div>
                                    <div className="max-w-[80%] self-end rounded-l-lg bg-[#0021e4] p-3">
                                        <p className={`${label} mb-1`}>YOU</p>
                                        <p className="text-sm">
                                            &quot;Ya, tolong. Saya butuh
                                            kopi.&quot;
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article
                                className={`${border} ${hoverShadow} bg-white p-8 md:col-span-4`}
                            >
                                <h3 className="mb-6 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                    Kurasi Kegiatan
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        [
                                            'school',
                                            'Online Course Recommendation',
                                        ],
                                        ['museum', 'Museum & Gallery Visits'],
                                        [
                                            'fitness_center',
                                            'Mindfulness & Yoga',
                                        ],
                                    ].map(([icon, text]) => (
                                        <li
                                            key={icon}
                                            className="flex items-center gap-3 border-b border-[#edeeef] pb-2"
                                        >
                                            <span className="material-symbols-outlined text-[#0021e4]">
                                                {icon}
                                            </span>
                                            <span className={label}>
                                                {text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article
                                className={`${border} ${hoverShadow} relative overflow-hidden bg-[#0021e4] p-8 text-white md:col-span-8`}
                            >
                                <div className="relative z-10">
                                    <h3 className="mb-4 font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                                        Visualisasi Progres
                                    </h3>
                                    <p className="max-w-sm leading-6 opacity-90">
                                        Pantau keseimbangan hidup Anda secara
                                        real-time. Dashboard kami menampilkan
                                        grafik harmoni antara produktivitas dan
                                        kesejahteraan mental.
                                    </p>
                                </div>
                                <span className="material-symbols-outlined absolute right-[-20px] bottom-[-20px] text-[200px] opacity-20">
                                    analytics
                                </span>
                            </article>
                        </div>
                    </section>

                    <section
                        id="testimoni"
                        className="scroll-mt-20 px-4 py-20 md:px-8"
                    >
                        <div className="mb-16 flex flex-col items-center text-center">
                            <span className={`${label} mb-2 text-[#0021e4]`}>
                                COMMUNITY VOICE
                            </span>
                            <h2 className={headline}>Apa Kata Mahasiswa?</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <article
                                    key={testimonial.author}
                                    className={`${border} bg-white p-8 italic`}
                                >
                                    <p className="mb-6 text-lg leading-[1.6]">
                                        &quot;{testimonial.quote}&quot;
                                    </p>
                                    <div
                                        className={`${label} font-bold not-italic`}
                                    >
                                        — {testimonial.author}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section
                        id="faq"
                        className="scroll-mt-20 border-t-2 border-[#191c1d] px-4 py-20 md:px-8"
                    >
                        <div className="mx-auto max-w-3xl">
                            <h2 className={`${headline} mb-12 text-center`}>
                                Pertanyaan Umum
                            </h2>
                            <div className="space-y-6">
                                {faqs.map((faq) => (
                                    <details
                                        key={faq.question}
                                        className={`${border} group cursor-pointer bg-white p-6 transition-all hover:bg-[#f3f4f5]`}
                                        open={faq.open}
                                    >
                                        <summary className="flex list-none items-center justify-between gap-4 font-['Archivo_Narrow'] text-lg font-bold uppercase md:text-2xl">
                                            {faq.question}
                                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                                                expand_more
                                            </span>
                                        </summary>
                                        <p className="mt-4 leading-6 text-[#444557]">
                                            {faq.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="cta"
                        className="scroll-mt-20 px-4 py-20 md:px-8"
                    >
                        <div
                            className={`${border} ${shadow} relative overflow-hidden bg-[#0021e4] p-8 text-center text-white sm:p-12 md:p-24`}
                        >
                            <h2 className="mb-8 font-['Archivo_Narrow'] text-4xl leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-5xl md:text-7xl">
                                Siap Mengubah
                                <br />
                                Liburan Anda?
                            </h2>
                            <p className="mx-auto mb-12 max-w-xl text-lg leading-[1.6] opacity-90">
                                Bergabunglah dengan ribuan mahasiswa lainnya
                                yang sudah mulai mengelola waktu mereka dengan
                                lebih cerdas bersama Priorin AI.
                            </p>
                            <button
                                type="button"
                                className={`${label} border-2 border-white bg-white px-8 py-6 text-base font-bold text-[#0021e4] transition-all hover:bg-transparent hover:text-white md:px-12`}
                            >
                                Buat Akun Sekarang
                            </button>
                            <div className={`${label} mt-8 opacity-60`}>
                                Tidak perlu kartu kredit untuk memulai.
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="relative z-50 grid w-full grid-cols-1 gap-6 border-t-2 border-[#191c1d] bg-[#f8f9fa] px-4 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-4">
                    <div className="space-y-6">
                        <div className="font-['Archivo_Narrow'] text-2xl font-bold uppercase">
                            Priorin
                        </div>
                        <p className="leading-6 text-[#444557]">
                            © 2024 Priorin AI. Built for the ambitious student.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className={`${label} font-bold`}>Navigasi</h4>
                        <nav className="flex flex-col gap-2 text-[#444557]">
                            <a
                                className="transition-colors hover:text-[#0021e4]"
                                href="#cara-kerja"
                            >
                                Tentang
                            </a>
                            <a
                                className="transition-colors hover:text-[#0021e4]"
                                href="#fitur"
                            >
                                Karir
                            </a>
                            <a
                                className="transition-colors hover:text-[#0021e4]"
                                href="#faq"
                            >
                                Kontak
                            </a>
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h4 className={`${label} font-bold`}>Hukum</h4>
                        <nav className="flex flex-col gap-2 text-[#444557]">
                            <a
                                className="transition-colors hover:text-[#0021e4]"
                                href="#faq"
                            >
                                Privasi
                            </a>
                            <a
                                className="transition-colors hover:text-[#0021e4]"
                                href="#faq"
                            >
                                Syarat & Ketentuan
                            </a>
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h4 className={`${label} font-bold`}>Sosial</h4>
                        <div className="flex gap-4">
                            {['alternate_email', 'public'].map((icon) => (
                                <a
                                    key={icon}
                                    href="#top"
                                    aria-label={
                                        icon === 'alternate_email'
                                            ? 'Email'
                                            : 'Website'
                                    }
                                    className="flex h-10 w-10 items-center justify-center border-2 border-[#191c1d] transition-all hover:border-[#0021e4] hover:bg-[#0021e4] hover:text-white"
                                >
                                    <span className="material-symbols-outlined">
                                        {icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
