document.addEventListener('DOMContentLoaded', function() {
    // Contact modal functionality
    const contactButton = document.getElementById('contact-button');
    const contactModal = document.getElementById('contact-modal');
    const closeModal = contactModal.querySelector('.close');

    contactButton.addEventListener('click', function() {
        contactModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        contactModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });

    // Typewriter effect for bio
    const text = "[Enter your a brief description of yourself here]";
    let index = 0;

    // Create a cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    document.getElementById("bio-text").appendChild(cursor);

    function typeWriter() {
        if (index < text.length) {
            // Insert the character before the cursor
            cursor.insertAdjacentText('beforebegin', text.charAt(index));
            index++;
            setTimeout(typeWriter, 50);
        } else {
            // Start blinking cursor after typing is done
            startBlinkingCursor();
        }
    }

    function startBlinkingCursor() {
        setInterval(() => {
            cursor.style.visibility = (cursor.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500); // Blink every 500ms
    }

    typeWriter();

    // Matrix rain effect
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    const fontSize = 14;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    let columns, drops;

    function initializeMatrix() {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(0);
    }

    function resizeCanvas() {
        const oldColumns = columns;
        const oldDrops = [...drops];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(0);

        // Maintain relative positions of existing drops
        const ratio = columns / oldColumns;
        for (let i = 0; i < oldDrops.length; i++) {
            const newIndex = Math.floor(i * ratio);
            if (newIndex < drops.length) {
                drops[newIndex] = oldDrops[i] * (canvas.height / oldDrops[i]);
            }
        }
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.font = fontSize + 'px JetBrains Mono';

        for (let i = 0; i < columns; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        }
    }

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= interval) {
            draw();
            lastTime = currentTime - (deltaTime % interval);
        }
        requestAnimationFrame(animate);
    }

    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeMatrix();

    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(animate);

    const glitch = document.querySelector('.glitch');
    const glitchEffects = document.querySelectorAll('.glitch-effect');
    const originalText = glitch.textContent;

    function glitchText() {
        const glitchDuration = 50 + Math.random() * 100;
        const glitchInterval = 3000 + Math.random() * 2000;

        glitchEffects.forEach((effect, index) => {
            const glitchedText = originalText.split('').map(char => {
                return Math.random() < 0.1 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
            }).join('');

            effect.textContent = glitchedText;
            effect.style.left = `${(index - 1) * 2}px`;
            effect.style.color = index === 0 ? 'rgba(255,0,0,0.7)' : 'rgba(0,255,255,0.7)';
            effect.style.clip = `rect(${Math.random() * 25}px, 9999px, ${Math.random() * 25 + 25}px, 0)`;
        });

        setTimeout(() => {
            glitchEffects.forEach(effect => {
                effect.textContent = '';
                effect.style.clip = 'auto';
            });
        }, glitchDuration);

        setTimeout(glitchText, glitchInterval);
    }

    glitchText();
});