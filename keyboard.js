(function(){
    const id = 'g-v-k';
    if (document.getElementById(id)) return;

    let idx = 0, sh = false;
    const timers = {};

    const container = document.createElement('div');
    container.id = id;
    container.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999999;background:#222;padding:8px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.7);user-select:none;-webkit-user-select:none;touch-action:none;font-family:sans-serif;direction:ltr;';

    const style = document.createElement('style');
    style.innerHTML = `#${id} .r{display:flex;justify-content:center;margin-bottom:4px;}#${id} .b{background:#444;color:#fff;border:none;border-radius:4px;margin:0 2px;height:36px;width:36px;font-size:11px;font-weight:bold;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 2px 0 #111;transition:none;line-height:1.1;overflow:hidden;}#${id} .b.act{background:#f90;box-shadow:none;transform:translateY(2px);}`;
    document.head.appendChild(style);

    const layoutJIS = [
        [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27},{t:'F1',c:'F1',n:112},{t:'F2',c:'F2',n:113},{t:'F3',c:'F3',n:114},{t:'F4',c:'F4',n:115},{t:'F5',c:'F5',n:116},{t:'F6',c:'F6',n:117},{t:'F7',c:'F7',n:118},{t:'F8',c:'F8',n:119},{t:'F9',c:'F9',n:120},{t:'F10',c:'F10',n:121},{t:'F11',c:'F11',n:122},{t:'F12',c:'F12',n:123}],
        [{t:'半角',c:'Backquote',n:192},{t:'1',s:'!',c:'Digit1',n:49},{t:'2',s:'"',c:'Digit2',n:50},{t:'3',s:'#',c:'Digit3',n:51},{t:'4',s:'$',c:'Digit4',n:52},{t:'5',s:'%',c:'Digit5',n:53},{t:'6',s:'&',c:'Digit6',n:54},{t:'7',s:"'",c:'Digit7',n:55},{t:'8',s:'(',c:'Digit8',n:56},{t:'9',s:')',c:'Digit9',n:57},{t:'0',s:'~',c:'Digit0',n:48},{t:'-',s:'=',c:'Minus',n:189},{t:'^',s:'~',c:'Equal',n:222},{t:'¥',s:'|',c:'IntlYen',n:220},{t:'BS',c:'Backspace',n:8,w:45}],
        [{t:'Tab',c:'Tab',n:9,w:45},{t:'q',s:'Q',c:'KeyQ',n:81},{t:'w',s:'W',c:'KeyW',n:87},{t:'e',s:'E',c:'KeyE',n:69},{t:'r',s:'R',c:'KeyR',n:82},{t:'t',s:'T',c:'KeyT',n:84},{t:'y',s:'Y',c:'KeyY',n:89},{t:'u',s:'U',c:'KeyU',n:85},{t:'i',s:'I',c:'KeyI',n:73},{t:'o',s:'O',c:'KeyO',n:79},{t:'p',s:'P',c:'KeyP',n:80},{t:'@',s:'`',c:'BracketLeft',n:219},{t:'[',s:'{',c:'BracketRight',n:221},{t:'Enter',c:'Enter',n:13,w:50}],
        [{t:'Caps',c:'CapsLock',n:20,w:50},{t:'a',s:'A',c:'KeyA',n:65},{t:'s',s:'S',c:'KeyS',n:83},{t:'d',s:'D',c:'KeyD',n:68},{t:'f',s:'F',c:'KeyF',n:70},{t:'g',s:'G',c:'KeyG',n:71},{t:'h',s:'H',c:'KeyH',n:72},{t:'j',s:'J',c:'KeyJ',n:74},{t:'k',s:'K',c:'KeyK',n:75},{t:'l',s:'L',c:'KeyL',n:76},{t:';',s:'+',c:'Semicolon',n:186},{t:':',s:'*',c:'Quote',n:222},{t:']',s:'}',c:'Backslash',n:221}],
        [{t:'Shift',w:65,x:'h'},{t:'z',s:'Z',c:'KeyZ',n:90},{t:'x',s:'X',c:'KeyX',n:88},{t:'c',s:'C',c:'KeyC',n:67},{t:'v',s:'V',c:'KeyV',n:86},{t:'b',s:'B',c:'KeyB',n:66},{t:'n',s:'N',c:'KeyN',n:78},{t:'m',s:'M',c:'KeyM',n:77},{t:',',s:'<',c:'Comma',n:188},{t:'.',s:'>',c:'Period',n:190},{t:'/',s:'?',c:'Slash',n:191},{t:'▲',c:'ArrowUp',n:38}],
        [{t:'Ctrl',c:'ControlLeft',n:17,w:40},{t:'Fn'},{t:'Win',c:'MetaLeft',n:91},{t:'Alt',c:'AltLeft',n:18},{t:'無変',c:'NonConvert',n:29},{t:'Space',c:'Space',n:32,w:140},{t:'変換',c:'Convert',n:28},{t:'かな',c:'HiraganaKatakana',n:242},{t:'◀',c:'ArrowLeft',n:37},{t:'▼',c:'ArrowDown',n:40},{t:'▶',c:'ArrowRight',n:39}]
    ];

    const layoutWASD = [
        [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27}],
        [{t:'w',s:'W',c:'KeyW',n:87}],
        [{t:'a',s:'A',c:'KeyA',n:65},{t:'s',s:'S',c:'KeyS',n:83},{t:'d',s:'D',c:'KeyD',n:68}],
        [{t:'Shift',w:50,x:'h'},{t:'Space',c:'Space',n:32,w:90}]
    ];

    const layoutApple = [
        [{t:'⚙',x:'s'},{t:'Esc',c:'Escape',n:27},{t:'F1',c:'F1',n:112},{t:'F2',c:'F2',n:113},{t:'F3',c:'F3',n:114},{t:'F4',c:'F4',n:115},{t:'F5',c:'F5',n:116},{t:'F6',c:'F6',n:117},{t:'F7',c:'F7',n:118},{t:'F8',c:'F8',n:119},{t:'F9',c:'F9',n:120},{t:'F10',c:'F10',n:121},{t:'F11',c:'F11',n:122},{t:'F12',c:'F12',n:123}],
        [{t:'`',s:'~',c:'Backquote',n:192},{t:'1',s:'!',c:'Digit1',n:49},{t:'2',s:'@',c:'Digit2',n:50},{t:'3',s:'#',c:'Digit3',n:51},{t:'4',s:'$',c:'Digit4',n:52},{t:'5',s:'%',c:'Digit5',n:53},{t:'6',s:'^',c:'Digit6',n:54},{t:'7',s:'&',c:'Digit7',n:55},{t:'8',s:'*',c:'Digit8',n:56},{t:'9',s:'(',c:'Digit9',n:57},{t:'0',s:')',c:'Digit0',n:48},{t:'-',s:'_',c:'Minus',n:189},{t:'=',s:'+',c:'Equal',n:187},{t:'BS',c:'Backspace',n:8,w:55}],
        [{t:'Tab',c:'Tab',n:9,w:50},{t:'q',s:'Q',c:'KeyQ',n:81},{t:'w',s:'W',c:'KeyW',n:87},{t:'e',s:'E',c:'KeyE',n:69},{t:'r',s:'R',c:'KeyR',n:82},{t:'t',s:'T',c:'KeyT',n:84},{t:'y',s:'Y',c:'KeyY',n:89},{t:'u',s:'U',c:'KeyU',n:85},{t:'i',s:'I',c:'KeyI',n:73},{t:'o',s:'O',c:'KeyO',n:79},{t:'p',s:'P',c:'KeyP',n:80},{t:'[',s:'{',c:'BracketLeft',n:219},{t:']',s:'}',c:'BracketRight',n:221},{t:'\\',s:'|',c:'Backslash',n:220}],
        [{t:'Caps',c:'CapsLock',n:20,w:60},{t:'a',s:'A',c:'KeyA',n:65},{t:'s',s:'S',c:'KeyS',n:83},{t:'d',s:'D',c:'KeyD',n:68},{t:'f',s:'F',c:'KeyF',n:70},{t:'g',s:'G',c:'KeyG',n:71},{t:'h',s:'H',c:'KeyH',n:72},{t:'j',s:'J',c:'KeyJ',n:74},{t:'k',s:'K',c:'KeyK',n:75},{t:'l',s:'L',c:'KeyL',n:76},{t:';',s:':',c:'Semicolon',n:186},{t:"'",s:'"',c:'Quote',n:222},{t:'Enter',c:'Enter',n:13,w:70}],
        [{t:'Shift',w:85,x:'h'},{t:'z',s:'Z',c:'KeyZ',n:90},{t:'x',s:'X',c:'KeyX',n:88},{t:'c',s:'C',c:'KeyC',n:67},{t:'v',s:'V',c:'KeyV',n:86},{t:'b',s:'B',c:'KeyB',n:66},{t:'n',s:'N',c:'KeyN',n:78},{t:'m',s:'M',c:'KeyM',n:77},{t:',',s:'<',c:'Comma',n:188},{t:'.',s:'>',c:'Period',n:190},{t:'/',s:'?',c:'Slash',n:191},{t:'▲',c:'ArrowUp',n:38}],
        [{t:'Ctrl',c:'ControlLeft',n:17,w:45},{t:'Alt',c:'AltLeft',n:18,w:40},{t:'Cmd',c:'MetaLeft',n:91,w:50},{t:'Space',c:'Space',n:32,w:140},{t:'Cmd',c:'MetaRight',n:92,w:50},{t:'Alt',c:'AltRight',n:18,w:40},{t:'◀',c:'ArrowLeft',n:37},{t:'▼',c:'ArrowDown',n:40},{t:'▶',c:'ArrowRight',n:39}]
    ];

    const layouts = [layoutJIS, layoutWASD, layoutApple];

    function dp(k, type) {
        if (!k.c) return;
        const dn = (type === 'keydown');
        const tgs = [window, document, document.body];
        if (document.activeElement) tgs.push(document.activeElement);

        const ky = sh ? (k.s || k.t.toUpperCase()) : k.t;
        const e = new KeyboardEvent(type, {code: k.c, key: ky, keyCode: k.n, which: k.n, shiftKey: sh, bubbles: true, cancelable: true, view: window});
        
        tgs.forEach(t => { if (t && t.dispatchEvent) t.dispatchEvent(e); });

        try {
            function ij(o) {
                if (!o || typeof o !== 'object') return;
                Object.keys(o).forEach(g => {
                    if (['_keys', 'pressedKeys', 'keys', 'isDown', 'downKeys', 'keyState'].includes(g)) {
                        if (typeof o[g] === 'object') {
                            if (Array.isArray(o[g])) {
                                const i = o[g].indexOf(k.n);
                                if (dn && i === -1) o[g].push(k.n);
                                if (!dn && i !== -1) o[g].splice(i, 1);
                            } else {
                                o[g][k.c] = dn; o[g][k.n] = dn;
                                if (k.t) { o[g][k.t] = dn; o[g][k.t.toLowerCase()] = dn; o[g][k.t.toUpperCase()] = dn; }
                            }
                        }
                    }
                    if (o[g] && typeof o[g] === 'object' && o[g] !== window && o[g] !== document && o[g] !== container) { ij(o[g]); }
                });
            }
            ['game', 'Phaser', 'app', 'scene', 'player'].forEach(x => window[x] && ij(window[x]));
        } catch (err) {}
    }

    function up() {
        container.querySelectorAll('.b').forEach(b => {
            if (!b.dataset.i) return;
            const k = JSON.parse(b.dataset.i);
            if (k.x) return;
            if (sh && k.s) {
                b.innerText = k.s; b.style.fontSize = '14px';
            } else {
                b.innerText = k.t; b.style.fontSize = k.s ? '10px' : '12px';
            }
        });
    }

    function rd() {
        container.querySelectorAll('.r').forEach(r => r.remove());
        layouts[idx].forEach(row => {
            const rDiv = document.createElement('div');
            rDiv.className = 'r';
            row.forEach(k => {
                const b = document.createElement('button');
                b.className = 'b';
                b.innerText = k.t;
                b.style.fontSize = k.s ? '10px' : '12px';
                if (k.w) b.style.width = k.w + 'px';
                if (k.c) b.dataset.i = JSON.stringify(k);
                
                if (k.x === 's') {
                    b.style.background = '#555';
                    b.addEventListener('click', e => { e.stopPropagation(); idx = (idx + 1) % layouts.length; rd(); });
                }
                if (k.x === 'h' && sh) b.classList.add('act');
                rDiv.appendChild(b);
            });
            container.appendChild(rDiv);
        });
        up();
    }

    rd();

    container.addEventListener('pointerdown', e => {
        const b = e.target.closest('.b');
        if (!b) return;
        if (b.dataset.i) {
            const k = JSON.parse(b.dataset.i);
            b.classList.add('act');
            dp(k, 'keydown');
            timers[k.c] = setInterval(() => dp(k, 'keydown'), 40);
        } else if (b.innerText === 'Shift') {
            sh = !sh;
            b.classList.toggle('act', sh);
            up();
        }
    });

    const st = e => {
        const b = e.target.closest('.b');
        if (!b || !b.dataset.i) return;
        const k = JSON.parse(b.dataset.i);
        b.classList.remove('act');
        if (timers[k.c]) { clearInterval(timers[k.c]); delete timers[k.c]; }
        dp(k, 'keyup');
    };

    container.addEventListener('pointerup', st);
    container.addEventListener('pointerleave', st);

    const x = document.createElement('div');
    x.innerText = '×';
x.style.cssText = 'position:absolute;top:-10px;right:-10px;background:#f33;color:#fff;width:20px;height:20px;border-radius:50%;text-align:center;line-height:18px;font-weight:bold;cursor:pointer;font-size:14px;';
x.addEventListener('click', () => container.remove());
container.appendChild(x);
document.body.appendChild(container);
})();
