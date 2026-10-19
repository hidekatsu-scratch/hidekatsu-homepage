
(function () {
    const id = 'g-v-k';
    if (document.getElementById(id)) return;

    let idx = 0, sh = false, opacity = 1, scale = 1;
    let posX = 50, posY = 20, dragging = false;
    let dragStart = null;
    const timers = {};

    const layouts = [
        [
            [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27}, ...Array.from({length:12},(_,i)=>({t:'F'+(i+1),c:'F'+(i+1),n:112+i}))],
            [{t:'半角',c:'Backquote',n:192},{t:'1',s:'!',c:'Digit1',n:49},{t:'2',s:'"',c:'Digit2',n:50},{t:'3',s:'#',c:'Digit3',n:51},{t:'4',s:'$',c:'Digit4',n:52},{t:'5',s:'%',c:'Digit5',n:53},{t:'6',s:'&',c:'Digit6',n:54},{t:'7',s:"'",c:'Digit7',n:55},{t:'8',s:'(',c:'Digit8',n:56},{t:'9',s:')',c:'Digit9',n:57},{t:'0',s:'~',c:'Digit0',n:48},{t:'-',s:'=',c:'Minus',n:189},{t:'^',s:'~',c:'Equal',n:222},{t:'¥',c:'IntlYen',n:220},{t:'BS',c:'Backspace',n:8,w:45}],
            [{t:'Tab',c:'Tab',n:9,w:45}, ...'qwertyuiop'.split('').map((t,i)=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:'@',c:'BracketLeft',n:219},{t:'[',c:'BracketRight',n:221},{t:'Enter',c:'Enter',n:13,w:50}],
            [{t:'Caps',w:50,x:'c'}, ...'asdfghjkl'.split('').map(t=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:';',c:'Semicolon',n:186},{t:':',c:'Quote',n:222},{t:']',c:'Backslash',n:221}],
            [{t:'Shift',w:65,x:'h'}, ...'zxcvbnm'.split('').map(t=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:',',c:'Comma',n:188},{t:'.',c:'Period',n:190},{t:'/',c:'Slash',n:191},{t:'↑',c:'ArrowUp',n:38}],
            [{t:'Ctrl',c:'ControlLeft',n:17,w:40},{t:'Win',c:'MetaLeft',n:91},{t:'Alt',c:'AltLeft',n:18},{t:'Space',c:'Space',n:32,w:140},{t:'←',c:'ArrowLeft',n:37},{t:'↓',c:'ArrowDown',n:40},{t:'→',c:'ArrowRight',n:39}]
        ],
        [
            [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27}],
            [{t:'w',s:'W',c:'KeyW',n:87}],
            [{t:'a',s:'A',c:'KeyA',n:65},{t:'s',s:'S',c:'KeyS',n:83},{t:'d',s:'D',c:'KeyD',n:68}],
            [{t:'Shift',w:50,x:'h'},{t:'Space',c:'Space',n:32,w:90}]
        ],
        [
            [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27}, ...Array.from({length:12},(_,i)=>({t:'F'+(i+1),c:'F'+(i+1),n:112+i}))],
            [{t:'`',s:'~',c:'Backquote',n:192},{t:'1',s:'!',c:'Digit1',n:49},{t:'2',s:'@',c:'Digit2',n:50},{t:'3',s:'#',c:'Digit3',n:51},{t:'4',s:'$',c:'Digit4',n:52},{t:'5',s:'%',c:'Digit5',n:53},{t:'6',s:'^',c:'Digit6',n:54},{t:'7',s:'&',c:'Digit7',n:55},{t:'8',s:'*',c:'Digit8',n:56},{t:'9',s:'(',c:'Digit9',n:57},{t:'0',s:')',c:'Digit0',n:48},{t:'-',s:'_',c:'Minus',n:189},{t:'=',s:'+',c:'Equal',n:187},{t:'BS',c:'Backspace',n:8,w:55}],
            [{t:'Tab',c:'Tab',n:9,w:50}, ...'qwertyuiop'.split('').map(t=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:'[',c:'BracketLeft',n:219},{t:']',c:'BracketRight',n:221},{t:'\\',c:'Backslash',n:220}],
            [{t:'Caps',w:60,x:'c'}, ...'asdfghjkl'.split('').map(t=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:';',s:':',c:'Semicolon',n:186},{t:"'",s:'"',c:'Quote',n:222},{t:'Enter',c:'Enter',n:13,w:70}],
            [{t:'Shift',w:85,x:'h'}, ...'zxcvbnm'.split('').map(t=>({t,s:t.toUpperCase(),c:'Key'+t.toUpperCase(),n:t.toUpperCase().charCodeAt(0)})),{t:',',s:'<',c:'Comma',n:188},{t:'.',s:'>',c:'Period',n:190},{t:'/',s:'?',c:'Slash',n:191},{t:'↑',c:'ArrowUp',n:38}],
            [{t:'Ctrl',c:'ControlLeft',n:17,w:45},{t:'Alt',c:'AltLeft',n:18,w:40},{t:'Cmd',c:'MetaLeft',n:91,w:50},{t:'Space',c:'Space',n:32,w:140},{t:'←',c:'ArrowLeft',n:37},{t:'↓',c:'ArrowDown',n:40},{t:'→',c:'ArrowRight',n:39}]
        ]
    ];

    const container = document.createElement('div');
    container.id = id;
    container.style.cssText = `
        position:fixed; bottom:${posY}px; left:${posX}%;
        transform:translateX(-50%); z-index:9999999;
        background:#222; padding:8px; border-radius:12px;
        box-shadow:0 8px 24px #000a; user-select:none;
        touch-action:none; font-family:sans-serif; color:white;
        box-sizing:border-box; max-width:98vw;
    `;

    const style = document.createElement('style');
    style.textContent = `
        #${id} .r{display:flex;justify-content:center;margin-bottom:4px;gap:2px}
        #${id} .b{background:#444;color:#fff;border:0;border-radius:4px;
        height:${36 * scale}px;min-width:${36 * scale}px;width:${36 * scale}px;
        font-size:12px;font-weight:bold;cursor:pointer;display:flex;
        align-items:center;justify-content:center;box-shadow:0 2px 0 #111;
        padding:0;flex-shrink:0}
        #${id} .b.act{background:#f90;box-shadow:none;transform:translateY(2px)}
        #${id} .settings{background:#333;border:1px solid #666;padding:10px;
        margin-bottom:8px;border-radius:8px;font-size:12px;touch-action:pan-y}
        #${id} .settings label{display:block;margin:7px 0}
        #${id} .settings input,#${id} .settings select{max-width:100%}
        #${id} .settings button{background:#555;color:white;border:0;
        padding:6px;border-radius:4px;margin:3px;cursor:pointer}
        #${id} .settings input[type=range]{width:130px}
        #${id} .close{position:absolute;top:-10px;right:-10px;
        background:#f33;color:white;border:0;border-radius:50%;
        width:22px;height:22px;cursor:pointer}
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'settings';
    panel.style.display = 'none';
    panel.innerHTML = `
        <strong>⚙ キーボード設定</strong>
        <label>透明度：<span id="g-opacity">100%</span><br>
        <input id="g-opacity-range" type="range" min="20" max="100" value="100"></label>
        <label>大きさ：<span id="g-scale">100%</span><br>
        <input id="g-scale-range" type="range" min="50" max="160" value="100"></label>
        <label>左右位置：<span id="g-x">50%</span><br>
        <input id="g-x-range" type="range" min="5" max="95" value="50"></label>
        <label>下からの位置：<span id="g-y">20px</span><br>
        <input id="g-y-range" type="range" min="0" max="300" value="20"></label>
        <label>キー配列<br>
        <select id="g-layout">
          <option value="0">JIS 配列</option>
          <option value="1">WASD</option>
          <option value="2">Apple 配列</option>
        </select></label>
        <button id="g-reset">設定をリセット</button>
        <button id="g-hide">設定を閉じる</button>
    `;
    container.appendChild(panel);

    function applyPosition() {
        container.style.left = posX + '%';
        container.style.bottom = posY + 'px';
    }

    function applySize() {
        style.textContent = `
            #${id} .r{display:flex;justify-content:center;margin-bottom:4px;gap:2px}
            #${id} .b{background:#444;color:#fff;border:0;border-radius:4px;
            height:${36*scale}px;min-width:${36*scale}px;width:${36*scale}px;
            font-size:${12*scale}px;font-weight:bold;cursor:pointer;display:flex;
            align-items:center;justify-content:center;box-shadow:0 2px 0 #111;
            padding:0;flex-shrink:0}
            #${id} .b.act{background:#f90;box-shadow:none;transform:translateY(2px)}
            #${id} .settings{background:#333;border:1px solid #666;padding:10px;
            margin-bottom:8px;border-radius:8px;font-size:12px;touch-action:pan-y}
            #${id} .settings label{display:block;margin:7px 0}
            #${id} .settings input,#${id} .settings select{max-width:100%}
            #${id} .settings button{background:#555;color:white;border:0;
            padding:6px;border-radius:4px;margin:3px;cursor:pointer}
            #${id} .settings input[type=range]{width:130px}
            #${id} .close{position:absolute;top:-10px;right:-10px;
            background:#f33;color:white;border:0;border-radius:50%;
            width:22px;height:22px;cursor:pointer}
        `;
        container.style.opacity = opacity;
        applyPosition();
    }

    function render() {
        container.querySelectorAll('.r').forEach(r => r.remove());
        const close = container.querySelector('.close');
        layouts[idx].forEach(row => {
            const div = document.createElement('div');
            div.className = 'r';
            row.forEach(k => {
                const b = document.createElement('button');
                b.className = 'b';
                b.textContent = k.t;
                if (k.w) b.style.width = (k.w * scale) + 'px';
                if (k.c) b.dataset.i = JSON.stringify(k);
                if (k.x === 's') {
                    b.addEventListener('click', e => {
                        e.stopPropagation();
                        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                    });
                }
                div.appendChild(b);
            });
            container.appendChild(div);
        });
        container.appendChild(close);
        up();
    }

    function up() {
        container.querySelectorAll('.b[data-i]').forEach(b => {
            const k = JSON.parse(b.dataset.i);
            b.textContent = sh && k.s ? k.s : k.t;
        });
    }

    function dp(k, type) {
        if (!k.c) return;
        const code = k.n || 0;
        const key = sh ? (k.s || k.t.toUpperCase()) : k.t;
        const targets = [window, document, document.body];
        if (document.activeElement) targets.push(document.activeElement);
        const event = new KeyboardEvent(type, {
            code:k.c,key,keyCode:code,which:code,shiftKey:sh,
            bubbles:true,cancelable:true,view:window
        });
        targets.forEach(t => t && t.dispatchEvent && t.dispatchEvent(event));
    }

    container.addEventListener('pointerdown', e => {
        const b = e.target.closest('.b');
        if (!b) return;
        const k = b.dataset.i ? JSON.parse(b.dataset.i) : null;
        if (!k) return;
        if (k.x === 'h') {
            sh = true;
            dp({c:'ShiftLeft',n:16,t:'Shift'},'keydown');
            b.classList.add('act');
            up();
        } else if (k.x === 'c') {
            sh = !sh;
            dp({c:'CapsLock',n:20,t:'CapsLock'},sh?'keydown':'keyup');
            b.classList.toggle('act',sh);
        } else {
            b.classList.add('act');
            dp(k,'keydown');
            if (timers[k.c]) clearInterval(timers[k.c]);
            timers[k.c] = setInterval(() => dp(k,'keydown'),100);
        }
    });

    function release(e) {
        const b = e.target.closest('.b');
        if (!b || !b.dataset.i) return;
        const k = JSON.parse(b.dataset.i);
        if (k.x === 'h') {
            sh = false;
            dp({c:'ShiftLeft',n:16,t:'Shift'},'keyup');
            b.classList.remove('act');
            up();
        } else if (k.x !== 'c') {
            b.classList.remove('act');
            clearInterval(timers[k.c]);
            delete timers[k.c];
            dp(k,'keyup');
        }
    }
    container.addEventListener('pointerup',release);
    container.addEventListener('pointerleave',release);

    function bindRange(id, fn) {
        const el = panel.querySelector('#' + id);
        el.addEventListener('input', () => fn(Number(el.value)));
    }
    bindRange('g-opacity-range', v => {
        opacity = v / 100;
        panel.querySelector('#g-opacity').textContent = v + '%';
        container.style.opacity = opacity;
    });
    bindRange('g-scale-range', v => {
        scale = v / 100;
        panel.querySelector('#g-scale').textContent = v + '%';
        applySize();
        render();
    });
    bindRange('g-x-range', v => {
        posX = v;
        panel.querySelector('#g-x').textContent = v + '%';
        applyPosition();
    });
    bindRange('g-y-range', v => {
        posY = v;
        panel.querySelector('#g-y').textContent = v + 'px';
        applyPosition();
    });
    panel.querySelector('#g-layout').addEventListener('change', e => {
        idx = Number(e.target.value);
        render();
    });
    panel.querySelector('#g-hide').addEventListener('click', () => {
        panel.style.display = 'none';
    });
    panel.querySelector('#g-reset').addEventListener('click', () => {
        opacity = 1; scale = 1; posX = 50; posY = 20; idx = 0;
        panel.querySelector('#g-opacity-range').value = 100;
        panel.querySelector('#g-scale-range').value = 100;
        panel.querySelector('#g-x-range').value = 50;
        panel.querySelector('#g-y-range').value = 20;
        panel.querySelector('#g-layout').value = 0;
        panel.querySelector('#g-opacity').textContent = '100%';
        panel.querySelector('#g-scale').textContent = '100%';
        panel.querySelector('#g-x').textContent = '50%';
        panel.querySelector('#g-y').textContent = '20px';
        applySize();
        render();
    });

    const close = document.createElement('button');
    close.className = 'close';
    close.textContent = '×';
    close.addEventListener('click', () => {
        Object.values(timers).forEach(clearInterval);
        container.remove();
        style.remove();
    });
    container.appendChild(close);

    // 本体をドラッグして位置変更
    container.addEventListener('pointerdown', e => {
        if (e.target.closest('.b') || e.target.closest('.settings') || e.target.closest('.close')) return;
        dragging = true;
        dragStart = {x:e.clientX, y:e.clientY, left:container.getBoundingClientRect().left,
            bottom:window.innerHeight-container.getBoundingClientRect().bottom};
        container.style.transform = 'none';
        container.setPointerCapture?.(e.pointerId);
    });
    container.addEventListener('pointermove', e => {
        if (!dragging || !dragStart) return;
        posX = Math.max(0,Math.min(100,(dragStart.left+e.clientX-dragStart.x)/window.innerWidth*100));
        posY = Math.max(0,Math.min(window.innerHeight-40,dragStart.bottom-e.clientY+dragStart.y));
        applyPosition();
        panel.querySelector('#g-x-range').value = posX;
        panel.querySelector('#g-y-range').value = posY;
        panel.querySelector('#g-x').textContent = Math.round(posX)+'%';
        panel.querySelector('#g-y').textContent = Math.round(posY)+'px';
    });
    container.addEventListener('pointerup', () => { dragging = false; dragStart = null; });
    document.body.appendChild(container);
    render();
    applySize();
})();
