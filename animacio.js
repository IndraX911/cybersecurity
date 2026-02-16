window.addEventListener('load', () => {
    console.log("Script elindult...");

    const loader = document.getElementById('hacker-loader');
    const terminal = document.getElementById('terminal-content');
    const overlay = document.getElementById('start-overlay');
    const startMessage = document.getElementById('start-message');
    const progressBar = document.getElementById('progress-bar-fill');

    // --- 0. TESZT ÜZEMMÓD: Ha nem indulna, töröld ki a sessionStorage-t ---
    // sessionStorage.removeItem('introPlayed'); // Eddig menjen a // ha tesztelsz

    if (sessionStorage.getItem('introPlayed')) {
        console.log("Az intro már lefutott korábban. Kihagyás...");
        if (overlay) overlay.style.display = 'none';
        if (loader) loader.style.display = 'none';
        document.body.classList.remove('loading-mode');
        return; 
    }

    // Hangkezelés hibaellenőrzéssel
    let typeSound;
    try {
        typeSound = new Audio('typing3.mp3'); 
        typeSound.volume = 0.2;
    } catch (e) {
        console.warn("Hangfájl nem található, néma üzemmód.");
    }

    let progress = 0;
    let isFinished = false;

    // --- 1. MÁTRIX ESŐ FUNKCIÓ ---
    function startMatrix() {
        console.log("Mátrix eső indítása...");
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) {
            console.error("Hiba: Nincs matrix-canvas a HTML-ben!");
            return;
        }
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~Ωπµ®©";
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const randomColor = Math.random();
                ctx.fillStyle = "#00ff00"; 

                if (randomColor > 0.975) {
                    ctx.fillStyle = "#ffffff"; 
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "#ffffff";
                } else if (randomColor > 0.995) {
                    ctx.fillStyle = "#ff0033"; 
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = "#ff0033";
                } else {
                    ctx.shadowBlur = 0; 
                }

                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                ctx.shadowBlur = 0;

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(draw, 35);
    }

    // --- 2. TÖLTÉS FOLYAMATA ---
    console.log("Töltés elindítva...");
    const interval = setInterval(() => {
        progress += Math.random() * 2.5; 
        
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            isFinished = true;
            console.log("Töltés kész, várakozás az Enterre.");
            
            if (startMessage) {
                startMessage.innerHTML = "RENDSZER KÉSZEN ÁLL. NYOMJ ENTER-T A BRUTE FORCE INDÍTÁSÁHOZ!";
                startMessage.classList.add('ready-blink');
                startMessage.style.opacity = "1";
            }
        }
    }, 60);

    // --- 3. ÜZENETEK ---
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

    function typeChar() {
        if (lineIndex < messages.length) {
            if (charIndex === 0) terminal.innerHTML += "<br>> ";
            terminal.innerHTML += messages[lineIndex].charAt(charIndex);
            loader.scrollTop = loader.scrollHeight;

            if (typeSound && charIndex % 3 === 0) {
                typeSound.cloneNode().play().catch(() => {});
            }

            charIndex++;
            if (charIndex < messages[lineIndex].length) {
                setTimeout(typeChar, 5); 
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeChar, 30); 
            }
        } else {
            console.log("Gépelés vége, belépés a főoldalra...");
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                loader.classList.add('loader-fade-out');
                document.body.classList.remove('loading-mode');
                setTimeout(() => loader.style.display = 'none', 900);
            }, 2000);
        }
    }

    // --- 5. INDÍTÁS ---
    function startFinal() {
        if (isFinished) {
            console.log("Enter megnyomva, váltás a terminálra.");
            if (overlay) overlay.style.display = 'none';
            if (loader) {
                loader.style.display = 'block';
                setTimeout(() => {
                    startMatrix(); 
                    typeChar();
                }, 50);
            }
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startFinal();
    });
    
    if (overlay) overlay.addEventListener('click', startFinal);
});
