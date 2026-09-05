(function($) {
    "use strict";

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Fixed navbar — transparent at the top, subtle glass on scroll.
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20) {
            $('.fixed-top').addClass('nav-scrolled');
        } else {
            $('.fixed-top').removeClass('nav-scrolled');
        }
    });

    $('.fixed-top')
        .removeClass('bg-white shadow')
        .css('top', 0);


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });



    // Premium stat counters — animate only when the metrics enter the viewport.
    function animatePremiumStats() {
        $('.stat-number').each(function() {
            var $el = $(this);
            if ($el.data('animated')) return;
            var rect = this.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
                $el.data('animated', true);
                var target = Number($el.data('count')) || 0;
                var suffix = $el.data('suffix') || '';
                $({ value: 0 }).animate({ value: target }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function(now) {
                        $el.text(Math.floor(now).toLocaleString('en-IN') + suffix);
                    },
                    complete: function() { $el.text(target.toLocaleString('en-IN') + suffix); }
                });
            }
        });
    }
    $(window).on('scroll resize', animatePremiumStats);
    animatePremiumStats();

    // Smooth, scroll-driven roadmap progress and milestone reveals.
    function updateRoadmapProgress() {
        var wrapper = document.querySelector('.milestone-roadmap-wrapper');
        var path = document.querySelector('.roadmap-track-progress');
        if (!wrapper || !path) return;

        // Ensure dash values match the actual path length for smooth rendering
        var pathLen = path.getTotalLength();
        path.style.strokeDasharray = pathLen;
        // Keep dashoffset synced to length initially if not already set
        if (!path.style.strokeDashoffset || path.style.strokeDashoffset === '') {
            path.style.strokeDashoffset = pathLen;
        }
        path.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(.16,1,.3,1)';

        // Map scroll position within the wrapper to a 0..1 progress value.
        var top = wrapper.getBoundingClientRect().top + window.scrollY;
        var indicator = window.scrollY + window.innerHeight * 0.6; // pointer a little below center

        // Prefer the SVG bottom terminal dot as the endpoint so the stroke reaches the final terminal
        var svg = wrapper.querySelector('.roadmap-spine-svg');
        var endPos = top + wrapper.offsetHeight;
        if (svg) {
            var circles = svg.querySelectorAll('circle');
            if (circles && circles.length) {
                var bottomDot = circles[circles.length - 1];
                endPos = bottomDot.getBoundingClientRect().top + window.scrollY;
            }
        }

        var frac = (indicator - top) / (endPos - top);
        frac = Math.max(0, Math.min(1, frac));

        // If the indicator is very close to the endpoint, snap to fully complete to avoid a visible gap
        var snapThreshold = Math.min(160, Math.max(40, Math.floor(window.innerHeight * 0.15)));
        if (indicator + snapThreshold >= endPos) frac = 1;

        // Apply to stroke dashoffset so the gold path grows as we scroll down
        var offset = pathLen * (1 - frac);
        path.style.strokeDashoffset = offset;

        // Reveal individual milestone nodes consistently as the user scrolls
        var steps = wrapper.querySelectorAll('.roadmap-step');
        var threshold = window.innerWidth < 768 ? window.innerHeight * 0.95 : window.innerHeight * 0.82;
        steps.forEach(function(step) {
            var rect = step.getBoundingClientRect();
            if (rect.top < threshold) step.classList.add('is-visible');
            else step.classList.remove('is-visible');
        });
    }
    $(window).on('scroll resize', updateRoadmapProgress);
    updateRoadmapProgress();

    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    /* =======================================================
       OUR FRAMEWORK (Six Pillars Interactive Carousel Engine)
       ======================================================= */
    (function initFrameworkSection() {
        const frameworkData = [
            {
                id: 1,
                pillar: "GOAL PLANNING",
                eyebrow: "WHY GOAL-BASED PLANNING MATTERS",
                heading: "Give Every Rupee a Purpose",
                description: "Financial planning starts with knowing what your money needs to achieve.",
                bullets: [
                    "Define short, medium and long-term goals",
                    "Put numbers and timelines against every goal",
                    "Prioritise what matters most",
                    "Build a financial roadmap around those priorities"
                ],
                image: "img/1.png",
                imageAlt: "Couple defining and planning long-term financial goals",
                cardHeadline: "Turning Dreams Into Numbers",
                cardSubtext: "Clear goals make financial decisions easier."
            },
            {
                id: 2,
                pillar: "BUDGET & TAX",
                eyebrow: "WHY CASH-FLOW PLANNING MATTERS",
                heading: "Know Where Your Money Goes. Keep More of It.",
                description: "Building wealth isn't only about earning more. It's also about managing what comes in, what goes out and what stays with you.",
                bullets: [
                    "Build a practical cash-flow structure",
                    "Maintain an appropriate emergency fund",
                    "Plan taxes efficiently",
                    "Create room for future investments"
                ],
                image: "img/2.png",
                imageAlt: "Multi-generational family with structured cash flow and budgeting",
                cardHeadline: "Making Every Rupee Work",
                cardSubtext: "Better structure today creates more flexibility tomorrow."
            },
            {
                id: 3,
                pillar: "LOANS",
                eyebrow: "WHY DEBT PLANNING MATTERS",
                heading: "Borrow With a Plan. Repay With Purpose.",
                description: "Debt can either support your goals or quietly delay them. The difference is how it is structured and managed.",
                bullets: [
                    "Choose the right loan mix",
                    "Evaluate cost versus tenure",
                    "Prioritise repayment strategically",
                    "Reduce unnecessary interest over time"
                ],
                image: "img/3.png",
                imageAlt: "Professional woman with disciplined long-term financial roadmap",
                cardHeadline: "Debt That Works For You",
                cardSubtext: "The goal isn't just to borrow. It's to borrow intelligently."
            },
            {
                id: 4,
                pillar: "INSURANCE",
                eyebrow: "WHY PROTECTION COMES FIRST",
                heading: "Protect What Your Wealth Cannot Replace",
                description: "Before building wealth, protect the people and responsibilities that depend on you.",
                bullets: [
                    "Assess life protection needs",
                    "Cover healthcare risks",
                    "Avoid gaps and unnecessary overlap",
                    "Buy only what your situation actually requires"
                ],
                image: "img/4.png",
                imageAlt: "Reviewing comprehensive insurance and risk coverage plans",
                cardHeadline: "Protecting What Matters",
                cardSubtext: "Because one unexpected event shouldn't undo years of planning."
            },
            {
                id: 5,
                pillar: "INVESTING",
                eyebrow: "WHY INVESTMENT PLANNING MATTERS",
                heading: "Don't Just Invest. Invest With a Destination.",
                description: "Investments should connect to your goals, timeline and ability to take risk — not simply the latest market opportunity.",
                bullets: [
                    "Build diversified portfolios",
                    "Match investments to specific goals",
                    "Align risk with your profile",
                    "Review and rebalance as life changes"
                ],
                image: "img/5.png",
                imageAlt: "Family achieving their home milestone through goal-based investing",
                cardHeadline: "Making Wealth Work Toward Your Goals",
                cardSubtext: "The right portfolio has a purpose behind every allocation."
            },
            {
                id: 6,
                pillar: "ESTATE & LEGACY",
                eyebrow: "WHY LEGACY PLANNING MATTERS",
                heading: "Build Wealth. Then Decide Where It Goes.",
                description: "Creating wealth is one responsibility. Making sure it reaches the right people, in the right way, is another.",
                bullets: [
                    "Organise wills and nominations",
                    "Structure asset succession",
                    "Reduce ambiguity for your family",
                    "Create a clear wealth-transfer plan"
                ],
                image: "img/6.png",
                imageAlt: "Multi-generational family securing their legacy and future generations",
                cardHeadline: "Planning Beyond Your Lifetime",
                cardSubtext: "Your wealth should carry your intentions forward."
            }
        ];

        let currentIndex = 0;
        let autoplayTimer = null;
        const AUTOPLAY_DELAY = 6500; // 6.5s per slide (Strat8 slow, sophisticated cadence)
        let isHovered = false;

        const $contentCard = $('#framework-slide-content');
        const $eyebrow = $('#fw-eyebrow');
        const $heading = $('#fw-heading');
        const $desc = $('#fw-desc');
        const $bullets = $('#fw-bullets');
        const $image = $('#fw-image');
        const $caption = $('.framework-image-caption');
        const $cardHeadline = $('#fw-card-headline');
        const $cardSubtext = $('#fw-card-subtext');
        const $dots = $('.fw-dot');
        const $pipelineTabs = $('.pipeline-tab');
        const $frameworkSection = $('#our-framework');

        if (!$frameworkSection.length) return;

        function goToSlide(index, manual = false) {
            if (index < 0) index = frameworkData.length - 1;
            if (index >= frameworkData.length) index = 0;
            if (index === currentIndex && manual) return;

            const slide = frameworkData[index];
            currentIndex = index;

            // Sync indicators & tabs immediately
            $dots.removeClass('active').eq(index).addClass('active');
            $pipelineTabs.removeClass('active').attr('aria-selected', 'false');
            $pipelineTabs.eq(index).addClass('active').attr('aria-selected', 'true');

            // Soft exit transition
            $contentCard.addClass('fw-fade-out');
            $image.addClass('fw-img-fade');
            $caption.addClass('fw-caption-fade');

            setTimeout(function() {
                // Update text and bullets
                $eyebrow.text(slide.eyebrow);
                $heading.text(slide.heading);
                $desc.text(slide.description);

                let bulletsHtml = '';
                slide.bullets.forEach(function(b) {
                    bulletsHtml += `<li><span class="fw-check-icon"><i class="bi bi-check2"></i></span><span class="fw-bullet-text">${b}</span></li>`;
                });
                $bullets.html(bulletsHtml);

                // Update image and card caption
                $image.attr('src', slide.image).attr('alt', slide.imageAlt);
                $cardHeadline.text(slide.cardHeadline);
                $cardSubtext.text(slide.cardSubtext);

                // Soft enter transition
                $contentCard.removeClass('fw-fade-out').addClass('fw-fade-in');
                $image.removeClass('fw-img-fade');
                $caption.removeClass('fw-caption-fade');

                setTimeout(function() {
                    $contentCard.removeClass('fw-fade-in');
                }, 350);
            }, 250);

            if (manual) {
                resetAutoplay();
            }
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(function() {
                if (!isHovered) {
                    goToSlide(currentIndex + 1, false);
                }
            }, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Click handler for dots
        $dots.on('click', function(e) {
            e.preventDefault();
            const targetIdx = parseInt($(this).data('index'), 10);
            goToSlide(targetIdx, true);
        });

        // Click handler for pipeline tabs
        $pipelineTabs.on('click', function(e) {
            e.preventDefault();
            const targetIdx = parseInt($(this).data('slide'), 10);
            goToSlide(targetIdx, true);
        });

        // Pause autoplay on mouse enter / hover
        $frameworkSection.on('mouseenter', function() {
            isHovered = true;
        }).on('mouseleave', function() {
            isHovered = false;
        });

        // Touch Swipe Interaction for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const $swipeTarget = $('#framework-carousel');

        $swipeTarget.on('touchstart', function(e) {
            touchStartX = e.originalEvent.changedTouches[0].screenX;
        }, { passive: true });

        $swipeTarget.on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 40;
            if (touchEndX < touchStartX - threshold) {
                // Swiped Left -> Next slide
                goToSlide(currentIndex + 1, true);
            } else if (touchEndX > touchStartX + threshold) {
                // Swiped Right -> Prev slide
                goToSlide(currentIndex - 1, true);
            }
        }

        // Start initial autoplay
        startAutoplay();
    })();

    /* =======================================================
       FLAGSHIP FINANCIAL CALCULATOR ENGINE (ALL 11 TOOLS)
       ======================================================= */
    (function initFinancialCalculators() {
        const $calcContainer = $('#calc-master-container');
        if (!$calcContainer.length) return;

        // Number Formatting Helpers
        function formatINR(val) {
            if (isNaN(val) || val === null) return "₹ 0";
            return "₹ " + Math.round(val).toLocaleString('en-IN');
        }

        function formatCompactINR(val) {
            if (isNaN(val) || val === null || val === 0) return "₹ 0";
            const abs = Math.abs(val);
            if (abs >= 10000000) {
                return "₹ " + (val / 10000000).toFixed(2) + " Cr";
            }
            if (abs >= 100000) {
                return "₹ " + (val / 100000).toFixed(2) + " L";
            }
            return "₹ " + Math.round(val).toLocaleString('en-IN');
        }

        function parseNum(val) {
            if (typeof val === 'number') return val;
            if (!val) return 0;
            return parseFloat(String(val).replace(/[^0-9.-]+/g, "")) || 0;
        }

        // 11 Financial Calculators Data & Schemas
        const calculators = [
            {
                id: "goal-sip",
                num: "01",
                name: "GOAL SIP",
                fullName: "GOAL SIP CALCULATOR",
                benefit: "Turn your future goal into today's SIP.",
                headline: "Turn a Goal Into a Number.",
                subtext: "See what it takes to fund the life you have planned for.",
                inputs: [
                    {
                        id: "goalType",
                        label: "What is your goal?",
                        type: "dropdown",
                        options: ["🏠 Buy a House", "🎓 Child Education", "🏖️ Dream Vacation", "💍 Marriage", "💼 Wealth Creation", "🌟 Other"],
                        default: "🏠 Buy a House"
                    },
                    {
                        id: "currentCost",
                        label: "Current cost",
                        type: "slider",
                        min: 100000,
                        max: 100000000,
                        step: 50000,
                        default: 5000000,
                        prefix: "₹",
                        helper: ""
                    },
                    {
                        id: "years",
                        label: "Years to goal",
                        type: "slider",
                        min: 1,
                        max: 30,
                        step: 1,
                        default: 15,
                        suffix: " Years",
                        helper: ""
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected return (p.a.)",
                        type: "slider",
                        min: 4,
                        max: 20,
                        step: 0.5,
                        default: 12,
                        suffix: "%",
                        helper: ""
                    },
                    {
                        id: "inflation",
                        label: "Inflation (p.a.)",
                        type: "slider",
                        min: 0,
                        max: 12,
                        step: 0.5,
                        default: 6,
                        suffix: "%",
                        helper: ""
                    }
                ],
                calculate: function(v) {
                    const cost = parseNum(v.currentCost);
                    const years = parseNum(v.years);
                    const ret = parseNum(v.expectedReturn) / 100;
                    const inf = parseNum(v.inflation) / 100;

                    const futureGoalValue = cost * Math.pow(1 + inf, years);
                    const months = years * 12;
                    const monthlyRate = ret / 12;

                    let requiredSip = 0;
                    if (monthlyRate > 0 && months > 0) {
                        const compoundFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
                        requiredSip = futureGoalValue / compoundFactor;
                    }

                    const totalInvestment = requiredSip * months;
                    const wealthCreated = Math.max(0, futureGoalValue - totalInvestment);

                    // Generate curve points for chart
                    const chartPoints = [];
                    const steps = Math.min(months, 30);
                    for (let i = 0; i <= steps; i++) {
                        const m = (months / steps) * i;
                        const factor = m > 0 ? (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate * (1 + monthlyRate) : 0;
                        const currGrowth = requiredSip * factor;
                        const currInvest = requiredSip * m;
                        chartPoints.push({
                            label: (m / 12).toFixed(0) + " Years",
                            growth: currGrowth,
                            invest: currInvest
                        });
                    }

                    return {
                        primaryLabel: "REQUIRED MONTHLY SIP",
                        primaryVal: formatINR(requiredSip) + " ",
                        primaryUnit: "/ month",
                        primaryTagline: "Start investing today for a brighter tomorrow.",
                        secondary: [
                            { title: "Future Goal Value", val: formatCompactINR(futureGoalValue) },
                            { title: "Total Investment", val: formatCompactINR(totalInvestment) },
                            { title: "Wealth Created", val: formatCompactINR(wealthCreated) },
                            { title: "Time Remaining", val: years + " Years" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "retirement",
                num: "02",
                name: "RETIREMENT",
                fullName: "RETIREMENT CALCULATOR",
                benefit: "Know what your retirement may require.",
                headline: "How Much Will You Need to Retire Well?",
                subtext: "Calculate your ideal retirement corpus and secure lifelong financial independence.",
                inputs: [
                    {
                        id: "currentAge",
                        label: "Current Age",
                        type: "slider",
                        min: 20,
                        max: 60,
                        step: 1,
                        default: 30,
                        suffix: " Yrs"
                    },
                    {
                        id: "retirementAge",
                        label: "Retirement Age",
                        type: "slider",
                        min: 40,
                        max: 70,
                        step: 1,
                        default: 58,
                        suffix: " Yrs"
                    },
                    {
                        id: "monthlyExpenses",
                        label: "Current Monthly Expenses",
                        type: "slider",
                        min: 20000,
                        max: 500000,
                        step: 5000,
                        default: 65000,
                        prefix: "₹"
                    },
                    {
                        id: "lifeExpectancy",
                        label: "Life Expectancy",
                        type: "slider",
                        min: 70,
                        max: 95,
                        step: 1,
                        default: 82,
                        suffix: " Yrs"
                    },
                    {
                        id: "inflation",
                        label: "Expected Inflation",
                        type: "slider",
                        min: 4,
                        max: 10,
                        step: 0.5,
                        default: 6,
                        suffix: "%"
                    },
                    {
                        id: "expectedReturn",
                        label: "Pre-Retirement Return",
                        type: "slider",
                        min: 8,
                        max: 16,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    },
                    {
                        id: "existingCorpus",
                        label: "Existing Retirement Savings",
                        type: "slider",
                        min: 0,
                        max: 20000000,
                        step: 50000,
                        default: 500000,
                        prefix: "₹"
                    }
                ],
                calculate: function(v) {
                    const curAge = parseNum(v.currentAge);
                    let retAge = parseNum(v.retirementAge);
                    if (retAge <= curAge) retAge = curAge + 1;
                    let lifeExp = parseNum(v.lifeExpectancy);
                    if (lifeExp <= retAge) lifeExp = retAge + 5;

                    const curExp = parseNum(v.monthlyExpenses);
                    const inf = parseNum(v.inflation) / 100;
                    const rPre = parseNum(v.expectedReturn) / 100;
                    const rPost = 0.08; // 8% post retirement
                    const existing = parseNum(v.existingCorpus);

                    const yrsToRet = retAge - curAge;
                    const yrsInRet = lifeExp - retAge;

                    const futureMonthlyExp = curExp * Math.pow(1 + inf, yrsToRet);
                    const futureAnnualExp = futureMonthlyExp * 12;

                    const realReturn = (1 + rPost) / (1 + inf) - 1;
                    let requiredCorpus = 0;
                    if (Math.abs(realReturn) > 0.001) {
                        requiredCorpus = futureAnnualExp * ((1 - Math.pow(1 + realReturn, -yrsInRet)) / realReturn);
                    } else {
                        requiredCorpus = futureAnnualExp * yrsInRet;
                    }

                    const existingFV = existing * Math.pow(1 + rPre, yrsToRet);
                    const shortfall = Math.max(0, requiredCorpus - existingFV);

                    const months = yrsToRet * 12;
                    const mRate = rPre / 12;
                    let requiredSip = 0;
                    if (mRate > 0 && months > 0 && shortfall > 0) {
                        const factor = (Math.pow(1 + mRate, months) - 1) / mRate * (1 + mRate);
                        requiredSip = shortfall / factor;
                    }

                    const chartPoints = [];
                    const steps = 30;
                    for (let i = 0; i <= steps; i++) {
                        const yr = (yrsToRet / steps) * i;
                        const m = yr * 12;
                        const factor = m > 0 ? (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate) : 0;
                        const growth = existing * Math.pow(1 + rPre, yr) + requiredSip * factor;
                        chartPoints.push({
                            label: (curAge + yr).toFixed(0) + "y",
                            growth: growth,
                            invest: existing + requiredSip * m
                        });
                    }

                    return {
                        primaryLabel: "ESTIMATED RETIREMENT CORPUS",
                        primaryVal: formatCompactINR(requiredCorpus),
                        primaryUnit: "",
                        primaryTagline: "Target corpus needed at age " + retAge + " to sustain retirement",
                        secondary: [
                            { title: "REQUIRED MONTHLY SIP", val: formatINR(requiredSip) },
                            { title: "FUTURE MONTHLY EXPENSE", val: formatINR(futureMonthlyExp) },
                            { title: "EXISTING CORPUS FV", val: formatCompactINR(existingFV) },
                            { title: "YEARS IN RETIREMENT", val: yrsInRet + " Years" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "fire",
                num: "03",
                name: "FIRE",
                fullName: "FIRE CALCULATOR",
                benefit: "Find your path to financial independence.",
                headline: "How Close Are You to Financial Independence?",
                subtext: "Determine your exact FIRE target number and earliest retirement freedom milestone.",
                inputs: [
                    {
                        id: "currentAge",
                        label: "Current Age",
                        type: "slider",
                        min: 20,
                        max: 55,
                        step: 1,
                        default: 28,
                        suffix: " Yrs"
                    },
                    {
                        id: "annualExpenses",
                        label: "Annual Living Expenses",
                        type: "slider",
                        min: 300000,
                        max: 6000000,
                        step: 50000,
                        default: 900000,
                        prefix: "₹"
                    },
                    {
                        id: "currentInvestments",
                        label: "Current Net Investments",
                        type: "slider",
                        min: 0,
                        max: 30000000,
                        step: 100000,
                        default: 1500000,
                        prefix: "₹"
                    },
                    {
                        id: "monthlyInvestment",
                        label: "Monthly Investment",
                        type: "slider",
                        min: 5000,
                        max: 500000,
                        step: 5000,
                        default: 50000,
                        prefix: "₹"
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected Portfolio Return",
                        type: "slider",
                        min: 8,
                        max: 16,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    },
                    {
                        id: "inflation",
                        label: "Inflation Rate",
                        type: "slider",
                        min: 4,
                        max: 9,
                        step: 0.5,
                        default: 6,
                        suffix: "%"
                    }
                ],
                calculate: function(v) {
                    const curAge = parseNum(v.currentAge);
                    const annualExp = parseNum(v.annualExpenses);
                    const curInvest = parseNum(v.currentInvestments);
                    const sip = parseNum(v.monthlyInvestment);
                    const r = parseNum(v.expectedReturn) / 100;
                    const inf = parseNum(v.inflation) / 100;

                    const mRate = r / 12;
                    let fireYears = 0;
                    let achievedCorpus = curInvest;
                    let targetFireNumber = annualExp * 25;

                    for (let y = 1; y <= 40; y++) {
                        const m = y * 12;
                        const factor = (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate);
                        achievedCorpus = curInvest * Math.pow(1 + r, y) + sip * factor;
                        const currentTarget = annualExp * Math.pow(1 + inf, y) * 25;
                        if (achievedCorpus >= currentTarget) {
                            fireYears = y;
                            targetFireNumber = currentTarget;
                            break;
                        }
                    }
                    if (fireYears === 0) {
                        fireYears = 35;
                        targetFireNumber = annualExp * Math.pow(1 + inf, fireYears) * 25;
                    }

                    const fireAge = curAge + fireYears;

                    const chartPoints = [];
                    for (let y = 0; y <= fireYears + 2; y += Math.max(1, Math.floor(fireYears / 10))) {
                        const m = y * 12;
                        const factor = m > 0 ? (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate) : 0;
                        const corp = curInvest * Math.pow(1 + r, y) + sip * factor;
                        chartPoints.push({
                            label: (curAge + y) + "y",
                            growth: corp,
                            invest: curInvest + sip * m
                        });
                    }

                    return {
                        primaryLabel: "TARGET FIRE NUMBER",
                        primaryVal: formatCompactINR(targetFireNumber),
                        primaryUnit: "",
                        primaryTagline: "Enables perpetual 4% safe withdrawal for financial freedom",
                        secondary: [
                            { title: "ESTIMATED FIRE AGE", val: fireAge + " Years" },
                            { title: "YEARS TO FIRE", val: fireYears + " Years" },
                            { title: "CURRENT SAVINGS", val: formatCompactINR(curInvest) },
                            { title: "MONTHLY SIP", val: formatINR(sip) }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "child-edu",
                num: "04",
                name: "CHILD EDUCATION",
                fullName: "CHILD EDUCATION CALCULATOR",
                benefit: "Plan today's investment for tomorrow's education.",
                headline: "Plan Today for Their Tomorrow.",
                subtext: "Beat rising college inflation and ensure world-class education for your child.",
                inputs: [
                    {
                        id: "childAge",
                        label: "Child's Current Age",
                        type: "slider",
                        min: 0,
                        max: 15,
                        step: 1,
                        default: 3,
                        suffix: " Yrs"
                    },
                    {
                        id: "eduAge",
                        label: "Higher Education Age",
                        type: "slider",
                        min: 15,
                        max: 24,
                        step: 1,
                        default: 18,
                        suffix: " Yrs"
                    },
                    {
                        id: "currentCost",
                        label: "Current Cost of Course",
                        type: "slider",
                        min: 300000,
                        max: 15000000,
                        step: 50000,
                        default: 3000000,
                        prefix: "₹"
                    },
                    {
                        id: "inflation",
                        label: "Education Inflation",
                        type: "slider",
                        min: 6,
                        max: 15,
                        step: 0.5,
                        default: 10,
                        suffix: "%"
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected Return",
                        type: "slider",
                        min: 8,
                        max: 16,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    },
                    {
                        id: "existingFund",
                        label: "Existing Education Fund",
                        type: "slider",
                        min: 0,
                        max: 5000000,
                        step: 25000,
                        default: 200000,
                        prefix: "₹"
                    }
                ],
                calculate: function(v) {
                    const cAge = parseNum(v.childAge);
                    let eAge = parseNum(v.eduAge);
                    if (eAge <= cAge) eAge = cAge + 1;
                    const yrs = eAge - cAge;

                    const cost = parseNum(v.currentCost);
                    const inf = parseNum(v.inflation) / 100;
                    const ret = parseNum(v.expectedReturn) / 100;
                    const existing = parseNum(v.existingFund);

                    const futureEduCost = cost * Math.pow(1 + inf, yrs);
                    const existingFV = existing * Math.pow(1 + ret, yrs);
                    const netRequired = Math.max(0, futureEduCost - existingFV);

                    const months = yrs * 12;
                    const mRate = ret / 12;
                    let requiredSip = 0;
                    if (mRate > 0 && months > 0 && netRequired > 0) {
                        const factor = (Math.pow(1 + mRate, months) - 1) / mRate * (1 + mRate);
                        requiredSip = netRequired / factor;
                    }

                    const totalInvested = existing + (requiredSip * months);
                    const wealthCreated = Math.max(0, futureEduCost - totalInvested);

                    const chartPoints = [];
                    const steps = Math.min(months, 30);
                    for (let i = 0; i <= steps; i++) {
                        const m = (months / steps) * i;
                        const factor = m > 0 ? (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate) : 0;
                        const growth = existing * Math.pow(1 + ret, m / 12) + requiredSip * factor;
                        chartPoints.push({
                            label: (cAge + m / 12).toFixed(0) + "y",
                            growth: growth,
                            invest: existing + requiredSip * m
                        });
                    }

                    return {
                        primaryLabel: "REQUIRED MONTHLY SIP",
                        primaryVal: formatINR(requiredSip) + " ",
                        primaryUnit: "/ month",
                        primaryTagline: "To build " + formatCompactINR(futureEduCost) + " by child's age " + eAge,
                        secondary: [
                            { title: "FUTURE EDUCATION COST", val: formatCompactINR(futureEduCost) },
                            { title: "TOTAL INVESTMENT", val: formatCompactINR(totalInvested) },
                            { title: "WEALTH CREATED", val: formatCompactINR(wealthCreated) },
                            { title: "HORIZON TO ADMISSION", val: yrs + " Years" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "dream-vacation",
                num: "05",
                name: "DREAM VACATION",
                fullName: "DREAM VACATION CALCULATOR",
                benefit: "Put a number on your next big escape.",
                headline: "Put a Number on the Dream.",
                subtext: "Calculate the exact SIP required to fund your dream luxury trip with systematic savings.",
                inputs: [
                    {
                        id: "currentCost",
                        label: "Current Holiday Cost",
                        type: "slider",
                        min: 50000,
                        max: 3000000,
                        step: 25000,
                        default: 400000,
                        prefix: "₹"
                    },
                    {
                        id: "years",
                        label: "Years to Travel",
                        type: "slider",
                        min: 1,
                        max: 10,
                        step: 1,
                        default: 3,
                        suffix: " Yrs"
                    },
                    {
                        id: "inflation",
                        label: "Travel Inflation",
                        type: "slider",
                        min: 4,
                        max: 12,
                        step: 0.5,
                        default: 7,
                        suffix: "%"
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected Short-Term Return",
                        type: "slider",
                        min: 6,
                        max: 14,
                        step: 0.5,
                        default: 10,
                        suffix: "%"
                    }
                ],
                calculate: function(v) {
                    const cost = parseNum(v.currentCost);
                    const yrs = parseNum(v.years);
                    const inf = parseNum(v.inflation) / 100;
                    const ret = parseNum(v.expectedReturn) / 100;

                    const futureCost = cost * Math.pow(1 + inf, yrs);
                    const months = yrs * 12;
                    const mRate = ret / 12;

                    let requiredSip = 0;
                    if (mRate > 0 && months > 0) {
                        const factor = (Math.pow(1 + mRate, months) - 1) / mRate * (1 + mRate);
                        requiredSip = futureCost / factor;
                    }

                    const totalInvested = requiredSip * months;
                    const wealthCreated = Math.max(0, futureCost - totalInvested);

                    const chartPoints = [];
                    const steps = Math.min(months, 24);
                    for (let i = 0; i <= steps; i++) {
                        const m = (months / steps) * i;
                        const factor = m > 0 ? (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate) : 0;
                        chartPoints.push({
                            label: (m / 12).toFixed(1) + "y",
                            growth: requiredSip * factor,
                            invest: requiredSip * m
                        });
                    }

                    return {
                        primaryLabel: "REQUIRED MONTHLY SIP",
                        primaryVal: formatINR(requiredSip) + " ",
                        primaryUnit: "/ month",
                        primaryTagline: "To accumulate " + formatCompactINR(futureCost) + " in " + yrs + " years",
                        secondary: [
                            { title: "FUTURE TRAVEL COST", val: formatCompactINR(futureCost) },
                            { title: "TOTAL INVESTMENT", val: formatCompactINR(totalInvested) },
                            { title: "WEALTH CREATED", val: formatCompactINR(wealthCreated) },
                            { title: "TIME TO DEPARTURE", val: yrs + " Years" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "sip-swp",
                num: "06",
                name: "SIP + SWP",
                fullName: "SIP + SWP CALCULATOR",
                benefit: "Build your corpus. Then create an income.",
                headline: "Build Wealth. Then Make It Work for You.",
                subtext: "Accumulate wealth via SIP and generate steady monthly income through SWP.",
                inputs: [
                    {
                        id: "monthlySip",
                        label: "Stage 01: Monthly SIP",
                        type: "slider",
                        min: 5000,
                        max: 200000,
                        step: 2500,
                        default: 25000,
                        prefix: "₹"
                    },
                    {
                        id: "accumYears",
                        label: "Accumulation Horizon",
                        type: "slider",
                        min: 3,
                        max: 30,
                        step: 1,
                        default: 15,
                        suffix: " Yrs"
                    },
                    {
                        id: "accumReturn",
                        label: "SIP Return Rate",
                        type: "slider",
                        min: 8,
                        max: 16,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    },
                    {
                        id: "monthlySwp",
                        label: "Stage 02: Monthly SWP Payout",
                        type: "slider",
                        min: 10000,
                        max: 300000,
                        step: 5000,
                        default: 55000,
                        prefix: "₹"
                    },
                    {
                        id: "withYears",
                        label: "Withdrawal Duration",
                        type: "slider",
                        min: 5,
                        max: 30,
                        step: 1,
                        default: 15,
                        suffix: " Yrs"
                    },
                    {
                        id: "postReturn",
                        label: "SWP Return Rate",
                        type: "slider",
                        min: 6,
                        max: 12,
                        step: 0.5,
                        default: 8,
                        suffix: "%"
                    }
                ],
                calculate: function(v) {
                    const sip = parseNum(v.monthlySip);
                    const aYrs = parseNum(v.accumYears);
                    const aRet = parseNum(v.accumReturn) / 100;
                    const swp = parseNum(v.monthlySwp);
                    const wYrs = parseNum(v.withYears);
                    const wRet = parseNum(v.postReturn) / 100;

                    // Phase 1: SIP Accumulation
                    const aMonths = aYrs * 12;
                    const aMRate = aRet / 12;
                    const corpusCreated = sip * ((Math.pow(1 + aMRate, aMonths) - 1) / aMRate) * (1 + aMRate);

                    // Phase 2: SWP Decumulation
                    const wMonths = wYrs * 12;
                    const wMRate = wRet / 12;
                    let remaining = corpusCreated;

                    for (let m = 1; m <= wMonths; m++) {
                        remaining = remaining * (1 + wMRate) - swp;
                        if (remaining <= 0) {
                            remaining = 0;
                            break;
                        }
                    }

                    const totalWithdrawals = swp * wMonths;

                    // Chart combines 2 stages
                    const chartPoints = [];
                    // Accumulation points
                    for (let y = 0; y <= aYrs; y += Math.max(1, Math.floor(aYrs / 6))) {
                        const m = y * 12;
                        const factor = m > 0 ? (Math.pow(1 + aMRate, m) - 1) / aMRate * (1 + aMRate) : 0;
                        chartPoints.push({
                            label: "Y" + y,
                            growth: sip * factor,
                            invest: sip * m
                        });
                    }
                    // SWP points
                    let simBal = corpusCreated;
                    for (let y = 1; y <= wYrs; y += Math.max(1, Math.floor(wYrs / 6))) {
                        for (let m = 1; m <= 12; m++) {
                            simBal = simBal * (1 + wMRate) - swp;
                            if (simBal < 0) simBal = 0;
                        }
                        chartPoints.push({
                            label: "W" + y,
                            growth: simBal,
                            invest: corpusCreated
                        });
                    }

                    return {
                        primaryLabel: "CORPUS CREATED (STAGE 01)",
                        primaryVal: formatCompactINR(corpusCreated),
                        primaryUnit: "",
                        primaryTagline: "Generates " + formatINR(swp) + " / month for " + wYrs + " years",
                        secondary: [
                            { title: "MONTHLY SWP PAYOUT", val: formatINR(swp) },
                            { title: "TOTAL WITHDRAWALS", val: formatCompactINR(totalWithdrawals) },
                            { title: "REMAINING CORPUS", val: formatCompactINR(remaining) },
                            { title: "TOTAL SIP INVESTED", val: formatCompactINR(sip * aMonths) }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "step-up-sip",
                num: "07",
                name: "STEP-UP SIP",
                fullName: "STEP-UP SIP CALCULATOR",
                benefit: "Increase your SIP as your income grows.",
                headline: "Let Your SIP Grow With Your Income.",
                subtext: "See how increasing your SIP annually by 10% multiplies your wealth creation exponentially.",
                inputs: [
                    {
                        id: "startingSip",
                        label: "Starting Monthly SIP",
                        type: "slider",
                        min: 2000,
                        max: 100000,
                        step: 1000,
                        default: 15000,
                        prefix: "₹"
                    },
                    {
                        id: "annualStepUp",
                        label: "Annual Step-Up",
                        type: "slider",
                        min: 0,
                        max: 30,
                        step: 1,
                        default: 10,
                        suffix: "%",
                        hasAmountPair: true,
                        pairBaseId: "startingSip"
                    },
                    {
                        id: "duration",
                        label: "Investment Duration",
                        type: "slider",
                        min: 3,
                        max: 30,
                        step: 1,
                        default: 15,
                        suffix: " Yrs"
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected Return",
                        type: "slider",
                        min: 8,
                        max: 18,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    }
                ],
                calculate: function(v) {
                    const baseSip = parseNum(v.startingSip);
                    const stepUpRate = parseNum(v.annualStepUp) / 100;
                    const yrs = parseNum(v.duration);
                    const ret = parseNum(v.expectedReturn) / 100;

                    const mRate = ret / 12;
                    let stepUpCorpus = 0;
                    let stepUpInvested = 0;
                    let regularCorpus = 0;
                    const regInvested = baseSip * yrs * 12;

                    // Calculate regular SIP
                    const totalMonths = yrs * 12;
                    regularCorpus = baseSip * ((Math.pow(1 + mRate, totalMonths) - 1) / mRate) * (1 + mRate);

                    // Step-up month-by-month compounding
                    const chartPoints = [];
                    for (let y = 1; y <= yrs; y++) {
                        const currentYearSip = baseSip * Math.pow(1 + stepUpRate, y - 1);
                        for (let m = 1; m <= 12; m++) {
                            stepUpCorpus = (stepUpCorpus + currentYearSip) * (1 + mRate);
                            stepUpInvested += currentYearSip;
                        }
                        chartPoints.push({
                            label: y + "y",
                            growth: stepUpCorpus,
                            invest: stepUpInvested
                        });
                    }

                    const extraWealth = Math.max(0, stepUpCorpus - regularCorpus);

                    return {
                        primaryLabel: "STEP-UP FINAL CORPUS",
                        primaryVal: formatCompactINR(stepUpCorpus),
                        primaryUnit: "",
                        primaryTagline: "+" + formatCompactINR(extraWealth) + " extra wealth vs a regular fixed SIP",
                        secondary: [
                            { title: "TOTAL INVESTED", val: formatCompactINR(stepUpInvested) },
                            { title: "WEALTH CREATED", val: formatCompactINR(stepUpCorpus - stepUpInvested) },
                            { title: "REGULAR SIP CORPUS", val: formatCompactINR(regularCorpus) },
                            { title: "EXTRA WEALTH GAINED", val: formatCompactINR(extraWealth) }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "first-1-crore",
                num: "08",
                name: "MY FIRST ₹1 CRORE",
                fullName: "MY FIRST ₹1 CRORE CALCULATOR",
                benefit: "See how long it could take to reach ₹1 Crore.",
                headline: "How Long to Your First ₹1 Crore?",
                subtext: "Track your compounding milestones and discover the fastest path to eight-figure wealth.",
                inputs: [
                    {
                        id: "monthlySip",
                        label: "Monthly SIP",
                        type: "slider",
                        min: 2000,
                        max: 100000,
                        step: 1000,
                        default: 20000,
                        prefix: "₹"
                    },
                    {
                        id: "expectedReturn",
                        label: "Expected Return",
                        type: "slider",
                        min: 8,
                        max: 18,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    },
                    {
                        id: "existingInvestment",
                        label: "Existing Investments",
                        type: "slider",
                        min: 0,
                        max: 5000000,
                        step: 50000,
                        default: 200000,
                        prefix: "₹"
                    }
                ],
                calculate: function(v) {
                    const sip = parseNum(v.monthlySip);
                    const ret = parseNum(v.expectedReturn) / 100;
                    const existing = parseNum(v.existingInvestment);
                    const target = 10000000; // 1 Crore

                    const mRate = ret / 12;
                    let months = 0;
                    let currentVal = existing;

                    while (currentVal < target && months < 600) {
                        months++;
                        currentVal = (currentVal + sip) * (1 + mRate);
                    }

                    const years = Math.floor(months / 12);
                    const remMonths = months % 12;
                    const totalInvested = existing + sip * months;
                    const wealthCreated = target - totalInvested;

                    // Required SIP to reach in 10 yrs
                    const tenYrMonths = 120;
                    const factor10 = (Math.pow(1 + mRate, tenYrMonths) - 1) / mRate * (1 + mRate);
                    const existingFV10 = existing * Math.pow(1 + ret, 10);
                    const sipFor10Yrs = Math.max(0, (target - existingFV10) / factor10);

                    const chartPoints = [];
                    const milestones = [
                        { name: "₹10L", val: 1000000 },
                        { name: "₹25L", val: 2500000 },
                        { name: "₹50L", val: 5000000 },
                        { name: "₹75L", val: 7500000 },
                        { name: "₹1 Cr", val: 10000000 }
                    ];

                    let simBal = existing;
                    for (let m = 1; m <= months; m++) {
                        simBal = (simBal + sip) * (1 + mRate);
                        if (m % Math.max(1, Math.floor(months / 10)) === 0 || m === months) {
                            chartPoints.push({
                                label: (m / 12).toFixed(1) + "y",
                                growth: simBal,
                                invest: existing + sip * m
                            });
                        }
                    }

                    return {
                        primaryLabel: "TIME TO REACH ₹1 CRORE",
                        primaryVal: years + " Yrs " + (remMonths > 0 ? remMonths + " Mo" : ""),
                        primaryUnit: "",
                        primaryTagline: "Target 8-figure milestone of ₹1,00,00,000",
                        secondary: [
                            { title: "TOTAL AMOUNT INVESTED", val: formatCompactINR(totalInvested) },
                            { title: "WEALTH CREATED", val: formatCompactINR(wealthCreated) },
                            { title: "SIP TO REACH IN 10 YRS", val: formatINR(sipFor10Yrs) },
                            { title: "TOTAL MONTHS", val: months + " Months" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "loan-emi",
                num: "09",
                name: "LOAN & DEBT EMI",
                fullName: "LOAN & DEBT EMI CALCULATOR",
                benefit: "Understand the real cost of your loan.",
                headline: "Know the True Cost of Your Debt.",
                subtext: "Calculate your monthly EMI, total interest liability, and loan repayment breakdown.",
                inputs: [
                    {
                        id: "loanAmount",
                        label: "Loan Amount",
                        type: "slider",
                        min: 100000,
                        max: 50000000,
                        step: 50000,
                        default: 5000000,
                        prefix: "₹"
                    },
                    {
                        id: "interestRate",
                        label: "Interest Rate (p.a.)",
                        type: "slider",
                        min: 6,
                        max: 18,
                        step: 0.1,
                        default: 8.5,
                        suffix: "%"
                    },
                    {
                        id: "tenureYears",
                        label: "Loan Tenure",
                        type: "slider",
                        min: 1,
                        max: 30,
                        step: 1,
                        default: 20,
                        suffix: " Yrs"
                    }
                ],
                calculate: function(v) {
                    const principal = parseNum(v.loanAmount);
                    const rate = parseNum(v.interestRate) / 100;
                    const yrs = parseNum(v.tenureYears);

                    const mRate = rate / 12;
                    const months = yrs * 12;

                    const emi = principal * mRate * (Math.pow(1 + mRate, months) / (Math.pow(1 + mRate, months) - 1));
                    const totalRepayment = emi * months;
                    const totalInterest = totalRepayment - principal;

                    const chartPoints = [];
                    let balance = principal;
                    for (let m = 1; m <= months; m++) {
                        const interestPart = balance * mRate;
                        const principalPart = emi - interestPart;
                        balance = Math.max(0, balance - principalPart);

                        if (m % 12 === 0 || m === months) {
                            chartPoints.push({
                                label: (m / 12) + "y",
                                growth: totalRepayment - (emi * m),
                                invest: balance
                            });
                        }
                    }

                    return {
                        primaryLabel: "MONTHLY EMI OUTFLOW",
                        primaryVal: formatINR(emi) + " ",
                        primaryUnit: "/ month",
                        primaryTagline: "Principal: " + formatCompactINR(principal) + " | Interest: " + formatCompactINR(totalInterest),
                        secondary: [
                            { title: "TOTAL INTEREST PAYABLE", val: formatCompactINR(totalInterest) },
                            { title: "TOTAL REPAYMENT", val: formatCompactINR(totalRepayment) },
                            { title: "PRINCIPAL AMOUNT", val: formatCompactINR(principal) },
                            { title: "LOAN TENURE", val: yrs + " Years" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "earn-back-emi",
                num: "10",
                name: "EARN BACK EMI",
                fullName: "EARN BACK EMI CALCULATOR",
                benefit: "See the earning power behind your EMI.",
                headline: "Know What Your EMI Really Costs You.",
                subtext: "Discover how starting a small parallel SIP can recover 100% of your loan interest cost.",
                inputs: [
                    {
                        id: "monthlyEmi",
                        label: "Monthly EMI",
                        type: "slider",
                        min: 5000,
                        max: 300000,
                        step: 2500,
                        default: 43400,
                        prefix: "₹"
                    },
                    {
                        id: "loanTenure",
                        label: "Loan Tenure",
                        type: "slider",
                        min: 1,
                        max: 30,
                        step: 1,
                        default: 20,
                        suffix: " Yrs"
                    },
                    {
                        id: "expectedReturn",
                        label: "SIP Return Rate",
                        type: "slider",
                        min: 8,
                        max: 16,
                        step: 0.5,
                        default: 12,
                        suffix: "%"
                    }
                ],
                calculate: function(v) {
                    const emi = parseNum(v.monthlyEmi);
                    const yrs = parseNum(v.loanTenure);
                    const ret = parseNum(v.expectedReturn) / 100;

                    const months = yrs * 12;
                    const totalEmiPaid = emi * months;
                    const approxInterest = totalEmiPaid * 0.52; // approx 52% of total outflow is interest on 20y home loan

                    // Required SIP to earn back total interest
                    const mRate = ret / 12;
                    const factor = (Math.pow(1 + mRate, months) - 1) / mRate * (1 + mRate);
                    const requiredParallelSip = approxInterest / factor;

                    // If user invests just 15% of EMI as SIP
                    const sip15 = emi * 0.15;
                    const wealthCreated15 = sip15 * factor;

                    const chartPoints = [];
                    for (let y = 1; y <= yrs; y++) {
                        const m = y * 12;
                        const f = (Math.pow(1 + mRate, m) - 1) / mRate * (1 + mRate);
                        chartPoints.push({
                            label: y + "y",
                            growth: sip15 * f,
                            invest: emi * m
                        });
                    }

                    return {
                        primaryLabel: "SIP NEEDED TO EARN BACK INTEREST",
                        primaryVal: formatINR(requiredParallelSip) + " ",
                        primaryUnit: "/ month",
                        primaryTagline: "Just " + Math.round((requiredParallelSip / emi) * 100) + "% of your EMI recovers your entire interest!",
                        secondary: [
                            { title: "TOTAL EMI OUTFLOW", val: formatCompactINR(totalEmiPaid) },
                            { title: "TOTAL INTEREST BURDEN", val: formatCompactINR(approxInterest) },
                            { title: "15% PARALLEL SIP RETURN", val: formatCompactINR(wealthCreated15) },
                            { title: "NET RECOVERY RATIO", val: "100%+" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            },
            {
                id: "loan-repay",
                num: "11",
                name: "LOAN REPAYMENT",
                fullName: "LOAN REPAYMENT CALCULATOR",
                benefit: "Know how much faster you can become debt-free.",
                headline: "See How Fast You Can Become Debt-Free.",
                subtext: "Accelerate your loan closure and save lakhs in interest with small periodic prepayments.",
                inputs: [
                    {
                        id: "outstandingLoan",
                        label: "Outstanding Loan Amount",
                        type: "slider",
                        min: 200000,
                        max: 30000000,
                        step: 50000,
                        default: 4000000,
                        prefix: "₹"
                    },
                    {
                        id: "interestRate",
                        label: "Interest Rate (p.a.)",
                        type: "slider",
                        min: 6,
                        max: 16,
                        step: 0.1,
                        default: 8.5,
                        suffix: "%"
                    },
                    {
                        id: "remainingTenure",
                        label: "Remaining Tenure",
                        type: "slider",
                        min: 1,
                        max: 25,
                        step: 1,
                        default: 18,
                        suffix: " Yrs"
                    },
                    {
                        id: "extraMonthly",
                        label: "Extra Monthly Prepayment",
                        type: "slider",
                        min: 0,
                        max: 50000,
                        step: 1000,
                        default: 5000,
                        prefix: "₹"
                    },
                    {
                        id: "annualLumpSum",
                        label: "Annual Lump-Sum Prepayment",
                        type: "slider",
                        min: 0,
                        max: 500000,
                        step: 10000,
                        default: 50000,
                        prefix: "₹"
                    }
                ],
                calculate: function(v) {
                    const principal = parseNum(v.outstandingLoan);
                    const rate = parseNum(v.interestRate) / 100;
                    const origYears = parseNum(v.remainingTenure);
                    const extraM = parseNum(v.extraMonthly);
                    const extraY = parseNum(v.annualLumpSum);

                    const mRate = rate / 12;
                    const origMonths = origYears * 12;
                    const baseEmi = principal * mRate * (Math.pow(1 + mRate, origMonths) / (Math.pow(1 + mRate, origMonths) - 1));
                    const origTotalInterest = (baseEmi * origMonths) - principal;

                    // Accelerated schedule
                    let bal = principal;
                    let accelMonths = 0;
                    let accelInterest = 0;

                    while (bal > 0 && accelMonths < origMonths) {
                        accelMonths++;
                        const intPart = bal * mRate;
                        accelInterest += intPart;
                        let pay = baseEmi - intPart + extraM;
                        if (accelMonths % 12 === 0) {
                            pay += extraY;
                        }
                        bal = Math.max(0, bal - pay);
                    }

                    const interestSaved = Math.max(0, origTotalInterest - accelInterest);
                    const monthsSaved = Math.max(0, origMonths - accelMonths);
                    const yearsSaved = (monthsSaved / 12).toFixed(1);

                    const chartPoints = [
                        { label: "Start", growth: principal, invest: principal },
                        { label: (accelMonths / 12).toFixed(1) + "y (Prepaid)", growth: 0, invest: principal * 0.4 },
                        { label: origYears + "y (Regular)", growth: 0, invest: 0 }
                    ];

                    return {
                        primaryLabel: "TOTAL INTEREST SAVED",
                        primaryVal: formatCompactINR(interestSaved),
                        primaryUnit: "",
                        primaryTagline: "You become debt-free " + yearsSaved + " years earlier!",
                        secondary: [
                            { title: "YEARS SAVED", val: yearsSaved + " Years" },
                            { title: "REVISED TENURE", val: (accelMonths / 12).toFixed(1) + " Years" },
                            { title: "CURRENT EMI", val: formatINR(baseEmi) },
                            { title: "MONTHS REDUCED", val: monthsSaved + " Months" }
                        ],
                        chartPoints: chartPoints
                    };
                }
            }
        ];

        let activeCalcIndex = 0;
        let currentInputValues = {};

        // DOM elements
        const $toolBadge = $('#calc-tool-badge');
        const $toolHeadline = $('#calc-tool-headline');
        const $toolSubtext = $('#calc-tool-subtext');
        const $inputsWrapper = $('#calc-dynamic-inputs');
        const $primaryLabel = $('#calc-primary-label');
        const $primaryVal = $('#calc-primary-val');
        const $primaryTagline = $('#calc-primary-tagline');
        const $secondaryMetrics = $('#calc-secondary-metrics');
        const $railTrack = $('#calc-rail-track');
        const $categoryFilterBar = $('#calc-page-filter-bar');
        const $chartOverlayVal = $('#calc-chart-overlay-val');
        const $chartOverlayLbl = $('#calc-chart-overlay-lbl');
        const canvas = document.getElementById('calc-growth-canvas');
        const ctx = canvas ? canvas.getContext('2d') : null;

        // Assign icons to calculators
        const calcIcons = {
            "goal-sip": '<i class="fa fa-bullseye"></i>',
            "retirement": '<i class="fa fa-chair"></i>',
            "education": '<i class="fa fa-graduation-cap"></i>',
            "marriage": '<i class="fa fa-ring"></i>',
            "holiday": '<i class="fa fa-plane"></i>',
            "sip-swp": '<i class="fa fa-rupee-sign"></i>',
            "step-up-sip": '<i class="fa fa-chart-line"></i>',
            "first-1-crore": '<i class="fa fa-trophy"></i>',
            "loan-debt": '<i class="fa fa-university"></i>',
            "earn-back-emi": '<i class="fa fa-sync-alt"></i>',
            "loan-repay": '<i class="fa fa-shield-alt"></i>'
        };

        calculators.forEach(c => {
            c.iconHtml = calcIcons[c.id] || '<i class="fa fa-chart-pie"></i>';
        });

        // Detect current page
        const isHomePage = window.location.pathname.endsWith('index.html') || 
                           window.location.pathname.endsWith('/') || 
                           window.location.pathname.split('/').pop() === '';

        // Check URL parameter or hash for requested calculator
        const urlParams = new URLSearchParams(window.location.search);
        const paramCalcId = urlParams.get('calc') || window.location.hash.replace('#', '');

        let initialIdx = 0;
        if (paramCalcId) {
            const foundIdx = calculators.findIndex(c => c.id === paramCalcId);
            if (foundIdx !== -1) {
                initialIdx = foundIdx;
            }
        }
        activeCalcIndex = initialIdx;

        // Render Horizontal Calculator Rail (11 Modules with Icons)
        function renderRail() {
            let railHtml = '';
            for (let copy = 0; copy < 2; copy++) {
                calculators.forEach((calc, idx) => {
                    const isActive = (idx === activeCalcIndex) ? 'active' : '';
                    railHtml += `
                        <div class="calc-rail-card ${isActive}" data-calc-idx="${idx}" data-calc-id="${calc.id}">
                            <div class="calc-rail-card-icon-box">
                                ${calc.iconHtml}
                            </div>
                            <div class="calc-rail-card-info">
                                <span class="calc-rail-num">${calc.num}</span>
                                <div class="calc-rail-name">${calc.name}</div>
                                <p class="calc-rail-benefit">${calc.benefit}</p>
                            </div>
                            <i class="fa fa-arrow-right calc-rail-icon"></i>
                        </div>
                    `;
                });
            }
            $railTrack.html(railHtml);

            // Bind click events on rail cards
            $railTrack.find('.calc-rail-card').on('click', function(e) {
                const targetIdx = parseInt($(this).data('calc-idx'), 10);
                const targetId = $(this).data('calc-id');

                if (isHomePage) {
                    window.location.href = `calculators.html?calc=${targetId}#financial-calculators`;
                } else {
                    if (targetIdx !== activeCalcIndex) {
                        switchCalculator(targetIdx);
                    }
                }
            });
        }

        // Bind Rail Nav Prev / Next buttons
        $('#calc-rail-prev').on('click', function() {
            const $marquee = $('#calc-rail-marquee');
            $marquee.animate({ scrollLeft: $marquee.scrollLeft() - 260 }, 300);
        });

        $('#calc-rail-next').on('click', function() {
            const $marquee = $('#calc-rail-marquee');
            $marquee.animate({ scrollLeft: $marquee.scrollLeft() + 260 }, 300);
        });

        // Bind Category Filter Pills on Dedicated Calculators Page
        if ($categoryFilterBar.length) {
            $categoryFilterBar.find('.calc-category-btn').on('click', function() {
                const targetId = $(this).data('calc-id');
                const targetIdx = calculators.findIndex(c => c.id === targetId);
                if (targetIdx !== -1 && targetIdx !== activeCalcIndex) {
                    switchCalculator(targetIdx);
                }
            });
        }

        // Draw Canvas Chart Visualisation (Matching Exact Blue Growth & Orange Investment Baseline)
        function drawChart(points) {
            if (!canvas || !ctx || !points || points.length === 0) return;

            // Retina display scaling
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const width = rect.width;
            const height = rect.height;
            const padL = 34;
            const padR = 12;
            const padT = 10;
            const padB = 16;
            const graphW = width - padL - padR;
            const graphH = height - padT - padB;

            ctx.clearRect(0, 0, width, height);

            // Find Max Value
            let maxVal = 0;
            points.forEach(p => {
                if (p.growth > maxVal) maxVal = p.growth;
                if (p.invest > maxVal) maxVal = p.invest;
            });
            if (maxVal === 0) maxVal = 1000;

            // Draw Subtle Horizontal Gridlines & Y-Axis Labels
            ctx.strokeStyle = "rgba(11, 22, 40, 0.06)";
            ctx.lineWidth = 1;
            ctx.fillStyle = "#94A3B8";
            ctx.font = "9px Inter, sans-serif";
            ctx.textAlign = "right";

            for (let i = 0; i <= 3; i++) {
                const y = padT + (graphH / 3) * i;
                const gridVal = maxVal * (1 - (i / 3));
                let label = "";
                if (gridVal >= 10000000) label = "₹ " + (gridVal / 10000000).toFixed(1) + " Cr";
                else if (gridVal >= 100000) label = "₹ " + Math.round(gridVal / 100000) + " L";
                else if (gridVal === 0) label = "0";
                else label = "₹ " + Math.round(gridVal);

                ctx.beginPath();
                ctx.moveTo(padL, y);
                ctx.lineTo(width - padR, y);
                ctx.stroke();

                ctx.fillText(label, padL - 4, y + 3);
            }

            // Function to get XY coords
            function getXY(idx, val) {
                const x = padL + (idx / (points.length - 1)) * graphW;
                const y = padT + graphH - (val / maxVal) * graphH;
                return { x, y };
            }

            // 1. Draw Investment Baseline (Orange #E86014 with dots)
            ctx.beginPath();
            points.forEach((p, i) => {
                const pt = getXY(i, p.invest);
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            });
            ctx.strokeStyle = "#E86014";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw small orange nodes along investment line
            const nodeInterval = Math.max(1, Math.floor(points.length / 4));
            for (let i = 0; i < points.length; i += nodeInterval) {
                const pt = getXY(i, points[i].invest);
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#E86014";
                ctx.fill();
            }

            // 2. Draw Growth Area Gradient (Soft Blue)
            const gradient = ctx.createLinearGradient(0, padT, 0, height - padB);
            gradient.addColorStop(0, "rgba(2, 132, 199, 0.18)");
            gradient.addColorStop(1, "rgba(2, 132, 199, 0.01)");

            ctx.beginPath();
            points.forEach((p, i) => {
                const pt = getXY(i, p.growth);
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            });
            ctx.lineTo(width - padR, height - padB);
            ctx.lineTo(padL, height - padB);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            // 3. Draw Growth Solid Line (Vibrant Blue #0284C7)
            ctx.beginPath();
            points.forEach((p, i) => {
                const pt = getXY(i, p.growth);
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            });
            ctx.strokeStyle = "#0284C7";
            ctx.lineWidth = 3;
            ctx.stroke();

            // 4. Draw Growth End Milestone Node (Blue dot with white border)
            if (points.length > 0) {
                const lastPt = getXY(points.length - 1, points[points.length - 1].growth);
                ctx.beginPath();
                ctx.arc(lastPt.x, lastPt.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#0284C7";
                ctx.fill();
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw X-axis labels
            ctx.fillStyle = "#94A3B8";
            ctx.font = "9.5px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Today", padL, height - 4);

            if (points.length > 2) {
                const midIdx1 = Math.floor(points.length / 3);
                const midIdx2 = Math.floor((points.length * 2) / 3);
                const pt1 = getXY(midIdx1, 0);
                const pt2 = getXY(midIdx2, 0);
                ctx.fillText(points[midIdx1].label || "", pt1.x, height - 4);
                ctx.fillText(points[midIdx2].label || "", pt2.x, height - 4);
            }

            const endText = points[points.length - 1].label || "Goal";
            ctx.textAlign = "right";
            ctx.fillText(endText, width - padR, height - 4);
        }

        // Render Active Calculator Inputs & Sync State
        function renderActiveCalculator(anim = false) {
            const calc = calculators[activeCalcIndex];

            // Update Header Meta
            $toolBadge.text(calc.num + " / " + calc.fullName);
            $toolHeadline.text(calc.headline);
            $toolSubtext.text(calc.subtext);

            // Initialize values if not set
            currentInputValues = {};
            let inputsHtml = '';

            calc.inputs.forEach(inp => {
                currentInputValues[inp.id] = inp.default;

                if (inp.type === "pills" || inp.type === "dropdown") {
                    let optionsHtml = '';
                    const defaultOptions = inp.options || ["🏠 Buy a House", "🎓 Child Education", "🏖️ Dream Vacation", "💍 Wedding", "💼 Wealth Creation", "🌟 Other"];
                    defaultOptions.forEach(opt => {
                        const isSel = (opt === inp.default) ? 'selected' : '';
                        optionsHtml += `<option value="${opt}" ${isSel}>${opt}</option>`;
                    });
                    inputsHtml += `
                        <div class="calc-input-group">
                            <label class="calc-input-label d-block mb-1">${inp.label}</label>
                            <div class="calc-goal-select-wrapper">
                                <select class="calc-goal-dropdown" data-group="${inp.id}">
                                    ${optionsHtml}
                                </select>
                            </div>
                        </div>
                    `;
                } else if (inp.type === "slider") {
                    const formattedInitial = inp.prefix ? (inp.prefix + " " + Math.round(inp.default).toLocaleString('en-IN')) : (inp.default + (inp.suffix || ''));
                    
                    let valBoxHtml = `
                        <div class="calc-input-val-box">
                            <input type="text" id="val-${inp.id}" value="${formattedInitial}" data-target="${inp.id}" />
                        </div>
                    `;

                    if (inp.hasAmountPair) {
                        const baseVal = parseNum(currentInputValues[inp.pairBaseId] || 15000);
                        const amountVal = Math.round((baseVal * inp.default) / 100);
                        valBoxHtml = `
                            <div class="calc-dual-box-group">
                                <div class="calc-input-val-box" title="Step-Up Percentage (%)">
                                    <input type="text" id="val-${inp.id}" value="${formattedInitial}" data-target="${inp.id}" />
                                </div>
                                <div class="calc-input-val-box calc-input-val-box-alt" title="Step-Up Amount (₹)">
                                    <input type="text" id="val-${inp.id}-amount" value="₹ ${amountVal.toLocaleString('en-IN')}" data-target="${inp.id}-amount" data-pair="${inp.id}" data-base="${inp.pairBaseId}" />
                                </div>
                            </div>
                        `;
                    }

                    inputsHtml += `
                        <div class="calc-input-group" data-input-id="${inp.id}">
                            <div class="calc-input-header">
                                <label class="calc-input-label" for="inp-${inp.id}">${inp.label}</label>
                                ${valBoxHtml}
                            </div>
                            <div class="calc-slider-wrapper">
                                <input type="range" class="calc-range-slider" id="inp-${inp.id}"
                                    min="${inp.min}" max="${inp.max}" step="${inp.step}" value="${inp.default}" data-input-id="${inp.id}" />
                                <div class="calc-slider-meta">
                                    <span>${inp.prefix || ''}${inp.min.toLocaleString('en-IN')}${inp.suffix || ''}</span>
                                    <span>${inp.helper || ''}</span>
                                    <span>${inp.prefix || ''}${inp.max.toLocaleString('en-IN')}${inp.suffix || ''}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });

            if (anim) {
                $inputsWrapper.css('opacity', 0);
                setTimeout(() => {
                    $inputsWrapper.html(inputsHtml);
                    bindInputEvents(calc);
                    updateCalculation();
                    $inputsWrapper.animate({ opacity: 1 }, 250);
                }, 150);
            } else {
                $inputsWrapper.html(inputsHtml);
                bindInputEvents(calc);
                updateCalculation();
            }

            // Sync active state in rail cards
            $railTrack.find('.calc-rail-card').removeClass('active');
            $railTrack.find(`.calc-rail-card[data-calc-idx="${activeCalcIndex}"]`).addClass('active');

            // Sync active state in category filter pills if present
            if ($categoryFilterBar.length) {
                $categoryFilterBar.find('.calc-category-btn').removeClass('active');
                $categoryFilterBar.find(`.calc-category-btn[data-calc-id="${calc.id}"]`).addClass('active');
            }
        }

        // Bind interactive events on inputs and sliders
        function bindInputEvents(calc) {
            // Slider drag / input
            $inputsWrapper.find('.calc-range-slider').on('input change', function() {
                const inputId = $(this).data('input-id');
                const rawVal = parseFloat($(this).val());
                currentInputValues[inputId] = rawVal;

                const conf = calc.inputs.find(i => i.id === inputId);
                if (conf) {
                    const formatted = conf.prefix ? (conf.prefix + " " + Math.round(rawVal).toLocaleString('en-IN')) : (rawVal + (conf.suffix || ''));
                    $(`#val-${inputId}`).val(formatted);

                    if (conf.hasAmountPair) {
                        const baseVal = parseNum(currentInputValues[conf.pairBaseId] || 15000);
                        const calculatedAmount = Math.round((baseVal * rawVal) / 100);
                        $(`#val-${inputId}-amount`).val('₹ ' + calculatedAmount.toLocaleString('en-IN'));
                    }
                }

                // If this input is the base for another input (e.g. startingSip for annualStepUp)
                calc.inputs.forEach(otherInp => {
                    if (otherInp.hasAmountPair && otherInp.pairBaseId === inputId) {
                        const currentPct = parseNum(currentInputValues[otherInp.id] || otherInp.default);
                        const calculatedAmount = Math.round((rawVal * currentPct) / 100);
                        $(`#val-${otherInp.id}-amount`).val('₹ ' + calculatedAmount.toLocaleString('en-IN'));
                    }
                });

                updateCalculation();
            });

            // Editable standard text box change
            $inputsWrapper.find('.calc-input-val-box input:not([data-pair])').on('change', function() {
                const inputId = $(this).data('target');
                const parsed = parseNum($(this).val());
                const conf = calc.inputs.find(i => i.id === inputId);
                if (conf) {
                    const clamped = Math.max(conf.min, Math.min(conf.max, parsed));
                    currentInputValues[inputId] = clamped;
                    $(`#inp-${inputId}`).val(clamped);
                    const formatted = conf.prefix ? (conf.prefix + " " + Math.round(clamped).toLocaleString('en-IN')) : (clamped + (conf.suffix || ''));
                    $(this).val(formatted);

                    if (conf.hasAmountPair) {
                        const baseVal = parseNum(currentInputValues[conf.pairBaseId] || 15000);
                        const calculatedAmount = Math.round((baseVal * clamped) / 100);
                        $(`#val-${inputId}-amount`).val('₹ ' + calculatedAmount.toLocaleString('en-IN'));
                    }

                    calc.inputs.forEach(otherInp => {
                        if (otherInp.hasAmountPair && otherInp.pairBaseId === inputId) {
                            const currentPct = parseNum(currentInputValues[otherInp.id] || otherInp.default);
                            const calculatedAmount = Math.round((clamped * currentPct) / 100);
                            $(`#val-${otherInp.id}-amount`).val('₹ ' + calculatedAmount.toLocaleString('en-IN'));
                        }
                    });

                    updateCalculation();
                }
            });

            // Dual paired amount input change (e.g. user enters 5000 into amount box)
            $inputsWrapper.find('.calc-input-val-box input[data-pair]').on('change', function() {
                const pairId = $(this).data('pair');
                const baseId = $(this).data('base');
                const enteredAmount = parseNum($(this).val());
                const baseVal = parseNum(currentInputValues[baseId] || 15000);

                if (baseVal > 0) {
                    let calculatedPct = Math.round(((enteredAmount / baseVal) * 100) * 10) / 10;
                    const conf = calc.inputs.find(i => i.id === pairId);
                    if (conf) {
                        if (calculatedPct > conf.max) {
                            conf.max = Math.ceil(calculatedPct / 10) * 10;
                            $(`#inp-${pairId}`).attr('max', conf.max);
                        }
                        const clampedPct = Math.max(conf.min, Math.min(conf.max, calculatedPct));
                        currentInputValues[pairId] = clampedPct;
                        $(`#inp-${pairId}`).val(clampedPct);
                        $(`#val-${pairId}`).val(clampedPct + (conf.suffix || '%'));
                        $(this).val('₹ ' + Math.round(enteredAmount).toLocaleString('en-IN'));
                        updateCalculation();
                    }
                }
            });

            // Dropdown select change
            $inputsWrapper.find('.calc-goal-dropdown').on('change', function() {
                const group = $(this).data('group');
                const val = $(this).val();
                currentInputValues[group] = val;
                updateCalculation();
            });
        }

        // Perform Calculation and Update View
        function updateCalculation() {
            const calc = calculators[activeCalcIndex];
            const res = calc.calculate(currentInputValues);

            // Update Primary Box
            $primaryLabel.text(res.primaryLabel);
            $primaryVal.html(`${res.primaryVal}<span class="calc-result-unit">${res.primaryUnit}</span>`);
            $primaryTagline.text(res.primaryTagline);

            // Update Secondary Metrics Grid
            let secHtml = '';
            res.secondary.forEach(sec => {
                secHtml += `
                    <div class="col-6 col-sm-3">
                        <div class="calc-metric-item">
                            <div class="calc-metric-val">${sec.val}</div>
                            <div class="calc-metric-title">${sec.title}</div>
                        </div>
                    </div>
                `;
            });
            $secondaryMetrics.html(secHtml);

            // Update Floating Milestone Badge Overlay on Chart
            if ($chartOverlayVal.length && res.secondary.length > 0) {
                $chartOverlayVal.text(res.secondary[0].val);
                $chartOverlayLbl.text(res.secondary[0].title);
            }

            // Redraw Chart
            drawChart(res.chartPoints);
        }

        // Switch Active Calculator
        function switchCalculator(idx) {
            if (idx < 0 || idx >= calculators.length) return;
            activeCalcIndex = idx;
            renderActiveCalculator(true);

            // Smooth scroll into view if on mobile/desktop
            const topOffset = $calcContainer.offset().top - 80;
            if (window.scrollY > topOffset + 300 || window.scrollY < topOffset - 200) {
                $('html, body').animate({ scrollTop: topOffset }, 400);
            }
        }

        // Handle window resize for canvas redraw
        $(window).on('resize', function() {
            updateCalculation();
        });

        // Initialize Rail & Active Calculator
        renderRail();
        renderActiveCalculator(false);
    })();

})(jQuery);