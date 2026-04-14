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
    const guestName = document.getElementById('adult-name').value;
    bird.innerHTML = `
        <div class="bird-container">
            <div class="guest-name-badge">${guestName}</div>
            <img src="magic_bird.png" class="bird-image" alt="Pássaro Mágico">
        </div>
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

    // 2. Close modal and launch bird
    setTimeout(async () => {
        // Close the modal
        rsvpModal.classList.remove('visible');
        
        // Short delay for the modal to fade before bird appears
        setTimeout(async () => {
            const bird = await createBird();
            document.body.appendChild(bird);
            
            // Re-hide the modal for future use and reset form
            setTimeout(() => {
                rsvpModal.classList.add('hidden');
                submitBtn.classList.remove('btn-magic-glow');
                formInner.classList.remove('hidden');
                secondChild.classList.add('hidden');
                addChildBtn.classList.remove('hidden');
                rsvpForm.reset();
                bird.remove();
            }, 4000); // Wait for the bird to finish its flight path
        }, 300);
    }, 600);

    console.log('Magical Submission Started for:', guestName);
});
