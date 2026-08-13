import './styles/app.scss';
import 'bootstrap';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createScrollLocker = () => {
    const body = document.body;
    const scrollKeys = new Set([
        'ArrowDown',
        'ArrowUp',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        'Space'
    ]);
    let locked = false;
    let lockedScrollY = 0;

    const preventDefault = (event) => {
        event.preventDefault();
    };

    const preventKeyboardScroll = (event) => {
        if (!scrollKeys.has(event.code)) {
            return;
        }

        event.preventDefault();
    };

    return {
        isLocked: () => locked,
        lock: () => {
            if (locked) {
                return;
            }

            locked = true;
            lockedScrollY = window.scrollY;
            body.classList.add('scroll-locked');
            body.style.top = `-${lockedScrollY}px`;
            document.addEventListener('wheel', preventDefault, { passive: false });
            document.addEventListener('touchmove', preventDefault, { passive: false });
            document.addEventListener('keydown', preventKeyboardScroll, { passive: false });
        },
        unlock: () => {
            if (!locked) {
                return;
            }

            locked = false;
            body.classList.remove('scroll-locked');
            body.style.top = '';
            document.removeEventListener('wheel', preventDefault);
            document.removeEventListener('touchmove', preventDefault);
            document.removeEventListener('keydown', preventKeyboardScroll);
            window.scrollTo(0, lockedScrollY);
        }
    };
};

const initHeroSequence = () => {
    const root = document.querySelector('[data-hero-sequence]');

    if (!root) {
        return;
    }

    const slices = [...root.querySelectorAll('[data-hero-slice]')];
    const leftWord = root.querySelector('[data-hero-word="left"]');
    const rightWord = root.querySelector('[data-hero-word="right"]');
    const bottomCopy = root.querySelector('[data-hero-bottom]');
    const sliceSpreadScale = 0.5;

    const easeInOutCubic = (value) => {
        if (value < 0.5) {
            return 4 * value * value * value;
        }

        return 1 - Math.pow(-2 * value + 2, 3) / 2;
    };

    const phaseProgress = (value, start, end) => clamp((value - start) / (end - start), 0, 1);

    const render = (progress) => {
        const splitPhase = easeInOutCubic(phaseProgress(progress, 0.08, 0.58));
        const textFadePhase = easeInOutCubic(phaseProgress(progress, 0.26, 0.68));
        const bottomPhase = easeInOutCubic(phaseProgress(progress, 0.62, 0.9));

        root.style.setProperty('--hero-progress', progress.toFixed(4));

        slices.forEach((slice) => {
            const spread = Number.parseFloat(slice.dataset.spread || '0');
            const x = spread * sliceSpreadScale * splitPhase;
            const rotate = spread * sliceSpreadScale * splitPhase * 0.04;

            slice.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotate}deg)`;
        });

        if (leftWord) {
            const x = 8 - splitPhase * 210;
            const y = 14 - splitPhase * 62;
            const opacity = 0.8 - textFadePhase * 0.75;
            leftWord.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            leftWord.style.opacity = `${clamp(opacity, 0, 0.8)}`;
        }

        if (rightWord) {
            const x = -20 + splitPhase * 230;
            const y = -10 + splitPhase * 78;
            const opacity = 0.76 - textFadePhase * 0.71;
            rightWord.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            rightWord.style.opacity = `${clamp(opacity, 0, 0.76)}`;
        }

        if (bottomCopy) {
            const y = 84 - bottomPhase * 84;
            bottomCopy.style.transform = `translate3d(0, ${y}px, 0)`;
            bottomCopy.style.opacity = `${bottomPhase}`;
        }
    };

    const cycleMs = 4200;
    let startTime = null;

    const step = (timestamp) => {
        if (startTime === null) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const loop = clamp(elapsed / cycleMs, 0, 1);
        let progress;

        if (loop < 0.035) {
            progress = 0;
        } else if (loop < 0.56) {
            progress = (loop - 0.035) / 0.525 * 0.68;
        } else if (loop < 0.74) {
            progress = 0.68 + (loop - 0.56) / 0.18 * 0.32;
        } else {
            progress = 1;
        }

        render(clamp(progress, 0, 1));

        if (elapsed < cycleMs) {
            window.requestAnimationFrame(step);
            return;
        }

        render(1);
    };

    window.requestAnimationFrame(step);
};

const initPlatformReveal = () => {
    const section = document.querySelector('[data-platform-reveal]');
    const cards = [...document.querySelectorAll('[data-reveal-card]')];
    const intro = document.querySelector('[data-platform-intro]');
    const cta = document.querySelector('[data-platform-cta]');

    if (!section || (cards.length === 0 && !intro && !cta)) {
        return;
    }

    let hasPlayed = false;

    const revealCards = () => {
        if (hasPlayed) {
            return;
        }

        hasPlayed = true;

        if (cta) {
            cta.classList.add('is-visible');
        }

        if (intro) {
            window.setTimeout(() => {
                intro.classList.add('is-visible');
            }, 340);
        }

        cards.forEach((card, index) => {
            window.setTimeout(() => {
                card.classList.add('is-visible');
            }, 860 + index * 320);
        });

    };

    if (section.matches('[data-scroll-gate]')) {
        section.addEventListener('sectiongate:activate', revealCards, { once: true });

        if (section.classList.contains('is-active')) {
            revealCards();
        }

        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            revealCards();
            observer.disconnect();
        });
    }, {
        threshold: 0.35,
        rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(section);
};

const initLocationsPreviewReveal = () => {
    const section = document.querySelector('#locations');
    const photos = [...document.querySelectorAll('[data-location-photo]')];

    if (!section || photos.length === 0) {
        return;
    }

    let hasPlayed = false;

    const revealPhotos = () => {
        if (hasPlayed) {
            return;
        }

        hasPlayed = true;

        photos.forEach((photo, index) => {
            window.setTimeout(() => {
                photo.classList.add('is-visible');
            }, 280 + index * 220);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            revealPhotos();
            observer.disconnect();
        });
    }, {
        threshold: 0.28,
        rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(section);

    if (window.matchMedia('(max-width: 991.98px)').matches || section.getBoundingClientRect().top < window.innerHeight * 0.92) {
        revealPhotos();
        observer.disconnect();
    }
};

const initInfrastructureReveal = () => {
    const section = document.querySelector('.infrastructure-section');

    if (!section) {
        return;
    }

    const activate = () => {
        section.classList.add('is-active');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            activate();
            observer.disconnect();
        });
    }, {
        threshold: 0.35,
        rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(section);

    if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
        activate();
        observer.disconnect();
    }
};

const initSectionScrollGates = () => {
    const gates = [...document.querySelectorAll('[data-scroll-gate]')];

    if (gates.length === 0) {
        return;
    }

    const locker = createScrollLocker();
    const played = new WeakSet();
    let activeTimer = null;

    const activateGate = (gate) => {
        if (played.has(gate)) {
            return;
        }

        played.add(gate);
        gate.classList.add('is-active');
        gate.dispatchEvent(new CustomEvent('sectiongate:activate'));

        const duration = Number.parseInt(gate.dataset.gateDuration || '0', 10);

        if (duration <= 0) {
            return;
        }

        locker.lock();
        window.clearTimeout(activeTimer);
        activeTimer = window.setTimeout(() => {
            locker.unlock();
        }, duration);
    };

    const observer = new IntersectionObserver((entries) => {
        if (locker.isLocked()) {
            return;
        }

        entries.forEach((entry) => {
            if (!entry.isIntersecting || played.has(entry.target)) {
                return;
            }

            activateGate(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.55,
        rootMargin: '0px 0px -12% 0px'
    });

    gates.forEach((gate) => {
        observer.observe(gate);
    });

    const firstGate = gates[0];

    if (firstGate && firstGate.getBoundingClientRect().top < window.innerHeight * 0.6) {
        activateGate(firstGate);
        observer.unobserve(firstGate);
    }
};

initHeroSequence();
initPlatformReveal();
initInfrastructureReveal();
initLocationsPreviewReveal();
initSectionScrollGates();
