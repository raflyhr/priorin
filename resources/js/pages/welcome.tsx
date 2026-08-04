import { Head } from '@inertiajs/react';
export default function Welcome() {
    return (
        <>
         {/* navbar */}
            <Head title="priorin"/>
            <div>
                <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b-2 
                border-black bg-[#f8f9fa] px-8 py-4">
                    <div className="text-2xl font-bold uppercase tracking-tighter text-[#191c1d]">Priorin</div>
                    <nav className="hidden items-center gap-8 md:flex">
                        <a className="border-b-2 border-[#0021e4] font-mono text-xs font-bold tracking-widest text-[#0021e4] uppercase" href="#cara-kerja">Cara Kerja</a>
                        <a className="font-mono text-xs font-bold tracking-widest text-[#444557] uppercase" href="#fitur">Fitur</a>
                        <a className="font-mono text-xs font-bold tracking-widest text-[#444557] uppercase" href="#testimoni">Testimoni</a>
                        <a className="font-mono text-xs font-bold tracking-widest text-[#444557] uppercase" href="#faq">FAQ</a>
                    </nav>
                    <button type="button" 
                    className="bg-[#0021e4] px-6 py-3 font-mono text-xs font-bold tracking-widest text-white uppercase shadow-[4px_4px_0_0_#000]">
                        Buat Rencana
                    </button>
                </header>
            </div>
        </>
    );
}