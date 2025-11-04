const input = document.getElementById('inputColor');
const preview = document.getElementById('preview');
const section = document.querySelector('section');
const body = document.body;
const button = document.querySelector('input[type="button"]');
const circlesContainer = document.getElementById('circles-container');

function colorToRGBA(color, alpha = 0.15) {
  const el = document.createElement('div');
  el.style.color = color;
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = resolved.match(/rgba?\s*\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return null;
  const [_, r, g, b] = m;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isValidCSSColor(color) {
  const s = new Option().style;
  s.color = '';
  s.color = color;
  return !!s.color;
}

function spawnCircles(color) {
  circlesContainer.innerHTML = ""; 

  for (let i = 0; i < 8; i++) {
    const circle = document.createElement('div');
    const size = Math.floor(Math.random() * 80) + 40;
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${left}%`;
    circle.style.top = `${top}%`;
    circle.style.background = color;
    circle.style.opacity = 0.3;
    circle.style.animationDuration = `${3 + Math.random() * 4}s`;

    circle.addEventListener('animationend', () => {
      const newSize = Math.floor(Math.random() * 80) + 40;
      const newLeft = Math.random() * 100;
      const newTop = Math.random() * 100;
      circle.style.width = `${newSize}px`;
      circle.style.height = `${newSize}px`;
      circle.style.left = `${newLeft}%`;
      circle.style.top = `${newTop}%`;
      circle.style.animation = 'none';
     
      void circle.offsetWidth;
      circle.style.animation = '';
      circle.style.animationDuration = `${3 + Math.random() * 4}s`;
    });

    circlesContainer.appendChild(circle);
  }
}

function changeColor() {
  const color = input.value.trim();
  if (!color) return alert('Digite o nome ou código de uma cor.');
  if (!isValidCSSColor(color))
    return alert('Cor inválida. Use algo como "red", "#ff8800" ou "rgb(255,136,0)".');

  const rgba = colorToRGBA(color, 0.15);
  body.style.background = `linear-gradient(to bottom right, ${color}, #ffffff)`;
  section.style.background = rgba
    ? `linear-gradient(to bottom right, #ffffff, ${rgba})`
    : color;
  preview.style.background = color;

  spawnCircles(color);
  input.value = '';
}

input.addEventListener('input', e => {
  const color = e.target.value.trim();
  preview.style.background = isValidCSSColor(color) ? color : '#fff';
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') changeColor();
});
