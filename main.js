        function toggleMenu() {
            const menu = document.getElementById('menuMobile');
            const btn = document.querySelector('.menu-btn');
            if (menu) menu.classList.toggle('ativo');
            if (btn) btn.classList.toggle('ativo');
        }

        function smoothScrollToElement(targetEl, duration = 900, offset = 0) {
            const startY = window.scrollY || window.pageYOffset;
            const targetRect = targetEl.getBoundingClientRect();
            const targetY = startY + targetRect.top - offset;
            const distance = targetY - startY;
            let startTime = null;

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);
                window.scrollTo(0, Math.round(startY + distance * eased));
                if (elapsed < duration) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        }

        document.addEventListener('DOMContentLoaded', function () {
            console.log('main inline carregado');
            const menu = document.getElementById('menuMobile');
            const links = document.querySelectorAll('#menuMobile a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault(); 
                    const href = this.getAttribute('href');
                    const target = document.querySelector(href);
                    if (!target) return;

                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;

                    const duration = 900;

                    smoothScrollToElement(target, duration, headerHeight + 8);

                    if (menu && menu.classList.contains('ativo')) menu.classList.remove('ativo');
                    const btn = document.querySelector('.menu-btn');
                    if (btn && btn.classList.contains('ativo')) btn.classList.remove('ativo');
                });
            });
        });