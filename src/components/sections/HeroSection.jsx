import React from 'react';
import { Music, Gamepad2, Car, Code } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useWindowSize } from '../../hooks/useWindowSize';
import ProfilePicture from '../../assets/ProfilePicture.jpeg';
import ScrollIndicator from '../ui/ScrollIndicator';

export default function HeroSection({ mousePos }) {
    const scrollY = useScrollPosition();
    const windowSize = useWindowSize();

    const parallaxOffset = scrollY * 0.3;
    const rotateY = ((mousePos.x - windowSize.width / 2) / windowSize.width) * 10;
    const rotateX = ((mousePos.y - windowSize.height / 2) / windowSize.height) * -10;

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
            <div
                className="w-full max-w-2xl relative"
                style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    perspective: '1000px'
                }}
            >
                <div
                    className="backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-3xl p-8 md:p-12 border border-purple-500/30 shadow-2xl transition-transform duration-200 ease-out"
                    style={{
                        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                        boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.3), 0 0 100px rgba(139, 92, 246, 0.1)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="mb-6 relative">
                            <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 relative flex items-center justify-center">
                                <img
                                    src={ProfilePicture}
                                    alt="Asuna"
                                    className="w-full h-full object-cover object-[50%_45%] block"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-transparent animate-pulse pointer-events-none"></div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-3 glow-text text-center">
                            Asuna Cracotte™
                        </h1>

                        <p className="text-base md:text-xl text-purple-300 mb-6 text-center">
                            Singer • Gamer • IT Worker
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 backdrop-blur text-sm">
                                <Music className="w-4 h-4 text-purple-400" />
                                <span>Music</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 backdrop-blur text-sm">
                                <Gamepad2 className="w-4 h-4 text-purple-400" />
                                <span>Gaming</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 backdrop-blur text-sm">
                                <Car className="w-4 h-4 text-purple-400" />
                                <span>Vehicles</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 backdrop-blur text-sm">
                                <Code className="w-4 h-4 text-purple-400" />
                                <span>IT</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <a
                                href="#about"
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all hover:scale-105 inline-block animate-glow">
                                Get in Touch
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>)
}