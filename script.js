function unlockGift() {
    const overlay = document.getElementById('intro-overlay');
    const main = document.getElementById('main-content');
    const music = document.getElementById('bgMusic');

    overlay.classList.add('hidden');
    main.classList.remove('hidden');

    // Attempt to play music
    music.volume = 0.3;
    music.play().catch(err => {
        console.log("Music play blocked by browser. User needs to interact first.");
    });

    createHearts();
}

function createHearts() {
    const container = document.getElementById('hearts');
    const emojis = ['❤️', '💖', '💍', '✨', '🌸'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

function openGift() {
    const giftWrapper = document.querySelector('.gift-box-wrapper');
    const revealed = document.getElementById('revealed-gift');
    const hint = document.getElementById('gift-hint');

    // Add wiggle effect
    giftWrapper.classList.add('wiggling');

    setTimeout(() => {
        giftWrapper.classList.remove('wiggling');
        giftWrapper.style.transform = 'translateY(-20px) scale(0.1)';
        giftWrapper.style.opacity = '0';

        setTimeout(() => {
            giftWrapper.classList.add('hidden');
            revealed.classList.remove('hidden');
            hint.innerText = "Forever and Always ❤️";
            confetti();
        }, 500);
    }, 1500);
}

function confetti() {
    const container = document.body;
    for (let i = 0; i < 100; i++) {
        const c = document.createElement('div');
        c.style.position = 'fixed';
        c.style.zIndex = '1000';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-20px';
        c.style.width = '10px';
        c.style.height = '10px';
        c.style.backgroundColor = ['#d4af37', '#ffffff', '#ff69b4', '#ffd700'][Math.floor(Math.random() * 4)];
        c.style.borderRadius = '50%';
        c.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }
}

// Add CSS for confetti fall dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    to { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(style);

function exportCert() {
    const certificate = document.getElementById('certificate');
    const button = document.querySelector('.btn-secondary');

    // Feedback to user
    button.innerText = "Generating Image... ⏳";
    button.disabled = true;

    // Use html2canvas to capture the element
    html2canvas(certificate, {
        scale: 2, // High quality
        backgroundColor: "#fffcf0",
        useCORS: true,
        logging: false
    }).then(canvas => {
        // Create a link to download
        const link = document.createElement('a');
        link.download = 'Our_Marriage_Certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Reset button
        button.innerText = "Download Certificate 📸";
        button.disabled = false;
    }).catch(err => {
        console.error("Capture failed:", err);
        button.innerText = "Error! Try Printing instead.";
        button.disabled = false;
        // Fallback to print if image capture fails
        window.print();
    });
}
