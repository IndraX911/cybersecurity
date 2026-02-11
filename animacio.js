window.addEventListener('load', () => {
    const loader = document.getElementById('hacker-loader');
    const terminal = document.getElementById('terminal-content');
    const overlay = document.getElementById('start-overlay');
    const startMessage = document.getElementById('start-message');
    const progressBar = document.getElementById('progress-bar-fill');

    const typeSound = new Audio('typing3.mp3'); 
    typeSound.volume = 0.2; 
    typeSound.playbackRate = 2.0; 

    // Session ellenőrzés
    if (sessionStorage.getItem('introPlayed')) {
        if (loader) loader.style.display = 'none';
        if (overlay) overlay.remove(); 
        return; 
    }

    // --- TÖLTŐCSIK LOGIKA ---
    let progress = 0;
    let isFinished = false; // Flag, hogy tudjuk, mikor végeztünk

    const interval = setInterval(() => {
        // Véletlenszerű sebesség, hogy élethűbb legyen
        progress += Math.random() * 3.5; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            isFinished = true;
            
            // Ha kész, megjelenik a felirat
            if (startMessage) {
                startMessage.style.opacity = "1";
                startMessage.style.display = "block";
            }
        }
        
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }, 80);

    // --- GÉPELÉSI ÜZENETEK (A te specifikációiddal) ---
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
            if (charIndex === 0) {
                terminal.innerHTML += "<br>> ";
            }
            terminal.innerHTML += messages[lineIndex].charAt(charIndex);
            loader.scrollTop = loader.scrollHeight;
            
            if (charIndex % 3 === 0) { 
                const soundClone = typeSound.cloneNode(); 
                soundClone.volume = 0.15;
                soundClone.play().catch(e => {});
            }

            charIndex++;
            if (charIndex < messages[lineIndex].length) {
                setTimeout(typeChar, 15); 
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeChar, 150); 
            }
        } else {
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                loader.classList.add('loader-fade-out');
                setTimeout(() => loader.style.display = 'none', 900);
            }, 1500);
        }
    }

    // --- ENTER FIGYELŐ (Csak ha a csík kész!) ---
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && isFinished && overlay) {
            overlay.remove(); 
            typeChar();
        }
    });
});
