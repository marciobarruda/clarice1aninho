// Bird Delivery Logic
const rsvpTrigger = document.getElementById('rsvp-trigger');
const rsvpModal = document.getElementById('rsvp-modal');
const closeModal = document.querySelector('.close-modal');
const magicOverlay = document.getElementById('magic-overlay');
const rsvpForm = document.getElementById('rsvp-form');
const formInner = document.getElementById('form-inner');

// Create Bird Sprite Element
function createBird() {
    const bird = document.createElement('div');
    bird.id = 'magic-bird';
    bird.innerHTML = `
        <svg viewBox="0 0 100 80" class="bird-svg">
            <!-- Wings -->
            <path class="wing" d="M30 30 Q10 10 5 40" fill="#4dabf7" stroke="#000" stroke-width="0.5"/>
            <!-- Body -->
            <path d="M70 45 Q90 45 95 35 Q90 20 70 25 Q50 30 50 45 Q50 60 70 45" fill="#339af0" stroke="#000" stroke-width="0.5"/>
            <!-- Head -->
            <circle cx="75" cy="35" r="10" fill="#339af0" stroke="#000" stroke-width="0.5"/>
            <circle cx="80" cy="33" r="2" fill="black"/> <!-- Eye -->
            <!-- Beak -->
            <path d="M85 35 L95 38 L85 41 Z" fill="#fab005"/>
            <!-- Envelope -->
            <rect x="85" y="38" width="15" height="10" rx="1" fill="white" stroke="#333" stroke-width="0.5"/>
            <path d="M85 38 L92.5 43 L100 38" fill="none" stroke="#ccc" stroke-width="0.5"/>
        </svg>
    `;
    return bird;
}

// Magic Chirp Sound (Synthesized with Web Audio API for 100% reliability)
function playChirp() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Characteristic magical "chirp" sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // Shift to A6

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) { console.log('Audio not supported'); }
}

// Sparkles Effect
function createSparkles(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 200;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        sparkle.style.setProperty('--dx', `${dx}px`);
        sparkle.style.setProperty('--dy', `${dy}px`);
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        magicOverlay.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Show Modal
rsvpTrigger.addEventListener('click', () => {
    rsvpModal.classList.remove('hidden');
    setTimeout(() => rsvpModal.classList.add('visible'), 50);
});

// Hide Modal
closeModal.addEventListener('click', () => {
    rsvpModal.classList.remove('visible');
    setTimeout(() => rsvpModal.classList.add('hidden'), 500);
});

// Create a Closed Scroll SVG element
function createClosedScroll() {
    const closedScroll = document.createElement('div');
    closedScroll.id = 'closed-scroll';
    closedScroll.innerHTML = `
        <svg viewBox="0 0 200 120" class="closed-scroll-svg">
            <defs>
                <filter id="scroll-glow">
                    <feGaussianBlur stdDeviation="3" result="glow"/>
                    <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            <!-- Scroll Body -->
            <rect x="40" y="30" width="120" height="60" fill="#fdf2d9" stroke="#d4af37" stroke-width="2" rx="10"/>
            <path d="M40 30 Q30 30 30 45 Q30 60 40 60 L160 60 Q170 60 170 45 Q170 30 160 30 Z" fill="#fff9c4"/>
            <!-- Wax Seal -->
            <circle cx="100" cy="60" r="18" fill="#b01e17" filter="url(#scroll-glow)"/>
            <path d="M92 55 Q100 45 108 55 Q100 75 92 55" fill="#d4af37" opacity="0.6"/>
            <!-- Sparkles -->
            <circle cx="50" cy="40" r="2" fill="#ffd700"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" /></circle>
            <circle cx="150" cy="80" r="2" fill="#ffd700"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></circle>
        </svg>
        <p class="magic-success-msg">Mensagem Enviada!</p>
    `;
    return closedScroll;
}

// Bird Delivery Animation Sequence
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Sparkles from the button
    const btnRect = e.target.querySelector('.submit-btn').getBoundingClientRect();
    createSparkles(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 40);

    // 2. Roll up the parchment
    setTimeout(() => {
        // Replace form with closed scroll
        formInner.classList.add('hidden');
        const closedScroll = createClosedScroll();
        rsvpModal.querySelector('.modal-content').appendChild(closedScroll);

        // 3. After roll-up completes, the bird takes it away
        setTimeout(() => {
            const bird = createBird();
            document.body.appendChild(bird);
            playChirp();

            // Add vanishing effect to the scroll
            closedScroll.classList.add('vanish-away');

            // 4. Close the modal and cleanup
            setTimeout(() => {
                rsvpModal.classList.remove('visible');
                setTimeout(() => {
                    rsvpModal.classList.add('hidden');
                    // Reset everything
                    bird.remove();
                    closedScroll.remove();
                    formInner.classList.remove('hidden');
                    rsvpForm.reset();
                }, 500);
            }, 2000);
        }, 1200); // Wait for roll-up animation
    }, 400);

    console.log('Magical Submission Started for:', document.getElementById('adult-name').value);
});
