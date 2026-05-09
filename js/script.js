/**
 * ============================================================================
 * YatraMitr Customer Portal Logic
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /**
     * ------------------------------------------------------------------------
     * DOM Elements
     * ------------------------------------------------------------------------
     */
    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbText = document.getElementById('breadcrumb-text');
    const searchTabs = document.querySelectorAll('.js-search-tab');
    const searchForms = document.querySelectorAll('.search-form');
    const swapBtns = document.querySelectorAll('.js-swap-btn');
    const accordionToggles = document.querySelectorAll('.js-accordion-toggle');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    const navLinks = document.querySelectorAll('a.nav-link');
    const mainForms = document.querySelectorAll('.js-search-form');

    /**
     * ------------------------------------------------------------------------
     * UI Interactions: Breadcrumbs
     * ------------------------------------------------------------------------
     */
    function setBreadcrumb(pathArray) {
        if (!pathArray || pathArray.length === 0) {
            breadcrumb.classList.add('hidden');
            return;
        }

        breadcrumb.classList.remove('hidden');
        let html = '';
        pathArray.forEach((item, index) => {
            html += `<span>/</span>`;
            if (index === pathArray.length - 1) {
                html += `<span class="text-base-text font-medium">${item}</span>`;
            } else {
                html += `<span>${item}</span>`;
            }
        });
        breadcrumbText.innerHTML = html;
    }

    /**
     * ------------------------------------------------------------------------
     * UI Interactions: Search Tabs
     * ------------------------------------------------------------------------
     */
    searchTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetFormId = tab.getAttribute('data-target');

            // Reset all tabs
            searchTabs.forEach(t => {
                t.classList.remove('text-base-text');
                t.classList.add('text-base-muted');
                const indicator = t.querySelector('.tab-indicator');
                if (indicator) {
                    indicator.classList.remove('scale-x-100');
                    indicator.classList.add('scale-x-0');
                }
            });

            // Activate clicked tab
            tab.classList.remove('text-base-muted');
            tab.classList.add('text-base-text');
            const newIndicator = tab.querySelector('.tab-indicator');
            if (newIndicator) {
                newIndicator.classList.remove('scale-x-0');
                newIndicator.classList.add('scale-x-100');
            }

            // Hide all forms, show selected
            searchForms.forEach(form => {
                form.classList.remove('block');
                form.classList.add('hidden');
            });

            const activeForm = document.getElementById(targetFormId);
            if (activeForm) {
                activeForm.classList.remove('hidden');
                activeForm.classList.add('block');
            }
        });
    });

    /**
     * ------------------------------------------------------------------------
     * UI Interactions: Location Swapping
     * ------------------------------------------------------------------------
     */
    swapBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id1 = btn.getAttribute('data-swap-1');
            const id2 = btn.getAttribute('data-swap-2');
            
            const input1 = document.getElementById(id1);
            const input2 = document.getElementById(id2);
            
            if (input1 && input2) {
                const temp = input1.value;
                input1.value = input2.value;
                input2.value = temp;
            }

            // Rotate animation on the specific icon
            const swapIcon = btn.querySelector('i');
            if (swapIcon) {
                swapIcon.style.transform = swapIcon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
                // Relying on Tailwind's transition-transform class on the icon
            }
        });
    });

    /**
     * ------------------------------------------------------------------------
     * UI Interactions: Accordions
     * ------------------------------------------------------------------------
     */
    accordionToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentItem = btn.closest('.accordion-item');
            if(!currentItem) return;

            const isActive = currentItem.classList.contains('active');
            const titleElement = currentItem.querySelector('h2');
            const title = titleElement ? titleElement.innerText : '';

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                currentItem.classList.add('active');
                // Scroll to item for better UX
                setTimeout(() => {
                    currentItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
                // Update Breadcrumb
                setBreadcrumb([title]);
            } else {
                // If closing the active accordion, hide breadcrumb
                setBreadcrumb([]);
            }
        });
    });

    /**
     * ------------------------------------------------------------------------
     * UI Interactions: Form Submissions (Demo)
     * ------------------------------------------------------------------------
     */
    mainForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formType = form.getAttribute('data-type') || 'items';
            alert(`Searching ${formType}...`);
        });
    });

    /**
     * ------------------------------------------------------------------------
     * Navigation Logic (Demo)
     * ------------------------------------------------------------------------
     */
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subCat = e.target.innerText;
            const dropdown = e.target.closest('.dropdown');
            const mainCatBtn = dropdown ? dropdown.querySelector('button') : null;
            const mainCat = mainCatBtn ? mainCatBtn.innerText.trim() : '';
            
            setBreadcrumb([mainCat, subCat]);
            
            const mainElement = document.querySelector('main');
            if (mainElement) {
                window.scrollTo({ top: mainElement.offsetTop - 100, behavior: 'smooth' });
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target.innerText === 'Home') {
                e.preventDefault();
                setBreadcrumb([]);
                document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    /**
     * ------------------------------------------------------------------------
     * Search Box Reveal Logic
     * ------------------------------------------------------------------------
     */
    const startJourneyBtn = document.getElementById('start-journey-btn');
    const searchBoxContent = document.getElementById('search-box-content');

    if (startJourneyBtn && searchBoxContent) {
        startJourneyBtn.addEventListener('click', () => {
            // Hide button with fade out
            startJourneyBtn.style.opacity = '0';
            startJourneyBtn.style.transform = 'scale(0.95)';
            startJourneyBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                startJourneyBtn.classList.add('hidden');
                
                // Show search box
                searchBoxContent.classList.remove('hidden');
                
                // Trigger animation in next tick
                requestAnimationFrame(() => {
                    searchBoxContent.classList.remove('opacity-0', 'translate-y-8');
                    searchBoxContent.classList.add('opacity-100', 'translate-y-0');
                });
            }, 400);
        });
    }

    // Initial State Setup: Ensure all accordions are closed initially
    document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));

    /**
     * ------------------------------------------------------------------------
     * Mobile Menu Logic
     * ------------------------------------------------------------------------
     */
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = mobileMenu ? mobileMenu.querySelector('div') : null;
    const mobileDropdownToggles = document.querySelectorAll('.js-mobile-dropdown-toggle');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
                if (mobileMenuContent) mobileMenuContent.classList.remove('translate-x-full');
            }, 10);
        });

        const closeFunc = () => {
            if (mobileMenuContent) mobileMenuContent.classList.add('translate-x-full');
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        };

        if (closeMenu) closeMenu.addEventListener('click', closeFunc);
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeFunc();
        });
    }

    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            if (content) {
                content.classList.toggle('hidden');
                if (icon) {
                    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            }
        });
    });

    /**
     * ------------------------------------------------------------------------
     * Contact Form: Custom Subject Reveal
     * ------------------------------------------------------------------------
     */
    const subjectSelect = document.getElementById('contact-subject');
    const customSubjectWrapper = document.getElementById('custom-subject-wrapper');

    if (subjectSelect && customSubjectWrapper) {
        subjectSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                customSubjectWrapper.classList.remove('hidden');
            } else {
                customSubjectWrapper.classList.add('hidden');
            }
        });
    }
});
