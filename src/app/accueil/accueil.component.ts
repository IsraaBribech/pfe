import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit {
  
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Animation des formes de fond
    this.animateBackgroundShapes();
  }
  
  ngAfterViewInit(): void {
    // Démarrer l'animation des compteurs après le chargement de la vue
    this.animateCounters();
    
    // Ajouter les événements pour les effets 3D sur les cartes
    this.initCardEffects();
  }

  // Méthode pour animer les formes de fond
  animateBackgroundShapes(): void {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      this.setRandomPosition(shape as HTMLElement, index);
    });
  }

  // Positionne aléatoirement les formes avec des animations différentes
  setRandomPosition(element: HTMLElement, index: number): void {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    const randomDuration = 15 + Math.random() * 10;
    
    element.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    
    // Ajout du keyframe d'animation pour le flottement des formes
    const styleSheet = document.styleSheets[0];
    try {
      const keyframeName = `float-${index}`;
      const keyframeRule = `
        @keyframes ${keyframeName} {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(${randomX / 4}px, ${randomY / 4}px) rotate(${randomX / 30}deg) scale(1.05); }
          66% { transform: translate(${-randomY / 4}px, ${randomX / 4}px) rotate(${-randomY / 30}deg) scale(0.95); }
          100% { transform: translate(${-randomX / 4}px, ${-randomY / 4}px) rotate(${-randomX / 30}deg) scale(1); }
        }
      `;
      
      styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);
      element.style.animation = `${keyframeName} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    } catch (e) {
      console.log('Animation style could not be added', e);
    }
  }
  
  // Animation des compteurs
  animateCounters(): void {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // La vitesse de l'animation (plus petit = plus rapide)
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let count = 0;
      
      const updateCount = () => {
        const increment = target / speed;
        
        if (count < target) {
          count += Math.ceil(increment);
          (counter as HTMLElement).innerText = count.toString();
          setTimeout(updateCount, 1);
        } else {
          (counter as HTMLElement).innerText = target.toString();
        }
      };
      
      updateCount();
    });
  }
  
  // Initialiser les effets 3D sur les cartes
  initCardEffects(): void {
    const cards = document.querySelectorAll('.space-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }
  
  // Méthode pour gérer le toggle du thème
  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    const toggleThumb = document.querySelector('.toggle-thumb') as HTMLElement;
    if (body.classList.contains('dark-theme')) {
      toggleThumb.style.left = '28px';
    } else {
      toggleThumb.style.left = '2px';
    }
  }
}