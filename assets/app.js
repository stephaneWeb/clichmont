import './styles/app.scss';

const addMediaQueryChangeListener = (mediaQuery, handler) => {
    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handler);
        return;
    }

    if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handler);
    }
};

const supportsIntersectionObserver = () => 'IntersectionObserver' in window;

const initNavToggle = () => {
    const toggle = document.querySelector('[data-nav-toggle]');
    const collapse = document.querySelector('[data-nav-collapse]');

    if (!toggle || !collapse) {
        return;
    }

    const desktopMedia = window.matchMedia('(min-width: 992px)');

    const setExpanded = (expanded) => {
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        collapse.classList.toggle('show', expanded);
    };

    const closeNav = () => {
        if (desktopMedia.matches) {
            return;
        }

        setExpanded(false);
    };

    setExpanded(false);

    toggle.addEventListener('click', () => {
        if (desktopMedia.matches) {
            return;
        }

        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        setExpanded(!expanded);
    });

    collapse.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    addMediaQueryChangeListener(desktopMedia, (event) => {
        setExpanded(!event.matches && toggle.getAttribute('aria-expanded') === 'true');

        if (event.matches) {
            collapse.classList.remove('show');
        }
    });
};

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
            intro.classList.add('is-visible');
        }

        cards.forEach((card, index) => {
            window.setTimeout(() => {
                card.classList.add('is-visible');
            }, 120 + index * 90);
        });

    };

    if (section.matches('[data-scroll-gate]')) {
        section.addEventListener('sectiongate:activate', revealCards, { once: true });

        if (section.classList.contains('is-active')) {
            revealCards();
        }

        return;
    }

    if (!supportsIntersectionObserver()) {
        revealCards();
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
        threshold: 0.18,
        rootMargin: '0px 0px -4% 0px'
    });

    observer.observe(section);

    if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
        revealCards();
        observer.disconnect();
    }
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

    if (!supportsIntersectionObserver()) {
        revealPhotos();
        return;
    }

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

    if (!supportsIntersectionObserver()) {
        activate();
        return;
    }

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

    if (!supportsIntersectionObserver()) {
        gates.forEach((gate) => {
            activateGate(gate);
        });
        return;
    }

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

initNavToggle();
initPlatformReveal();
initInfrastructureReveal();
initLocationsPreviewReveal();
initSectionScrollGates();
