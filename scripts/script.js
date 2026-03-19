document.addEventListener('DOMContentLoaded', () => {
    
    // 1. СЛОВНИК З ПЕРЕКЛАДАМИ
    const translations = {
        en: {
            hero_title: 'Hi, I\'m <br><span class="highlight">Nazar</span>',
            hero_subtitle: 'Frontend Developer from Ukraine, living in Italy. I build fast, modern, and brutalist web interfaces.',
            nav_home: 'Home',
            nav_projects: 'Projects',
            nav_reviews: 'Reviews',
            nav_contact: 'Contact',
            section_projects_title: 'Selected Works',
            project_image_preview: 'Lash Studio Preview',
            project_lash_title: 'Oksana Lash Studio',
            project_lash_desc: 'An elegant and responsive portfolio website for a lash extension specialist. Features a clean service menu, smooth animations, and a contact form for direct bookings.',
            btn_view_project: 'View Project ↗',
            section_reviews_title: 'Client Reviews',
            leave_review_title: 'Leave a Review',
            placeholder_name: 'Your Name',
            placeholder_feedback: 'Your Feedback',
            btn_submit_review: 'Send Review',
            hint_hover_color: 'Hover for full color',
            contact_title: 'Contact',
            contact_subtitle: 'Hi! Send me a message and I\'ll reply here.',
            btn_telegram: 'Telegram',
            btn_whatsapp: 'WhatsApp',
            btn_instagram: 'Instagram',
            project_example_title: "Modern Service Landing",
            project_example_desc: "A high-performance landing page concept focusing on clean layout and professional typography. Fully responsive with optimized assets for maximum loading speed.",
            project_card_title: "Digital Business Card",
            project_card_desc: "A minimalist and high-speed personal branding page. Designed for mobile-first experience with a focus on quick access to social links and professional bio.",
            project_corp_title: "Corporate Business Concept",
            project_corp_desc: "A comprehensive multi-section corporate website. Focused on clean information architecture, scalable CSS structure, and professional aesthetics for modern enterprises.",
            project_event_title: "Digital Event Landing",
            project_event_desc: "A high-conversion landing page for digital events. Features a bold call-to-action, integrated countdown logic, and a clean, high-contrast UI.",
        },
        ua: {
            hero_title: 'Привіт, я <br><span class="highlight">Назар</span>',
            hero_subtitle: 'Frontend Розробник з України, проживаю в Італії. Створюю швидкі, сучасні та мінімалістичні веб-інтерфейси.',
            nav_home: 'Головна',
            nav_projects: 'Проєкти',
            nav_reviews: 'Відгуки',
            nav_contact: 'Контакти',
            section_projects_title: 'Обрані роботи',
            project_image_preview: 'Скріншот сайту',
            project_lash_title: 'Студія краси Оксани',
            project_lash_desc: 'Елегантний та адаптивний сайт-портфоліо для майстра з нарощування вій. Містить зручне меню послуг, плавні анімації та контактну форму для запису клієнтів.',
            btn_view_project: 'Переглянути проєкт ↗',
            section_reviews_title: 'Відгуки клієнтів',
            leave_review_title: 'Залишити відгук',
            placeholder_name: 'Ваше ім\'я',
            placeholder_feedback: 'Ваш відгук',
            btn_submit_review: 'Надіслати відгук',
            hint_hover_color: 'Наведіть, щоб побачити кольори',
            contact_title: 'Контакти',
            contact_subtitle: 'Привіт! Напиши мені повідомлення, і ми обговоримо твій проєкт.',
            btn_telegram: 'Телеграм',
            btn_whatsapp: 'WhatsApp',
            btn_instagram: 'Інстаграм',
            project_example_title: "Сучасний сервісний лендинг",
            project_example_desc: "Високопродуктивний концепт лендингу з акцентом на чисту верстку та професійну типографіку. Повністю адаптивний з оптимізованими ресурсами для максимальної швидкості.",
            project_card_title: "Цифрова візитка",
            project_card_desc: "Мінімалістична та швидка персональна сторінка бренду. Розроблена з пріоритетом на мобільні пристрої для швидкого доступу до соцмереж та контактів.",
            project_corp_title: "Корпоративний бізнес-концепт",
            project_corp_desc: "Масштабний багатосекційний корпоративний сайт. Фокус на чистій інформаційній архітектурі, масштабованій структурі CSS та професійній естетиці для сучасних підприємств.",
            project_event_title: "Лендинг для Digital-подій",
            project_event_desc: "Висококонверсійний лендинг для цифрових заходів. Містить яскраві заклики до дії, логіку зворотного відліку та чистий контрастний інтерфейс.",
        } // Ось тут була помилка (загублена дужка)
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    let currentLang = localStorage.getItem('portfolio_lang') || 'en';

    function setLanguage(lang) {
        // Переклад звичайних елементів
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Перемикання активної кнопки мови
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Переклад плейсхолдерів
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem('portfolio_lang', lang);
        currentLang = lang;
    }

    // Ініціалізація мови
    setLanguage(currentLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // 2. АКТИВНЕ МЕНЮ (ScrollSpy)
    const sections = document.querySelectorAll('header, section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Якщо ми проскролили більше ніж до середини поточної секції
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Спеціальна перевірка для самого низу сторінки (якщо доскролили до кінця)
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. ЗІРОЧКИ
    const stars = document.querySelectorAll('.rating-select .star');
    const ratingInput = document.getElementById('rating-value');
    const ratingContainer = document.querySelector('.rating-select');

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                ratingInput.value = value; 
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= value);
                });
            });

            star.addEventListener('mouseover', () => {
                const value = star.getAttribute('data-value');
                stars.forEach(s => {
                    s.classList.toggle('hovered', s.getAttribute('data-value') <= value);
                });
            });
        });

        ratingContainer.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });
    }

    // 4. ЗАВАНТАЖЕННЯ ВІДГУКІВ
    async function loadReviews() {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        // 1. Показуємо спінер (лоадер) ПЕРЕД тим, як робити запит
        container.innerHTML = `
            <div id="reviews-loader" class="loader-container">
                <div class="spinner"></div>
                <div>
                    <p style="margin: 0; color: #fff;">Завантажуємо відгуки...</p>
                    <p class="loader-hint">(чекаємо на відповідь сервера)</p>
                </div>
            </div>
        `;

        try {
            // 2. Звертаємося до твого бекенду на Render
            const response = await fetch('https://nazar-portfolio-api.onrender.com/reviews');
            if (!response.ok) throw new Error('Сервер не відповідає');
            
            const reviews = await response.json();
            
            // 3. ДАНІ ПРИЙШЛИ! Очищаємо контейнер (видаляємо спінер)
            container.innerHTML = '';
            
            // 4. Якщо відгуків ще немає
            if (reviews.length === 0) {
                container.innerHTML = '<p style="color: #888; text-align: center;">There are no reviews yet. Be the first!</p>';
                return;
            }

            // 5. Малюємо відгуки (заміни класи на ті, що використовуєш у своїй верстці)
            reviews.forEach(r => {
                const card = `
                    <div class="review-card reveal active">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <h4 style="margin: 0; color: #fff;">${r.name}</h4>
                            <span style="color: #FF5500;">${r.rating} ★</span>
                        </div>
                        <p style="color: #aaa; font-size: 14px;">"${r.text}"</p>
                    </div>
                `;
                // Додаємо відгук у контейнер
                container.insertAdjacentHTML('beforeend', card);
            });

        } catch (err) {
            console.log("Відгуки не завантажені.", err);
            // 6. Якщо сталася помилка — замість спінера показуємо текст
            container.innerHTML = '<p style="color: #cc0000; text-align: center;">Помилка завантаження відгуків.</p>';
        }
    }

    loadReviews();

    // 5. ВІДПРАВКА ВІДГУКУ
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = ratingInput.value;
            const name = document.getElementById('reviewer-name').value;
            const text = document.getElementById('reviewer-text').value;
            const submitBtn = reviewForm.querySelector('.btn-submit');

            if (rating === "0") {
                alert(currentLang === 'uk' ? "Оберіть зірочки!" : "Select stars!");
                return;
            }

            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "...";

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
                }
            } catch (err) {
                console.error("Помилка при відправці:", err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = currentLang === 'uk' ? translations.uk.btn_submit_review : translations.en.btn_submit_review;
            }
        });
    }

     // 6. АНІМАЦІЇ ПРИ СКРОЛІ
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); 
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
   // 7. ЗАВАНТАЖЕННЯ ПРОЄКТІВ З PYTHON БЕКЕНДУ
    async function fetchProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        // 1. Показуємо лоадер перед початком запиту
        const loaderHTML = `
            <div id="projects-loader" class="loader-container">
                <div class="spinner"></div>
                <div>
                    <p style="margin: 0; color: #fff;">Підключаємось до сервера...</p>
                    <p class="loader-hint">(Перший запуск після паузи може зайняти до 50 секунд)</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', loaderHTML);

        try {
            // 2. Робимо запит
            const response = await fetch('https://nazar-portfolio-api.onrender.com/projects');
            if (!response.ok) throw new Error('Сервер не відповідає');
            
            const projects = await response.json();
            
            // 3. Видаляємо лоадер, бо дані прийшли!
            const loader = document.getElementById('projects-loader');
            if (loader) loader.remove();
            
            // 4. Малюємо проєкти
            projects.forEach(p => {
                const techArray = p.tech_stack ? p.tech_stack.split(',') : [];
                const techSpans = techArray.map(tech => `<span>${tech.trim()}</span>`).join('');

                const card = `
                    <article class="project-card reveal active">
                        <div class="project-image">
                            <img src="${p.img}" alt="${p.title}" class="portfolio-img">
                            <div class="image-overlay-hint">
                                <span class="dot-orange"></span> 
                                <span>Dynamic Project</span>
                            </div>
                        </div>
                        
                        <div class="project-info">
                            <h3>${p.title}</h3>
                            <p class="project-desc">${p.desc}</p>
                            
                            <div class="tech-stack">
                                ${techSpans}
                            </div>
                            
                            <a href="${p.link}" class="btn-link" target="_blank">View Project ↗</a>
                        </div>
                    </article>
                `;
                container.insertAdjacentHTML('afterbegin', card);
            });
        } catch (err) {
            console.log("Динамічні проєкти не завантажені.", err);
            const loader = document.getElementById('projects-loader');
            if (loader) {
                loader.innerHTML = '<p style="color: #cc0000;">Помилка підключення до бази даних. Спробуйте пізніше.</p>';
            }
        }
    }

    // Запускаємо функцію
    fetchProjects();
});