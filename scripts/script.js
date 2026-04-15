// ==========================================
// 1. БАГАТОМОВНІСТЬ (i18n)
// ==========================================
const translations = {
    "en": {
        "nav_logo": "nazar-portfolio",
        "nav_home": "_hello",
        "nav_projects": "_projects",
        "nav_reviews": "_reviews",
        "nav_contact": "_contact-me",
        "greeting": "Hi all. I am",
        "role_subtitle": "> Front-end developer",
        "comment_github": "// find my profile on Github:",
        "comment_status": "// available for freelance:",
        "status_string": "\"Available for work\"",
        "game_start": "start-game()",
        "game_over": "GAME OVER!",
        "game_restart": "start-again()",
        "game_use_keyboard": "// use keyboard",
        "game_arrows": "// arrows to play",
        "game_score": "// score",
        "game_mobile": "// Snake game disabled on mobile",
        "sidebar_projects": "projects",
        "sidebar_feedback": "feedback",
        "sidebar_client_reviews": "Client Reviews",
        "sidebar_add_review": "Add Review",
        "sidebar_contacts": "contacts",
        "tab_all_projects": "_All-Projects",
        "tab_reviews": "_Reviews",
        "tab_contacts": "_contacts",
        "contact_title": "_contact-me",
        "leave_review_title": "Write a log...",
        "btn_submit_review": "submit-review()",
        "placeholder_name": "_name",
        "placeholder_email": "_email",
        "placeholder_feedback": "_feedback",
        "label_name": "_name:",
        "label_email": "_email:",
        "label_message": "_message:",
        "btn_submit_message": "submit-message()",
        "footer_find_me": "find me in:",
        "comment_send_1": " * Send me a message,",
        "comment_send_2": " * I will reply as soon as possible.",
        "comment_waiting": "Waiting for connections...",
        "btn_view_project": "view-project"
    },
    "ua": {
        "nav_logo": "назар-портфоліо",
        "nav_home": "_привіт",
        "nav_projects": "_проєкти",
        "nav_reviews": "_відгуки",
        "nav_contact": "_контакти",
        "greeting": "Привіт всім. Я",
        "role_subtitle": "> Front-end розробник",
        "comment_github": "// профіль на Github:",
        "comment_status": "// статус фрілансу:",
        "status_string": "\"Доступний для роботи\"",
        "game_start": "почати-гру()",
        "game_over": "ГРА ЗАКІНЧЕНА!",
        "game_restart": "почати-знову()",
        "game_use_keyboard": "// клавіатура",
        "game_arrows": "// стрілки для гри",
        "game_score": "// рахунок",
        "game_mobile": "// На мобільних гра вимкнена",
        "sidebar_projects": "проєкти",
        "sidebar_feedback": "відгуки",
        "sidebar_client_reviews": "Відгуки Клієнтів",
        "sidebar_add_review": "Додати Відгук",
        "sidebar_contacts": "контакти",
        "tab_all_projects": "_Усі-Проєкти",
        "tab_reviews": "_Відгуки",
        "tab_contacts": "_контакти",
        "contact_title": "_мої-контакти",
        "leave_review_title": "Написати лог...",
        "btn_submit_review": "надіслати()",
        "placeholder_name": "_ім'я",
        "placeholder_email": "_пошта",
        "placeholder_feedback": "_повідомлення",
        "label_name": "_ім'я:",
        "label_email": "_пошта:",
        "label_message": "_повідомлення:",
        "btn_submit_message": "надіслати()",
        "footer_find_me": "знайдіть мене у:",
        "comment_send_1": " * Напишіть мені,",
        "comment_send_2": " * я відповім якомога швидше.",
        "comment_waiting": "Очікування підключень...",
        "btn_view_project": "переглянути-проєкт"
    }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // ==========================================
    // 2. SPA ROUTER (TAB SWITCHING)
    // ==========================================
    const views = document.querySelectorAll('.view-section');
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            views.forEach(v => v.classList.remove('active'));
            const targetView = document.getElementById(targetId);
            if(targetView) targetView.classList.add('active');
            
            // Close mobile menu on click
            document.querySelector('.header-nav').classList.remove('mobile-active');
            document.querySelector('.header-contact').classList.remove('mobile-active');
        });
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            document.querySelector('.header-nav').classList.toggle('mobile-active');
            document.querySelector('.header-contact').classList.toggle('mobile-active');
        });
    }

    // ==========================================
    // 3. REVIEWS SIDEBAR TOGGLE
    // ==========================================
    const btnShowReviews = document.getElementById('btn-show-reviews');
    const btnShowAdd = document.getElementById('btn-show-add');
    const reviewsList = document.getElementById('reviews-list-view');
    const addReviewPanel = document.getElementById('add-review-panel');

    if(btnShowReviews && btnShowAdd) {
        btnShowReviews.addEventListener('click', () => {
            btnShowReviews.classList.add('active'); 
            btnShowAdd.classList.remove('active');
            reviewsList.style.display = 'block'; 
            addReviewPanel.style.display = 'none';
        });
        btnShowAdd.addEventListener('click', () => {
            btnShowAdd.classList.add('active'); 
            btnShowReviews.classList.remove('active');
            addReviewPanel.style.display = 'block'; 
            reviewsList.style.display = 'none';
        });
    }

    // ==========================================
    // 4. STAR RATING LOGIC
    // ==========================================
    const stars = document.querySelectorAll('.rating-select .star');
    const ratingInput = document.getElementById('rating-value');

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                ratingInput.value = value; 
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= value);
                });
            });
        });
    }

    // ==========================================
    // 5. LOAD REVIEWS FROM BACKEND
    // ==========================================
    async function loadReviews() {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        container.innerHTML = '<p class="comment">// Fetching reviews cluster...</p>';

        try {
            const response = await fetch('https://nazar-portfolio-api.onrender.com/reviews');
            if (!response.ok) throw new Error('Server not responding');
            const reviews = await response.json();
            
            container.innerHTML = '';
            
            if (reviews.length === 0) {
                container.innerHTML = '<p class="comment">// No logs found.</p>';
                return;
            }

            reviews.forEach(r => {
                const cleanName = r.name.replace(/\s+/g, '_');
                const card = `
                    <div class="review-card">
                        <h4>const testimony_${cleanName} = "${r.name}";</h4>
                        <span class="review-stars">${r.rating} ★</span>
                        <p>/* ${r.text} */</p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', card);
            });

        } catch (err) {
            container.innerHTML = '<p style="color: var(--syntax-method);">Error: Cannot establish connection.</p>';
        }
    }
    loadReviews();

    // ==========================================
    // 6. POST REVIEW TO BACKEND
    // ==========================================
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = ratingInput.value;
            const name = document.getElementById('reviewer-name').value;
            const text = document.getElementById('reviewer-text').value;
            const submitBtn = reviewForm.querySelector('.btn-primary');

            if (rating === "0") {
                alert(currentLang === 'ua' ? "Оберіть зірочки!" : "Select stars!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "awaiting...";

            try {
                const response = await fetch('https://nazar-portfolio-api.onrender.com/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, text, rating: Number(rating), createdAt: new Date().getTime() })
                });

                if (response.ok) {
                    reviewForm.reset();
                    ratingInput.value = "0";
                    stars.forEach(s => s.classList.remove('active'));
                    loadReviews();
                    // Switch back to reviews list view
                    if(btnShowReviews) btnShowReviews.click();
                }
            } catch (err) {
                console.error("Error submitting:", err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = currentLang === 'ua' ? translations.ua.btn_submit_review : translations.en.btn_submit_review;
            }
        });
    }

    // ==========================================
    // 7. FETCH PROJECTS (SWR CACHING)
    // ==========================================
    async function fetchProjects() {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        const renderCards = (projectsList) => {
            container.innerHTML = '';
            projectsList.forEach(p => {
                const slugTitle = p.title.replace(/\s+/g, '-').toLowerCase();
                const card = `
                    <div class="project-card">
                        <div class="project-title"><span class="project-title secondary">Project // </span>_${slugTitle}</div>
                        <div class="project-box">
                            <img src="${p.img}" alt="${p.title}" class="project-img" onerror="this.src='images/example-landing.png'">
                            <div class="project-info">
                                <p class="project-desc">${p.desc}</p>
                                <a href="${p.link}" class="view-project-btn" target="_blank" data-i18n="btn_view_project">view-project</a>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', card);
            });
            setLanguage(currentLang);
        };

        const cachedProjects = localStorage.getItem('portfolio_projects');
        if (cachedProjects) {
            renderCards(JSON.parse(cachedProjects));
        } else {
            const fallbackProjects = [
                {
                    title: "Oksana Lash Studio",
                    desc: "An elegant and responsive portfolio website for a lash extension specialist.",
                    img: "images/project-lash.png",
                    link: "#"
                },
                {
                    title: "Digital Event Landing",
                    desc: "A high-conversion landing page for digital events.",
                    img: "images/example-event-page.png",
                    link: "#"
                }
            ];
            renderCards(fallbackProjects);
        }

        try {
            const response = await fetch('https://nazar-portfolio-api.onrender.com/projects');
            if (response.ok) {
                const freshProjects = await response.json();
                if (JSON.stringify(freshProjects) !== cachedProjects) {
                    localStorage.setItem('portfolio_projects', JSON.stringify(freshProjects));
                    renderCards(freshProjects);
                }
            }
        } catch (err) {
            console.log("No backend connection.", err);
        }
    }
    
    // ==========================================
    // 8. SNAKE GAME LOGIC
    // ==========================================
    const canvas = document.getElementById('snake-game');
    if (canvas) {
        // Prepare canvas dims depending on the macOS window layout 
        // game-container is 300, top is 25, so we use 270 (divisible by 10)
        canvas.height = 270; 
        canvas.width = 200;
        
        const ctx = canvas.getContext('2d');
        const gridSize = 10;
        let snake = [];
        let food = {};
        let dx = gridSize;
        let dy = 0;
        let score = 0;
        let gameLoop;
        let isPlaying = false;

        const startBtn = document.getElementById('btn-start-game');
        const restartBtn = document.getElementById('btn-restart-game');
        const overlayStart = document.getElementById('game-overlay');
        const overlayGameOver = document.getElementById('game-over-overlay');
        const scoreDisplay = document.getElementById('game-score');

        function initGame() {
            snake = [
                { x: 100, y: 150 },
                { x: 90, y: 150 },
                { x: 80, y: 150 }
            ];
            dx = gridSize; dy = 0; score = 0;
            scoreDisplay.textContent = score;
            spawnFood();
            isPlaying = true;
            overlayStart.style.display = 'none';
            overlayGameOver.style.display = 'none';
            if(gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, 100);
        }

        function spawnFood() {
            food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        }

        function updateGame() {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score += 10;
                scoreDisplay.textContent = score;
                spawnFood();
            } else {
                snake.pop();
            }

            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
                gameOver();
                return;
            }

            drawGame();
        }

        function checkCollision(head) {
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) return true;
            }
            return false;
        }

        function drawGame() {
            ctx.fillStyle = '#011221';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#43D9AD';
            ctx.beginPath();
            ctx.arc(food.x + gridSize/2, food.y + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
            ctx.fill();

            snake.forEach((part, index) => {
                ctx.fillStyle = index === 0 ? '#43D9AD' : 'rgba(67, 217, 173, 0.7)';
                ctx.fillRect(part.x, part.y, gridSize - 1, gridSize - 1);
            });
        }

        function gameOver() {
            isPlaying = false;
            clearInterval(gameLoop);
            overlayGameOver.style.display = 'flex';
        }

        if(startBtn) startBtn.addEventListener('click', initGame);
        if(restartBtn) restartBtn.addEventListener('click', initGame);

        window.addEventListener('keydown', e => {
            if (!isPlaying) return;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
            if (e.code === 'ArrowUp' && dy === 0) { dx = 0; dy = -gridSize; }
            if (e.code === 'ArrowDown' && dy === 0) { dx = 0; dy = gridSize; }
            if (e.code === 'ArrowLeft' && dx === 0) { dx = -gridSize; dy = 0; }
            if (e.code === 'ArrowRight' && dx === 0) { dx = gridSize; dy = 0; }
        });

        drawGame(); // Draw initial idle state
    }

    // ==========================================
    // 9. CONTACT FORM LOGIC
    // ==========================================
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactMsg = document.getElementById('contact-msg');
    
    const codeName = document.getElementById('code-name');
    const codeEmail = document.getElementById('code-email');
    const codeMsg = document.getElementById('code-msg');

    function updateContactPreview() {
        if(codeName) codeName.textContent = `"${contactName.value}"`;
        if(codeEmail) codeEmail.textContent = `"${contactEmail.value}"`;
        if(codeMsg) codeMsg.textContent = `"${contactMsg.value}"`;
    }

    if(contactName) contactName.addEventListener('input', updateContactPreview);
    if(contactEmail) contactEmail.addEventListener('input', updateContactPreview);
    if(contactMsg) contactMsg.addEventListener('input', updateContactPreview);

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "_sending...";
            submitBtn.disabled = true;

            const payload = {
                name: contactName.value,
                email: contactEmail.value,
                message: contactMsg.value
            };

            try {
                // ВАЖЛИВО: Замініть 'YOUR_FORM_ID' на ваш реальний ID з сайту Formspree.io
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert("Повідомлення успішно надіслано!");
                    contactForm.reset();
                    updateContactPreview();
                } else {
                    alert("Помилка відправки. Перевірте Formspree ID.");
                }
            } catch (error) {
                alert("Помилка з'єднання!");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    fetchProjects();
});