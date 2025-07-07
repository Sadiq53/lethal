
// smooth  ----------------------------------------------------------------------
(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();
// smooth scroll ----------------------------------------------------------------------

// for cursor ----------------------------------------------------------------------
gsap.set('.follower',{xPercent:-50,yPercent:-50});
gsap.set('.cursor',{xPercent:-50,yPercent:-50});

var follow = document.querySelector('.follower');
var cur = document.querySelector('.cursor');

window.addEventListener('mousemove',e => {
    gsap.to(cur,0.1,{x:e.clientX,y:e.clientY});
    gsap.to(follow,0.4,{x:e.clientX,y:e.clientY});
});

var buttons = document.querySelectorAll('button, a');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to('.follower', { scale: 1.8, duration: 0.1 });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to('.follower', { scale: 1, duration: 0.1 });
    });
});
// for cursor ----------------------------------------------------------------------


// header fade js ----------------------------------------------------------------------

/// Register GSAP plugins
gsap.registerPlugin(SplitText);

// Select all elements with the class 'theme-font-lg' to animate
const elementsToAnimate = document.querySelectorAll('.theme-font-lg');

// Function to handle the animation
function animateElement(element) {
  // Split text into words and characters
  const splitText = new SplitText(element, {
    type: 'words,chars' // Split into words and characters
  });

  const chars = splitText.chars;
  const highlightedWords = element.querySelectorAll('.highlighted'); // Select highlighted words within the current element
  const colorChange = element.querySelectorAll('.highlight'); // Select highlighted words within the current element

  // Create a GSAP timeline to sequence animations
  const tl = gsap.timeline({
    onComplete: () => observer.unobserve(element) // Stop observing once the animation is complete 
  });

  // Animate header characters from left to right
  tl.fromTo(chars, 
    {
      opacity: 0, // Start with characters invisible
      x: 0, // Start with characters slightly to the left
    }, 
    {
      opacity: 1, // End with characters visible
      x: 0, // Move to the original position
      ease: 'power2.out', // Easing function for smooth effect
      stagger: 0.05, // Stagger the animation of each character
      duration: 0.5 // Duration of the animation for each character
    }
  )
  // Fade in the highlighted words after the header animation completes 
  .to(highlightedWords, {
    backgroundColor : '#BA0001', // Change color to red (or your desired highlight color)
    duration: 1, // Duration of the color transition
    ease: 'power2.out' // Easing function for smooth effect
  }, "-=0.1") // Overlap the fade-in effect with the end of the header animation
  .to(colorChange, {
    color : '#BA0001',
    duration : 0.5,
    ease : 'power2.out'
  }, '-=0.1')
}

// Create the observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      animateElement(element);
    }
  });
}, { threshold: 0.1 }); // Trigger when 10% of the element is in view

// Observe each element with the class 'theme-font-lg'
elementsToAnimate.forEach(element => observer.observe(element));

// header fade js ----------------------------------------------------------------------





        // accordian ----------------------------------------------------------------------
        document.addEventListener('DOMContentLoaded', () => {
            // Select all accordion headers
            document.querySelectorAll('.accordion-item-header').forEach(item => {
                // Collapse the accordion items that may be open by default
                const content = item.nextElementSibling;
                content.style.maxHeight = 0; // Ensure no content is shown by default
                
                // Adjust plus/minus icon if necessary
                const plusMinus = item.querySelector('.minus');
                if (plusMinus) {
                    plusMinus.classList.replace('minus', 'plus');
                    plusMinus.innerHTML = '+';
                }
        
                // Add click event listener to each accordion header
                item.addEventListener('click', () => {
                    // Find currently active accordion item
                    const currentlyActive = document.querySelector('.accordion-item-header.active');
                    if (currentlyActive && currentlyActive !== item) {
                        currentlyActive.classList.remove('active');
                        currentlyActive.nextElementSibling.style.maxHeight = 0;
                        const plusMinus = currentlyActive.querySelector('.minus');
                        if (plusMinus) {
                            plusMinus.classList.replace('minus', 'plus');
                            plusMinus.innerHTML = '+';
                        }
                    }
        
                    // Toggle the clicked item
                    item.classList.toggle('active');
                    const content = item.nextElementSibling;
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        const plusMinus = item.querySelector('.plus');
                        if (plusMinus) {
                            plusMinus.classList.replace('plus', 'minus');
                            plusMinus.innerHTML = '−';
                        }
                    } else {
                        content.style.maxHeight = 0;
                        const plusMinus = item.querySelector('.minus');
                        if (plusMinus) {
                            plusMinus.classList.replace('minus', 'plus');
                            plusMinus.innerHTML = '+';
                        }
                    }
                });
            });
        });
        
        
        
        // accordian ----------------------------------------------------------------------