const sections = document.querySelectorAll('.reveal');
function wrapWords(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent;
              if (!text.trim()) return;

              const fragment = document.createDocumentFragment();
              text.split(/(\s+)/).forEach(part => {
                if (!part) return;
                if (/^\s+$/.test(part)) {
                  fragment.appendChild(document.createTextNode(part));
                } else {
                  const span = document.createElement('span');
                  span.className = 'word';
                  const x = Math.round((Math.random() * 2 - 1) * 80);
                  const y = Math.round((Math.random() * 2 - 1) * 80);
                  const r = Math.round((Math.random() * 2 - 1) * 35);
                  span.style.setProperty('--x', `${x}px`);
                  span.style.setProperty('--y', `${y}px`);
                  span.style.setProperty('--r', `${r}deg`);
                  span.textContent = part;
                  fragment.appendChild(span);
                }
              });

              node.replaceWith(fragment);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              node.childNodes.forEach(child => wrapWords(child));
            }
          }

          sections.forEach(section => {
            section.querySelectorAll('h2, h3, p, li, a').forEach(el => wrapWords(el));
          });

          const startOverlay = document.querySelector('.start-overlay');
          const startButton = document.querySelector('.start-button');

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.word');
                words.forEach((word, index) => {
                  const delay = index * 0.16 + Math.random() * 0.12;
                  word.style.transitionDelay = `${delay}s`;
                  word.classList.add('visible');
                });
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.25 });

          function startExperience() {
            startOverlay.classList.add('hidden');
            setTimeout(() => {
              if (startOverlay.parentNode) startOverlay.parentNode.removeChild(startOverlay);
            }, 500);
            sections.forEach(section => observer.observe(section));
          }

          if (startButton) {
            startButton.addEventListener('click', startExperience);
          } else {
            sections.forEach(section => observer.observe(section));
          }