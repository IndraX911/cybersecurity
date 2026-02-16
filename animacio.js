window.addEventListener('load', () => {
    const loader = document.getElementById('hacker-loader');
    const terminal = document.getElementById('terminal-content');
    const overlay = document.getElementById('start-overlay');
    const startMessage = document.getElementById('start-message');
    const progressBar = document.getElementById('progress-bar-fill');

    // --- 0. ELLENŐRZÉS: LEFUTOTT-E MÁR? ---
    if (sessionStorage.getItem('introPlayed')) {
        if (overlay) overlay.style.display = 'none';
        if (loader) loader.style.display = 'none';
        document.body.classList.remove('loading-mode');
        return; 
    }

    // Hangkezelés
    const typeSound = new Audio('typing3.mp3'); 
    typeSound.volume = 0.2;

    let progress = 0;
    let isFinished = false;

    // --- 1. TÖLTÉS FOLYAMATA ---
    const interval = setInterval(() => {
        progress += Math.random() * 2.5; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            isFinished = true;
            
            if (startMessage) {
                // Szöveg beállítása
                startMessage.innerHTML = "RENDSZER KÉSZEN ÁLL. NYOMJ ENTER-T A BRUTE FORCE INDÍTÁSÁHOZ!";
                
                // Neon osztály hozzáadása (CSS-ben legyen benne a lüktetés!)
                startMessage.classList.add('ready-blink');
                
                // Fade-in effekt az üzenetnek
                startMessage.style.opacity = "0";
                setTimeout(() => {
                    startMessage.style.transition = "opacity 0.8s ease-in";
                    startMessage.style.opacity = "1";
                }, 100);
            }
        }
        
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }, 60);

    // --- 2. TELJES ÜZENETLISTA ---
    const messages = [
        "CYBERSECURITY Kernel v4.1.0-release [LTS]",
        "Rendszer-indítási idő: " + new Date().toLocaleString('hu-HU'),
        "Hálózati azonosító: 192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
        " ",
        "BIOS ELLENŐRZÉSE: American Megatrends v.2026... OK",
        "CPU: AMD Ryzen 9 2025-X @ 5.4GHz [16 Cores]... OK",
        "GPU: NVIDIA RTX 4090 - 24GB VRAM - CUDA magok inicializálása... OK",
        "MEMÓRIA: 32768MB ECC DDR5 @ 6400MHz... OK",
        "Lokalizált alrendszerek inicializálása (HU_hu)... Kész.",
        "Belső fájlrendszer csatolása: /dev/sda1... SIKERES.",
        " ",
        "C:\\Users\\ADMIN-PC> start security_audit.sh --force --verbose",
        "--------------------------------------------------",
        "MEM_SCAN: 0x0045FF12 elemzése... Rejtett folyamat azonosítva.",
        "ANTI-VIRUS: Alvó módba kényszerítve (ID: 4412).",
        "NET_MAP: Helyi hálózati csomópontok feltérképezése...",
        "IP_RANGE: [192.168.0.1/24] vizsgált IP-k száma: 254",
        "NODE_01: Aktív [Tűzfal észlelve: Cisco ASA]",
        " ",
        "NODE_01: brute_force_v4 indítása a 22-es porton...",
        "BRUTE_FORCE: Szótár alapú támadás... [12%... 38%... 67%... 100%]",
        "NODE_01: auth_module_v2 megkerülése... SIKERES.",
        "NODE_01: HOZZÁFÉRÉS MEGADVA. Token: 4f82-a912-bc03",
        " ",
        "TŰZFAL_ÁLLAPOT: ÁTSZAKÍTVA / KOMPROMITÁLVA.",
        "TITKOSÍTÁS: AES-256 kézfogás létrejött. Kulcs: SHA-512",
        "CSOMAG_SZIFFROZÓ: 'Man-in-the-Middle' pozíció felvéve...",
        "TRAFFIC: HTTP/HTTPS adatfolyam rögzítése folyamatban...",
        "SEBZHETŐSÉG: 80-as, 443-as, 8080-as port nyitva.",
        "INJEKTÁLÁS: SQL_Injection kód küldése az adatbázisnak...",
        "DB_STATUS: Adatbázis válaszolt. Táblák listázása...",
        " ",
        "ROOT_HOZZÁFÉRÉS: 'ADMIN_ROOT' jogosultság megszerezve.",
        "NYOMOK ELTÜNTETÉSE: Logfájlok törlése a szerverről... OK.",
        "ÁLLAPOT: Rendszer teljes ellenőrzés alatt.",
        "--------------------------------------------------",
        "Betöltés befejezése: CyberSecurity Interfész v2026",
        "TERMINÁL INDÍTÁSA..."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    // --- 3. GÉPELÉS FUNKCIÓ ---
    function typeChar() {
        if (lineIndex < messages.length) {
            if (charIndex === 0) terminal.innerHTML += "<br>> ";
            
            terminal.innerHTML += messages[lineIndex].charAt(charIndex);
            loader.scrollTop = loader.scrollHeight;

            if (charIndex % 3 === 0) {
                typeSound.cloneNode().play().catch(() => {});
            }

            charIndex++;
            if (charIndex < messages[lineIndex].length) {
                setTimeout(typeChar, Math.random() * 3 + 1);
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeChar, 40); 
            }
        } else {
            // BEFEJEZÉS ÉS MENTÉS
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                loader.classList.add('loader-fade-out');
                document.body.classList.remove('loading-mode');
                setTimeout(() => loader.style.display = 'none', 900);
            }, 2000);
        }
    }

    // --- 4. INDÍTÁS ESEMÉNYEK ---
    function startFinal() {
        function startMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Elmosódás effekt
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Mátrix-zöld szín
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 33);
}

// A startFinal függvényedben hívd meg:
function startFinal() {
    function startMatrix() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];
    
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    
        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Elmosódás effekt
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            ctx.fillStyle = "#0F0"; // Mátrix-zöld szín
            ctx.font = fontSize + "px monospace";
    
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(draw, 33);
    }
    
    // A startFinal függvényedben hívd meg:
    function startFinal() {
        if (isFinished) {
            if (overlay) overlay.style.display = 'none';
            if (loader) {
                loader.style.display = 'block';
                startMatrix(); // <--- ITT INDÍTJUK EL!
                typeChar();
            }
        }
    }
    if (isFinished) {
        if (overlay) overlay.style.display = 'none';
        if (loader) {
            loader.style.display = 'block';
            startMatrix(); // <--- ITT INDÍTJUK EL!
            typeChar();
        }
    }
}
        if (isFinished) {
            if (overlay) overlay.style.display = 'none';
            if (loader) {
                loader.style.display = 'block';
                typeChar();
            }
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startFinal();
    });
    
    if (overlay) overlay.addEventListener('click', startFinal);
});



