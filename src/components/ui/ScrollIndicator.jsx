// Composant ScrollIndicator — affiche un indicateur de scroll, pop à l'apparition puis rebonds en boucle

import React, { useEffect, useState, useRef } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function ScrollIndicator({ delay = 800, noiseThreshold = 2, topThreshold = 5 }) {
    // position Y du scroll via hook personnalisé
    const scrollY = useScrollPosition();

    // états : visibilité, animation d'apparition, animation de rebond en boucle
    const [visible, setVisible] = useState(false);
    const [playPop, setPlayPop] = useState(false);
    const [playHeartbeat, setPlayHeartbeat] = useState(false);

    // refs : précédentes positions, timers et indicateurs d'activité
    const prevY = useRef(0); // position précédente pour calculer le delta
    const userScrolled = useRef(false); // a scrolled avant le délai initial
    const initialDelayPassed = useRef(false); // délai initial passé
    const timerRef = useRef(null); // timer du délai initial
    const popTimerRef = useRef(null); // timer pour stopper l'animation pop

    // refs pour détection d'inactivité
    const idleTimerRef = useRef(null); // timer pour relancer heartbeat
    const lastScrollAt = useRef(0); // timestamp du dernier scroll

    // constantes de timing (ms)
    const POP_DURATION = 600; // durée de .animate-pop
    const IDLE_DELAY = 1200; // délai d'inactivité avant heartbeat

    // délai initial avant d'afficher l'indicateur
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            initialDelayPassed.current = true;
            if (!userScrolled.current) setVisible(true);
        }, delay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (popTimerRef.current) clearTimeout(popTimerRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [delay]);

    // logique déclenchée par la position de scroll (détecte up/down et bruit)
    useEffect(() => {
        const delta = scrollY - prevY.current;

        // avant la fin du délai initial, on note si l'utilisateur a scrollé
        if (!initialDelayPassed.current) {
            if (scrollY > topThreshold) userScrolled.current = true;
            prevY.current = scrollY;
            return;
        }

        // après le délai : afficher si en haut, cacher si scroll down, montrer si scroll up
        if (scrollY < topThreshold) {
            setVisible(true);
        } else if (Math.abs(delta) < noiseThreshold) {
            // bruit : ne rien faire
        } else if (delta > 0) {
            setVisible(false); // scroll vers le bas
        } else if (delta < 0) {
            setVisible(true); // scroll vers le haut
        }

        // si mouvement, marquer l'activité et arrêter le heartbeat temporairement
        if (Math.abs(delta) > 0) {
            lastScrollAt.current = Date.now();
            setPlayHeartbeat(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                if (visible && Date.now() - lastScrollAt.current >= IDLE_DELAY) setPlayHeartbeat(true);
            }, IDLE_DELAY);
        }

        prevY.current = scrollY;
    }, [scrollY, noiseThreshold, topThreshold, visible]);

    // gestion de l'entrée/sortie de l'indicateur (pop + démarrage du heartbeat si inactif)
    useEffect(() => {
        if (visible) {
            setPlayPop(true); // jouer l'animation d'apparition
            if (popTimerRef.current) clearTimeout(popTimerRef.current);
            popTimerRef.current = setTimeout(() => setPlayPop(false), POP_DURATION);

            // démarrer le heartbeat si inactif depuis IDLE_DELAY
            const sinceLast = Date.now() - lastScrollAt.current;
            if (sinceLast >= IDLE_DELAY) setPlayHeartbeat(true);
            else {
                if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
                idleTimerRef.current = setTimeout(() => { if (visible) setPlayHeartbeat(true); }, IDLE_DELAY - sinceLast);
            }
        } else {
            // cacher -> arrêter toutes les animations et timers associés
            setPlayHeartbeat(false);
            setPlayPop(false);
            if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
        }
    }, [visible]);

    // rendu : conteneur bas-centre + classes conditionnelles pour animations
    return (
        <div
            aria-hidden={!visible}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
            <div className={`w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2 ${playPop ? 'animate-pop' : ''} ${playHeartbeat ? 'animate-bounce' : ''}`}>
                <div className="w-1 h-2 bg-purple-400 rounded-full"></div> {/* curseur intérieur */}
            </div>
        </div>
    );
}