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

        function changeColor() {
            const input = document.getElementById('inputColor');
            const color = input.value.trim();
            const body = document.body;
            const section = document.querySelector('section');
            const preview = document.getElementById('preview');

            if (!color) {
                alert('Por favor, digite o nome de uma cor ou código hexadecimal.');
                return;
            }

            if (!isValidCSSColor(color)) {
                alert('Cor inválida. Tente algo como "red", "#ff8800" ou "rgb(255,136,0)".');
                return;
            }

            const rgba = colorToRGBA(color, 0.15);
            body.style.background = `linear-gradient(to bottom right, ${color}, #ffffff)`;
            section.style.background = rgba
                ? `linear-gradient(to bottom right, #ffffff, ${rgba})`
                : color;
            preview.style.background = color;

            
            input.value = '';
        }

        
        document.getElementById('inputColor').addEventListener('input', e => {
            const color = e.target.value.trim();
            const preview = document.getElementById('preview');
            preview.style.background = isValidCSSColor(color) ? color : '#fff';
        });

       
        document.getElementById('inputColor').addEventListener('keydown', e => {
            if (e.key === 'Enter') changeColor();
        });