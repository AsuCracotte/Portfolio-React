import React from 'react';
import { Github, GlobeIcon, Mail } from 'lucide-react';
import DiscordIcon from "../ui/DiscordIcon.jsx";

export default function ContactSection() {
    return (
        <section id="contact" className="relative py-20 px-4 md:px-6 mb-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 glow-text">
                    Want to contact me?
                </h2>

                <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12">
                    Feel free to reach out to me through my social media or email.
                    I'm always open to new opportunities and collaborations!
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center">

                    {/* Email */}
                    <a href="mailto:asuna@cracotte.dev" className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5"/>
                        Email Me
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/AsuCracotte" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-slate-800 hover:bg-slate-700 rounded-full font-semibold hover:scale-105 transition-transform border border-purple-500/30">
                        <Github className="w-5 h-5"/>
                        GitHub
                    </a>

                    {/* APLOSN */}
                    <a href="https://aplosn.fr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-slate-800 hover:bg-slate-700 rounded-full font-semibold hover:scale-105 transition-transform border border-purple-500/30">
                        <GlobeIcon className="w-5 h-5"/>
                        APLOSN
                    </a>

                    {/* Discord */}
                    <a href="https://discord.gg/Hxv2FEgtJp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-slate-800 hover:bg-slate-700 rounded-full font-semibold hover:scale-105 transition-transform border border-purple-500/30">
                        <DiscordIcon className="w-5 h-5"/>
                        Discord
                    </a>
                </div>
            </div>
        </section>
    );
}