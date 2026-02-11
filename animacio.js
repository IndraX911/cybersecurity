document.body.classList.add('loading-mode');

window.addEventListener('load', () => {
    // Kicsit várunk, hogy a DOM biztosan kész legyen
    setTimeout(() => {
        const progressBar = document.querySelector('#progress-bar-fill');
        const startMessage = document.getElementById('start-message');
        const overlay = document.getElementById('start-overlay');
        const loader = document.getElementById('hacker-loader');
        const terminal = document.getElementById('terminal-content');

        if (progressBar) {
            progressBar.style.width = "1%"; // Kényszerített indítás
            console.log("Progress bar megtalálva, indítás..."); 
        }

        let progress = 0;
        let isFinished = false;

        const interval = setInterval(() => {
            progress += Math.random() * 2;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                isFinished = true;
                if (startMessage) {
                    startMessage.innerHTML = "RENDSZER KÉSZEN ÁLL. NYOMJ ENTER-T A BRUTE FORCE INDÍTÁSÁHOZ!";
                    startMessage.classList.add('ready-blink');
                }
            }
            
            if (progressBar) {
                // Itt kényszerítjük a stílust
                progressBar.setAttribute('style', `width: ${progress}% !important`);
            }
        }, 50);
        
        // ... a többi kódod (messages, typeChar, stb.) jöhet utána
    }, 100); 
});
    let progress = 0;
    let isFinished = false;

    // Töltés indítása - JAVÍTOTT LOGIKA
    const interval = setInterval(() => {
        progress += Math.random() * 2; // Kicsit lassabb, stabilabb töltés
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            isFinished = true;
            
            if (startMessage) {
                startMessage.innerHTML = "RENDSZER KÉSZEN ÁLL. NYOMJ ENTER-T A BRUTE FORCE INDÍTÁSÁHOZ!";
                startMessage.classList.add('ready-blink'); // Aktiválja a neon hátteret
            }
        }
        
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }, 50);

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

            if (charIndex % 3 === 0) {
                const s = typeSound.cloneNode();
                s.volume = 0.1;
                s.play().catch(() => {});
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
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                loader.classList.add('loader-fade-out');
                document.body.classList.remove('loading-mode'); // Itt hozzuk vissza az oldalt
                setTimeout(() => loader.style.display = 'none', 900);
            }, 1000);
        }
    }

    // Billentyűzet és Kattintás figyelése az ENTER-hez
    function startTerminal() {
        if (isFinished && overlay) {
            overlay.remove();
            typeChar();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startTerminal();
    });

    if (overlay) {
        overlay.addEventListener('click', startTerminal);
    }
});

