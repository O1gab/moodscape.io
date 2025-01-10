import { useEffect } from 'react';

function ScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          if (entry.target.tagName === 'H2') {
            const infoP = document.querySelector('.info .description p');
            if (infoP) {
              setTimeout(() => {
                infoP.classList.add('visible');
              }, 500); // 500ms delay
            }
          }
        }
      });
    }, { threshold: 0.1 });

    const infoH2 = document.querySelector('.info h2');
    if (infoH2) {
      observer.observe(infoH2);
    }

    return () => {
      if (infoH2) {
        observer.unobserve(infoH2);
      }
    };
  }, []);

  return null;
}

export default ScrollAnimation; 