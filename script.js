// Bird Delivery Logic
const rsvpTrigger = document.getElementById('rsvp-trigger');
const rsvpModal = document.getElementById('rsvp-modal');
const closeModal = document.querySelector('.close-modal');
const magicOverlay = document.getElementById('magic-overlay');
const rsvpForm = document.getElementById('rsvp-form');
const formInner = document.getElementById('form-inner');

// Create Bird Sprite Element
// Create Ultra-High Fidelity Pixar/Disney Bird (v5 - Masterpiece)
function createBird() {
    const bird = document.createElement('div');
    bird.id = 'magic-bird';
    const guestName = document.getElementById('adult-name').value;
    bird.innerHTML = `
        <svg viewBox="0 0 160 160" class="bird-svg">
            <defs>
                <linearGradient id="birdBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#339af0" />
                    <stop offset="100%" style="stop-color:#1971c2" />
                </linearGradient>
                <linearGradient id="birdWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#fff" />
                    <stop offset="100%" style="stop-color:#e7f5ff" />
                </linearGradient>
            </defs>
            <!-- Tail -->
            <path d="M40 90 L10 110 Q5 90 20 80 Z" fill="#1864ab" />
            <path d="M40 95 L15 120 Q10 100 25 90 Z" fill="#1971c2" />
            
            <!-- Feet -->
            <path d="M75 120 L72 135 M75 120 L78 135" stroke="#fd7e14" stroke-width="2.5" stroke-linecap="round" />
            <path d="M95 120 L92 135 M95 120 L98 135" stroke="#fd7e14" stroke-width="2.5" stroke-linecap="round" />

            <!-- Body -->
            <path d="M45 80 Q45 120 85 120 Q125 120 125 80 Q125 50 85 40 Q45 50 45 80" fill="url(#birdBlue)" />
            
            <!-- Tummy/Breast (White) -->
            <path d="M60 85 Q85 110 110 85 Q110 70 85 70 Q60 70 60 85" fill="url(#birdWhite)" />

            <!-- Wings -->
            <path class="wing-back" d="M60 60 Q20 20 10 70" fill="#1864ab" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="-45 60 60" dur="0.25s" repeatCount="indefinite" />
            </path>
            <path class="wing" d="M100 65 Q140 30 150 80 L140 90 Q120 80 100 65" fill="#4dabf7" stroke="#1864ab" stroke-width="1">
                <animateTransform attributeName="transform" type="rotate" from="0 100 65" to="15 100 65" dur="0.3s" repeatCount="indefinite" alternate="true" />
            </path>

            <!-- Head -->
            <g transform="translate(85, 45)">
                <circle cx="0" cy="0" r="28" fill="url(#birdBlue)" />
                <!-- Crest -->
                <path d="M-10 -25 Q0 -40 10 -25" fill="#1c7ed6" />
                <!-- Eyes -->
                <circle cx="-10" cy="-5" r="8" fill="white" />
                <circle cx="-8" cy="-5" r="4" fill="black" />
                <circle cx="-6" cy="-7" r="1.5" fill="white" />
                <circle cx="10" cy="-5" r="8" fill="white" />
                <circle cx="12" cy="-5" r="4" fill="black" />
                <circle cx="14" cy="-7" r="1.5" fill="white" />
                <!-- Beak -->
                <path d="M0 5 L-5 20 L5 20 Z" fill="#fab005" stroke="#e67e22" stroke-width="0.5" />
            </g>

            <!-- Personal Envelope (Carried in Beak) -->
            <g transform="translate(85, 65) rotate(10)">
                <rect x="-30" y="0" width="60" height="40" rx="3" fill="#fff" stroke="#d4af37" stroke-width="2"/>
                <path d="M-30 0 L0 20 L30 0" fill="none" stroke="#eee" stroke-width="1.5"/>
                <text x="0" y="30" font-family="'Quicksand', sans-serif" font-size="10" font-weight="bold" fill="#B01E17" text-anchor="middle" textLength="50" lengthAdjust="spacingAndGlyphs">${guestName}</text>
                <circle cx="0" cy="20" r="5" fill="#B01E17" />
            </g>
        </svg>
    `;
    return bird;
}

// Magic Chirp Sound (Synthesized with Web Audio API for 100% reliability)
// Magical Twinkle Sound (Improved sequence)
function playMagicSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6 (A Major Arpeggio)
        
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + i * 0.1 + 0.1);
            
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
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
    // Magic feedback
    const rect = rsvpTrigger.getBoundingClientRect();
    createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    playMagicSound();
    
    rsvpModal.classList.remove('hidden');
    setTimeout(() => rsvpModal.classList.add('visible'), 50);
});

// Hide Modal
closeModal.addEventListener('click', () => {
    rsvpModal.classList.remove('visible');
    setTimeout(() => rsvpModal.classList.add('hidden'), 500);
});

// Create a Closed Scroll SVG element
// Create a Closed Scroll SVG element with Personalization
function createClosedScroll(guestName, childrenText) {
    const closedScroll = document.createElement('div');
    closedScroll.id = 'closed-scroll';
    closedScroll.innerHTML = `
        <svg viewBox="0 0 200 130" class="closed-scroll-svg">
            <defs>
                <filter id="scroll-glow">
                    <feGaussianBlur stdDeviation="3" result="glow"/>
                    <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            <!-- Scroll Body -->
            <rect x="30" y="20" width="140" height="80" fill="#fdf2d9" stroke="#d4af37" stroke-width="2" rx="10"/>
            <path d="M30 20 Q20 20 20 35 Q20 50 30 50 L170 50 Q180 50 180 35 Q180 20 170 20 Z" fill="#fff9c4"/>
            <!-- Content -->
            <text x="100" y="55" font-family="'Dancing Script', cursive" font-size="16" font-weight="bold" fill="#B01E17" text-anchor="middle">${guestName}</text>
            <text x="100" y="75" font-family="'Quicksand', sans-serif" font-size="8" fill="#4E342E" text-anchor="middle">${childrenText}</text>
            <!-- Wax Seal -->
            <circle cx="100" cy="95" r="16" fill="#b01e17" filter="url(#scroll-glow)"/>
            <path d="M92 92 Q100 85 108 92 Q100 110 92 92" fill="#d4af37" opacity="0.6"/>
            <!-- Sparkles -->
            <circle cx="50" cy="40" r="2" fill="#ffd700"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" /></circle>
            <circle cx="150" cy="80" r="2" fill="#ffd700"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></circle>
        </svg>
        <p class="magic-success-msg">Presença Confirmada! ✨</p>
    `;
    return closedScroll;
}

// Add Child Logic
const addChildBtn = document.getElementById('add-child-btn');
const secondChild = document.getElementById('second-child');

addChildBtn.addEventListener('click', () => {
    secondChild.classList.remove('hidden');
    addChildBtn.classList.add('hidden');
});

// Bird Delivery Animation Sequence
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('adult-name').value;
    
    // Gather children data
    const c1Name = document.querySelector('.child-name').value;
    const c1Age = document.querySelector('.child-age').value;
    const c2Name = document.querySelector('.child-name-2').value;
    const c2Age = document.querySelector('.child-age-2').value;

    let childrenText = "";
    if (c1Name) childrenText += `${c1Name} (${c1Age} ${c1Age == 1 ? 'ano' : 'anos'})`;
    if (c2Name) childrenText += ` e ${c2Name} (${c2Age} ${c2Age == 1 ? 'ano' : 'anos'})`;
    if (childrenText) childrenText = "Crianças: " + childrenText;

    // 1. Sparkles from the button + Sound
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnRect = submitBtn.getBoundingClientRect();
    createSparkles(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 40);
    playMagicSound();
    
    // Add temporary glow effect
    submitBtn.classList.add('btn-magic-glow');

    // 2. Roll up the parchment
    setTimeout(() => {
        // Replace form with closed scroll
        formInner.classList.add('hidden');
        const closedScroll = createClosedScroll(guestName, childrenText);
        rsvpModal.querySelector('.modal-content').appendChild(closedScroll);

        // 3. After roll-up completes, the bird takes it away
        setTimeout(() => {
            const bird = createBird();
            document.body.appendChild(bird);
            
            // Add vanishing effect to the scroll
            closedScroll.classList.add('vanish-away');

            // 4. Close the modal and cleanup
            setTimeout(() => {
                rsvpModal.classList.remove('visible');
                submitBtn.classList.remove('btn-magic-glow');
                setTimeout(() => {
                    rsvpModal.classList.add('hidden');
                    // Reset everything
                    bird.remove();
                    closedScroll.remove();
                    formInner.classList.remove('hidden');
                    secondChild.classList.add('hidden');
                    addChildBtn.classList.remove('hidden');
                    rsvpForm.reset();
                }, 500);
            }, 2000);
        }, 1200); // Wait for roll-up animation
    }, 400);

    console.log('Magical Submission Started for:', guestName);
});
