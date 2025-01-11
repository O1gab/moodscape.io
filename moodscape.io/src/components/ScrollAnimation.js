import { useEffect } from 'react';

function ScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          const section = entry.target.closest('div[class$="-section"], .info');
          if (section) {
            const descriptionP = section.querySelector('.description p');
            const contactEmail = section.querySelector('.contact-email');
            
            if (descriptionP) {
              setTimeout(() => {
                descriptionP.classList.add('visible');
              }, 500);
            }
            
            if (contactEmail) {
              setTimeout(() => {
                contactEmail.classList.add('visible');
              }, 1000);
            }
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all h2 elements in sections
    const headings = document.querySelectorAll('.info h2, .test-section h2, .features h2, .download-section h2, .faq-section h2, .contact-section h2');
    headings.forEach(heading => {
      observer.observe(heading);
    });

    return () => {
      headings.forEach(heading => {
        observer.unobserve(heading);
      });
    };
  }, []);

  return null;
}

export default ScrollAnimation; 