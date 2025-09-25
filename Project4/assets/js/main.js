$(document).ready(function () {
    // Artist modal functionality for both index.html and schedule.html
    $('#artistModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var artistNumber = button.data('artist'); // Extract info from data-* attributes

        // Update modal content
        var modal = $(this);
        modal.find('#modalArtistImage').attr('src', 'assets/images/artists/artist-' + artistNumber + '.jpg');

        // Artist data with real band names
        var artistData = {
            1: {
                name: 'Slipknot',
                bio: 'Slipknot is an American heavy metal band from Des Moines, Iowa, known for their aggressive music, distinctive masks and costumes, and intense live performances. Formed in 1995, they are considered pioneers of the nu-metal and alternative metal genres.',
                date: 'Saturday, 8:00 PM',
                stage: 'Main Stage',
                genre: 'Nu-Metal / Alternative Metal',
                image: 'assets/images/artists/artist-1.jpg'
            },
            2: {
                name: 'Sleep Token',
                bio: 'Sleep Token is a British progressive rock band known for their mysterious identity, atmospheric soundscapes, and emotional depth. Their music combines elements of progressive rock, metal, and ambient music with cryptic lyrics and visual storytelling.',
                date: 'Friday, 7:30 PM',
                stage: 'Main Stage',
                genre: 'Progressive Rock / Atmospheric',
                image: 'assets/images/artists/artist-2.jpg'
            },
            3: {
                name: 'Jacob Collier',
                bio: 'Jacob Collier is a British multi-instrumentalist, singer, and songwriter known for his innovative approach to music, complex harmonies, and YouTube collaborations. He has won multiple Grammy Awards for his unique arrangements and vocal techniques.',
                date: 'Saturday, 6:00 PM',
                stage: 'Main Stage',
                genre: 'Jazz / Pop / R&B',
                image: 'assets/images/artists/artist-3.jpg'
            },
            4: {
                name: 'Arctic Monkeys',
                bio: 'Arctic Monkeys is an English rock band formed in Sheffield in 2002. They are known for their distinctive sound that has evolved from garage rock to indie rock and pop, with Alex Turner\'s distinctive vocals and witty lyrics.',
                date: 'Friday, 9:00 PM',
                stage: 'Main Stage',
                genre: 'Indie Rock / Alternative Rock',
                image: 'assets/images/artists/artist-4.jpg'
            },
            5: {
                name: 'Dream Theater',
                bio: 'Dream Theater is an American progressive metal band known for their complex compositions, lengthy instrumental sections, and concept albums. They are considered one of the leading bands in the progressive metal genre.',
                date: 'Sunday, 8:30 PM',
                stage: 'Main Stage',
                genre: 'Progressive Metal / Progressive Rock',
                image: 'assets/images/artists/artist-5.jpg'
            },
            6: {
                name: 'Pentatonix',
                bio: 'Pentatonix is an American a cappella group known for their innovative vocal arrangements and covers of popular songs. They have won multiple Grammy Awards and are known for their tight harmonies and beatboxing.',
                date: 'Saturday, 4:30 PM',
                stage: 'Main Stage',
                genre: 'A Cappella / Pop',
                image: 'assets/images/artists/artist-6.jpg'
            },
            7: {
                name: 'Avenged Sevenfold',
                bio: 'Avenged Sevenfold is an American heavy metal band from Huntington Beach, California. Known for their diverse musical style that incorporates elements of metalcore, hard rock, and progressive metal.',
                date: 'Friday, 6:00 PM',
                stage: 'Main Stage',
                genre: 'Heavy Metal / Metalcore',
                image: 'assets/images/artists/artist-7.jpg'
            },
            8: {
                name: 'Green Day',
                bio: 'Green Day is an American punk rock band formed in 1986 by lead vocalist and guitarist Billie Joe Armstrong, bassist Mike Dirnt, and drummer Tré Cool. They are considered one of the most influential punk rock bands.',
                date: 'Sunday, 7:00 PM / Saturday, 8:00 PM',
                stage: 'Main Stage',
                genre: 'Punk Rock / Pop Punk',
                image: 'assets/images/artists/artist-8.jpg'
            },
            9: {
                name: 'Yungblud',
                bio: 'Yungblud is a British rock musician known for his genre-blending music, theatrical performances, and social activism. His music combines elements of rock, pop, and hip-hop with socially conscious lyrics.',
                date: 'Saturday, 2:00 PM',
                stage: 'Main Stage',
                genre: 'Rock / Pop Punk / Alternative',
                image: 'assets/images/artists/artist-9.jpg'
            },
            10: {
                name: 'Stone Sour',
                bio: 'Stone Sour is an American rock band formed by frontman Corey Taylor and guitarist Jim Root. Known for their hard rock and alternative metal sound, often exploring themes of personal struggle and redemption.',
                date: 'Friday, 4:00 PM',
                stage: 'Main Stage',
                genre: 'Hard Rock / Alternative Metal',
                image: 'assets/images/artists/artist-10.jpg'
            },
            11: {
                name: 'Linkin Park',
                bio: 'Linkin Park is an American rock band known for their fusion of heavy metal and hip-hop elements, emotional lyrics, and dynamic live performances. They achieved mainstream success with their debut album "Hybrid Theory".',
                date: 'Sunday, 5:00 PM',
                stage: 'Main Stage',
                genre: 'Nu-Metal / Alternative Rock',
                image: 'assets/images/artists/artist-11.jpg'
            },
            12: {
                name: 'My Chemical Romance',
                bio: 'My Chemical Romance is an American rock band from New Jersey, known for their concept albums, theatrical performances, and influence on the emo and alternative rock scenes. Their music often explores themes of life, death, and human experience.',
                date: 'Saturday, 10:00 PM',
                stage: 'Main Stage',
                genre: 'Emo / Alternative Rock',
                image: 'assets/images/artists/artist-12.jpg'
            },
            13: {
                name: 'Harris Jayaraj',
                bio: 'Harris Jayaraj is a renowned Indian film composer and music producer, known for his innovative compositions in Tamil cinema. He has created memorable soundtracks for numerous blockbuster films and is considered one of the most influential composers in South Indian cinema.',
                date: 'Friday, 2:00 PM',
                stage: 'Main Stage',
                genre: 'Indian Film Music / Fusion',
                image: 'assets/images/artists/artist-13.jpg'
            },
            14: {
                name: 'Disturbed',
                bio: 'Disturbed is an American heavy metal band known for their powerful vocals by David Draiman, heavy riffs, and covers of classic songs. They have achieved significant commercial success with their aggressive sound.',
                date: 'Sunday, 3:00 PM',
                stage: 'Main Stage',
                genre: 'Heavy Metal / Alternative Metal',
                image: 'assets/images/artists/artist-14.jpg'
            },
            15: {
                name: 'Oasis',
                bio: 'Oasis is an English rock band formed in Manchester in 1991. They are one of the most successful and influential bands in British music history, known for their anthemic songs and sibling rivalry between Liam and Noel Gallagher.',
                date: 'Saturday, 12:00 PM',
                stage: 'Main Stage',
                genre: 'Britpop / Alternative Rock',
                image: 'assets/images/artists/artist-15.jpg'
            },
            16: {
                name: 'Red Hot Chili Peppers',
                bio: 'Red Hot Chili Peppers is an American funk rock band formed in Los Angeles in 1983. Known for their energetic live performances, genre-blending music, and the distinctive bass playing of Flea.',
                date: 'Friday, 10:00 PM',
                stage: 'Main Stage',
                genre: 'Funk Rock / Alternative Rock',
                image: 'assets/images/artists/artist-16.jpg'
            }
        };

        if (artistData[artistNumber]) {
            var artist = artistData[artistNumber];
            modal.find('#modalArtistName').text(artist.name);
            modal.find('#modalArtistBio').text(artist.bio);
            modal.find('#modalArtistDate').text(artist.date);
            modal.find('#modalArtistStage').text(artist.stage);
            modal.find('#modalArtistGenre').text(artist.genre);
            modal.find('#modalArtistImage').attr('src', artist.image);
        }
    });

    // Festival Countdown Timer
    function updateCountdown() {
        // Set your festival date here (year, month(0-11), day, hour, minute, second)
        var festivalDate = new Date('2025-09-26T18:00:00'); // September 26, 2025 at 6:00 PM
        var now = new Date();
        var diff = festivalDate - now;

        if (diff > 0) {
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Update the timer display
            if (document.getElementById('days')) {
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
            }
            if (document.getElementById('hours')) {
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            }
            if (document.getElementById('minutes')) {
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            }
            if (document.getElementById('seconds')) {
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }

            // Add animation effect if elements exist
            if (document.querySelectorAll('.timer-unit span').length > 0) {
                document.querySelectorAll('.timer-unit span').forEach(span => {
                    span.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        span.style.transform = 'scale(1)';
                    }, 100);
                });
            }
        } else {
            // Festival has started
            if (document.getElementById('days')) {
                document.getElementById('days').textContent = '00';
            }
            if (document.getElementById('hours')) {
                document.getElementById('hours').textContent = '00';
            }
            if (document.getElementById('minutes')) {
                document.getElementById('minutes').textContent = '00';
            }
            if (document.getElementById('seconds')) {
                document.getElementById('seconds').textContent = '00';
            }

            // Show festival started message if elements exist
            if (document.querySelector('.timer-content h3')) {
                document.querySelector('.timer-content h3').textContent = 'Festival Started!';
            }
            if (document.querySelector('.timer-content p')) {
                document.querySelector('.timer-content p').textContent = 'Enjoy the show!';
            }

            // Clear the interval when festival starts
            if (window.timerInterval) {
                clearInterval(window.timerInterval);
            }
        }
    }

    // Start the timer when page loads
    window.timerInterval = setInterval(updateCountdown, 1000); // Update every second
    updateCountdown(); // Initial call

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Add hover effect to artist cards
    $('.artist-card').hover(
        function () {
            $(this).addClass('shadow-lg');
        },
        function () {
            $(this).removeClass('shadow-lg');
        }
    );

    // Add hover effect to schedule items
    $('.schedule-item').hover(
        function () {
            $(this).addClass('shadow-lg');
        },
        function () {
            $(this).removeClass('shadow-lg');
        }
    );

    // Tab navigation enhancement
    $('.nav-tabs button').on('click', function () {
        var tabId = $(this).attr('data-bs-target');
        $(tabId).addClass('fade-in-up');

        setTimeout(function () {
            $(tabId).removeClass('fade-in-up');
        }, 600);
    });

    // Current time indicator for schedule
    function updateTimeIndicators() {
        var now = new Date();
        var currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        var currentTime = now.getHours() * 60 + now.getMinutes();

        // Highlight current time in schedule
        $('.schedule-item').each(function () {
            var timeText = $(this).find('p').first().text();
            var timeMatch = timeText.match(/(\d{1,2}):(\d{2}) (AM|PM)/);

            if (timeMatch) {
                var hours = parseInt(timeMatch[1]);
                var minutes = parseInt(timeMatch[2]);
                var period = timeMatch[3];

                if (period === 'PM' && hours !== 12) {
                    hours += 12;
                } else if (period === 'AM' && hours === 12) {
                    hours = 0;
                }

                var itemTime = hours * 60 + minutes;

                if (Math.abs(currentTime - itemTime) <= 30) { // Within 30 minutes
                    $(this).addClass('border-warning border-2');
                    $(this).find('h4').addClass('text-warning');
                }
            }
        });
    }

    // Initialize current time indicators
    updateTimeIndicators();

    // Update every minute
    setInterval(updateTimeIndicators, 60000);

    // Mobile menu toggle enhancement
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('collapsed');
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            if (!$('.back-to-top').length) {
                $('body').append('<button class="back-to-top btn btn-primary position-fixed" style="bottom: 20px; right: 20px; z-index: 1000;"><i class="fas fa-arrow-up"></i></button>');
                $('.back-to-top').click(function () {
                    $('html, body').animate({ scrollTop: 0 }, 800);
                });
            }
        } else {
            $('.back-to-top').remove();
        }
    });

    // Lazy loading for images (basic implementation)
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Form validation enhancement (if you add forms later)
    $('form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var isValid = true;

        // Basic validation
        form.find('input[required], textarea[required]').each(function () {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (isValid) {
            // Form is valid, submit or show success
            console.log('Form submitted successfully');
        }
    });

    // Input focus effects
    $('input, textarea').on('focus', function () {
        $(this).parent().find('label').addClass('text-primary');
    });

    $('input, textarea').on('blur', function () {
        $(this).parent().find('label').removeClass('text-primary');
    });

    // Initialize tooltips
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize carousel if present
    $('.carousel').carousel({
        interval: 5000,
        pause: false
    });

    // Add loading animation for page load
    $(window).on('load', function () {
        $('.hero-section, .schedule-day, .contact-info').addClass('fade-in-up');
    });

    // Keyboard navigation for schedule tabs
    $('.nav-tabs button').keydown(function (e) {
        var current = $(this);
        var next, prev;

        switch (e.which) {
            case 37: // left arrow
                prev = current.closest('.nav-item').prev('.nav-item').find('button');
                if (prev.length) {
                    prev.tab('show');
                    prev.focus();
                }
                break;
            case 39: // right arrow
                next = current.closest('.nav-item').next('.nav-item').find('button');
                if (next.length) {
                    next.tab('show');
                    next.focus();
                }
                break;
        }
    });

    // Add ARIA labels for accessibility
    $('.artist-card').attr('role', 'button').attr('tabindex', '0');
    $('.schedule-item').attr('role', 'button').attr('tabindex', '0');

    // Handle Enter key for artist cards and schedule items
    $('.artist-card, .schedule-item').on('keydown', function (e) {
        if (e.which === 13 || e.which === 32) { // Enter or Space
            e.preventDefault();
            $(this).click();
        }
    });

    // Console message for developers
    console.log('Harmony Fest - Music Festival Website Loaded Successfully');
    console.log('Developed with ❤️ for music lovers everywhere');
});

// Additional utility functions
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Function to get current festival status
function getFestivalStatus() {
    var now = new Date();
    var festivalStart = new Date('2025-09-26'); // Updated to 2025-09-26
    var festivalEnd = new Date('2025-09-28'); // Assuming 3-day festival

    if (now < festivalStart) {
        return 'upcoming';
    } else if (now >= festivalStart && now <= festivalEnd) {
        return 'active';
    } else {
        return 'past';
    }
}

// Service Worker registration (optional for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function (registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}