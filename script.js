(function () {
      const canvas = document.getElementById('matrix');
      const ctx = canvas.getContext('2d');

      const letters = "アァイィウエエェオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const fontSize = 14; 

      let columns = 0;
      let drops = [];
      let deviceRatio = window.devicePixelRatio || 1;
      let rafId = null;

      function resizeCanvas() {
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();

       
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        
        deviceRatio = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(rect.width * deviceRatio));
        canvas.height = Math.max(1, Math.floor(rect.height * deviceRatio));
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';

       
        ctx.scale(deviceRatio, deviceRatio);

    
        columns = Math.floor(rect.width / fontSize) || 1;
        drops = Array.from({ length: columns }, () => Math.floor(Math.random() * rect.height / fontSize));
      }

      function draw() {
      
        ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
        ctx.fillRect(0, 0, canvas.width / deviceRatio, canvas.height / deviceRatio);

       
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(text, x, y);

          if (y > canvas.height / deviceRatio && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      function loop() {
        draw();
        rafId = requestAnimationFrame(loop);
      }

      function start() {
        resizeCanvas();
        if (rafId) cancelAnimationFrame(rafId);
        loop();
      }
      window.addEventListener('resize', start);
      window.addEventListener('orientationchange', start);
      requestAnimationFrame(start);
    })();