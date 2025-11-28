// ============================================
// NAVEGAÇÃO E MENU
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (menuToggle) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (navMenu && menuToggle) {
            const isClickInsideNav = navMenu.contains(e.target) || menuToggle.contains(e.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // GRÁFICOS CIRCULARES
    // ============================================
    
    const statCircles = document.querySelectorAll('.stat-circle');
    
    if (statCircles.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const progressCircle = circle.querySelector('.stat-circle-progress');
                    const percent = parseInt(circle.getAttribute('data-percent')) || 0;
                    const radius = 70;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (percent / 100) * circumference;
                    
                    if (progressCircle) {
                        progressCircle.style.strokeDashoffset = offset;
                    }
                    
                    // Animar valor numérico
                    const valueElement = circle.querySelector('.stat-value');
                    if (valueElement) {
                        const finalText = valueElement.textContent;
                        const hasPlus = finalText.includes('+');
                        const hasPercent = finalText.includes('%');
                        const numericValue = parseInt(finalText.replace(/\D/g, ''));
                        
                        let current = 0;
                        const increment = numericValue / 60;
                        const timer = setInterval(function() {
                            current += increment;
                            if (current >= numericValue) {
                                valueElement.textContent = numericValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                                clearInterval(timer);
                            } else {
                                valueElement.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                            }
                        }, 16);
                    }
                    
                    observer.unobserve(circle);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statCircles.forEach(function(circle) {
            observer.observe(circle);
        });
    }
    
    // ============================================
    // ANIMAÇÕES DE SCROLL
    // ============================================
    
    const animatedElements = document.querySelectorAll('.glass-card, .service-card, .cause-card, .ong-card, .timeline-item, .feature-card');
    
    if (animatedElements.length > 0) {
        const scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(function(element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            scrollObserver.observe(element);
        });
    }
    
    // ============================================
    // PESQUISA
    // ============================================
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function handleSearch() {
        if (searchInput) {
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                console.log('Pesquisando por:', searchTerm);
                alert('Pesquisando por: ' + searchTerm + '\n\nFuncionalidade em desenvolvimento.');
            }
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (navMenu && navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // ============================================
    // PARALLAX EFFECT NO HERO
    // ============================================
    
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight * 0.5);
            }
        });
    }
    
    // ============================================
    // CARROSSEL DE IMAGENS - COVER FLOW (3D)
    // ============================================
    
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (carouselTrack && carouselSlides.length > 0) {
        let currentSlide = 0;
        let autoplayInterval;
        const totalSlides = carouselSlides.length;
        
        // Função para atualizar o carrossel com efeito Cover Flow
        function updateCarousel() {
            carouselSlides.forEach(function(slide, index) {
                // Remove todas as classes de posição
                slide.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');
                
                // Calcula a diferença de posição em relação ao slide ativo
                let diff = index - currentSlide;
                
                // Ajusta para loop circular
                if (diff > totalSlides / 2) {
                    diff -= totalSlides;
                } else if (diff < -totalSlides / 2) {
                    diff += totalSlides;
                }
                
                // Aplica classes baseado na posição relativa
                if (diff === 0) {
                    slide.classList.add('active');
                    slide.style.opacity = '';
                    slide.style.pointerEvents = '';
                } else if (diff === -1) {
                    slide.classList.add('prev');
                    slide.style.opacity = '';
                    slide.style.pointerEvents = '';
                } else if (diff === 1) {
                    slide.classList.add('next');
                    slide.style.opacity = '';
                    slide.style.pointerEvents = '';
                } else if (diff === -2) {
                    slide.classList.add('prev-2');
                    slide.style.opacity = '';
                    slide.style.pointerEvents = '';
                } else if (diff === 2) {
                    slide.classList.add('next-2');
                    slide.style.opacity = '';
                    slide.style.pointerEvents = '';
                } else {
                    // Slides muito distantes ficam invisíveis
                    slide.style.opacity = '0';
                    slide.style.pointerEvents = 'none';
                }
            });
            
            // Atualiza indicadores
            carouselIndicators.forEach(function(indicator, index) {
                indicator.classList.remove('active');
                if (index === currentSlide) {
                    indicator.classList.add('active');
                }
            });
        }
        
        // Função para ir para próximo slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        // Função para ir para slide anterior
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Event listeners para botões
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetAutoplay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetAutoplay();
            });
        }
        
        // Event listeners para indicadores
        carouselIndicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                updateCarousel();
                resetAutoplay();
            });
        });
        
        // Clique nos slides laterais para navegar
        carouselSlides.forEach(function(slide, index) {
            slide.addEventListener('click', function() {
                if (!slide.classList.contains('active')) {
                    if (slide.classList.contains('prev') || slide.classList.contains('prev-2')) {
                        prevSlide();
                    } else if (slide.classList.contains('next') || slide.classList.contains('next-2')) {
                        nextSlide();
                    }
                    resetAutoplay();
                }
            });
        });
        
        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(function() {
                nextSlide();
            }, 5000); // Muda a cada 5 segundos
        }
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Pausar autoplay ao passar o mouse
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                clearInterval(autoplayInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                startAutoplay();
            });
        }
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (carouselContainer && document.activeElement === document.body) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetAutoplay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetAutoplay();
                }
            }
        });
        
        // Touch/swipe para mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                isDragging = true;
            }, { passive: true });
            
            carouselContainer.addEventListener('touchmove', function(e) {
                if (isDragging) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            carouselContainer.addEventListener('touchend', function(e) {
                if (isDragging) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                    isDragging = false;
                }
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe para esquerda - próximo slide
                    nextSlide();
                } else {
                    // Swipe para direita - slide anterior
                    prevSlide();
                }
                resetAutoplay();
            }
        }
        
        // Inicializar
        updateCarousel();
        startAutoplay();
    }
    
    console.log('Voluntee - Site carregado com sucesso!');
});
