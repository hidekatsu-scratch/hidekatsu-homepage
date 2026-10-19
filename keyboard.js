
(function gVkCustomVirtualKeyboardFixedV4() {
    'use strict';

    const ROOT_ID = 'g-v-k-custom-virtual-keyboard-fixed-v4';
    const STYLE_ID = 'g-v-k-custom-virtual-keyboard-style-v4';
    const STORAGE_KEY = 'g-v-k-custom-virtual-keyboard-settings-v4';

    if (document.getElementById(ROOT_ID)) return;

    const clone = x => JSON.parse(JSON.stringify(x));

    const makeKey = (t, c, n, extra = {}) => ({
        t, c, n,
        key: extra.key || t,
        ...extra
    });

    const letterRows = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ];

    function letterKey(ch) {
        const upper = ch.toUpperCase();
        return makeKey(ch, 'Key' + upper, upper.charCodeAt(0), {
            s: upper, key: ch
        });
    }

    function digitKey(n) {
        return makeKey(String(n), 'Digit' + n, 48 + n, {
            s: ')!@#$%^&*('[n] || String(n),
            key: String(n)
        });
    }

    function arrow(t, key, n) {
        return makeKey(t, key, n, {key});
    }

    const functionKeys = Array.from({length: 12}, (_, i) =>
        makeKey('F' + (i + 1), 'F' + (i + 1), 112 + i, {
            key: 'F' + (i + 1)
        })
    );

    const numpadKeys = [
        makeKey('Num', 'NumLock', 144, {key:'NumLock'}),
        makeKey('/', 'NumpadDivide', 111, {key:'/'}),
        makeKey('*', 'NumpadMultiply', 106, {key:'*'}),
        makeKey('-', 'NumpadSubtract', 109, {key:'-'}),
        makeKey('7', 'Numpad7', 103, {key:'7'}),
        makeKey('8', 'Numpad8', 104, {key:'8'}),
        makeKey('9', 'Numpad9', 105, {key:'9'}),
        makeKey('+', 'NumpadAdd', 107, {key:'+'}),
        makeKey('4', 'Numpad4', 100, {key:'4'}),
        makeKey('5', 'Numpad5', 101, {key:'5'}),
        makeKey('6', 'Numpad6', 102, {key:'6'}),
        makeKey('1', 'Numpad1', 97, {key:'1'}),
        makeKey('2', 'Numpad2', 98, {key:'2'}),
        makeKey('3', 'Numpad3', 99, {key:'3'}),
        makeKey('0', 'Numpad0', 96, {key:'0'}),
        makeKey('.', 'NumpadDecimal', 110, {key:'.'}),
        makeKey('Enter', 'NumpadEnter', 13, {key:'Enter'})
    ];

    function makeJisLayout() {
        return [
            [
                makeKey('⚙', '', 0, {x:'settings'}),
                makeKey('Esc', 'Escape', 27, {key:'Escape'}),
                ...functionKeys
            ],
            [
                makeKey('半角', 'Backquote', 192, {key:'半角/全角'}),
                ...[1,2,3,4,5,6,7,8,9,0].map(digitKey),
                makeKey('-', 'Minus', 189, {s:'=',key:'-'}),
                makeKey('^', 'Equal', 222, {s:'~',key:'^'}),
                makeKey('¥', 'IntlYen', 220, {s:'|',key:'¥'}),
                makeKey('BS', 'Backspace', 8, {key:'Backspace',w:48})
            ],
            [
                makeKey('Tab','Tab',9,{key:'Tab',w:48}),
                ...letterRows[0].split('').map(letterKey),
                makeKey('@','BracketLeft',219,{key:'@'}),
                makeKey('[','BracketRight',221,{key:'['}),
                makeKey('Enter','Enter',13,{key:'Enter',w:52})
            ],
            [
                makeKey('Caps','CapsLock',20,{key:'CapsLock',x:'caps',w:52}),
                ...letterRows[1].split('').map(letterKey),
                makeKey(';','Semicolon',186,{key:';'}),
                makeKey(':','Quote',222,{key:':'}),
                makeKey(']','Backslash',221,{key:']'})
            ],
            [
                makeKey('Shift','ShiftLeft',16,{key:'Shift',x:'shift',w:64}),
                ...letterRows[2].split('').map(letterKey),
                makeKey(',','Comma',188,{key:','}),
                makeKey('.','Period',190,{key:'.'}),
                makeKey('/','Slash',191,{key:'/'}),
                arrow('↑','ArrowUp',38)
            ],
            [
                makeKey('Ctrl','ControlLeft',17,{key:'Control',x:'ctrl',w:44}),
                makeKey('Fn','',0,{x:'noop'}),
                makeKey('Win','MetaLeft',91,{key:'Meta'}),
                makeKey('Alt','AltLeft',18,{key:'Alt'}),
                makeKey('無変','NonConvert',29,{key:'NonConvert'}),
                makeKey('Space','Space',32,{key:' ',w:120}),
                makeKey('変換','Convert',28,{key:'Convert'}),
                makeKey('かな','KanaMode',0,{key:'KanaMode'}),
                arrow('←','ArrowLeft',37),
                arrow('↓','ArrowDown',40),
                arrow('→','ArrowRight',39)
            ],
            [
                makeKey('Ins','Insert',45,{key:'Insert'}),
                makeKey('Home','Home',36,{key:'Home'}),
                makeKey('PgUp','PageUp',33,{key:'PageUp'}),
                makeKey('Del','Delete',46,{key:'Delete'}),
                makeKey('End','End',35,{key:'End'}),
                makeKey('PgDn','PageDown',34,{key:'PageDown'}),
                makeKey('PrtSc','PrintScreen',44,{key:'PrintScreen'}),
                makeKey('ScrLk','ScrollLock',145,{key:'ScrollLock'}),
                makeKey('Pause','Pause',19,{key:'Pause'})
            ],
            numpadKeys
        ];
    }

    function makeWasdLayout() {
        return [
            [makeKey('⚙','',0,{x:'settings'}), makeKey('Esc','Escape',27,{key:'Escape'})],
            [letterKey('w'), arrow('↑','ArrowUp',38)],
            [letterKey('a'),letterKey('s'),letterKey('d')],
            [makeKey('Shift','ShiftLeft',16,{key:'Shift',x:'shift',w:55}),makeKey('Space','Space',32,{key:' ',w:90})],
            [
                arrow('←','ArrowLeft',37),
                arrow('↓','ArrowDown',40),
                arrow('→','ArrowRight',39)
            ],
            functionKeys,
            numpadKeys
        ];
    }

    function makeAppleLayout() {
        const rows = makeJisLayout();
        rows[1] = [
            makeKey('`','Backquote',192,{key:'`'}),
            ...[1,2,3,4,5,6,7,8,9,0].map((n,i) =>
                makeKey(String(n),'Digit'+n,48+n,{
                    key:String(n),
                    s:['!','@','#','$','%','^','&','*','(',')'][i]
                })
            ),
            makeKey('-','Minus',189,{key:'-'}),
            makeKey('=','Equal',187,{key:'='}),
            makeKey('BS','Backspace',8,{key:'Backspace',w:48})
        ];
        rows[5] = [
            makeKey('Ctrl','ControlLeft',17,{key:'Control',x:'ctrl',w:44}),
            makeKey('Alt','AltLeft',18,{key:'Alt'}),
            makeKey('Cmd','MetaLeft',91,{key:'Meta'}),
            makeKey('Space','Space',32,{key:' ',w:120}),
            arrow('←','ArrowLeft',37),
            arrow('↓','ArrowDown',40),
            arrow('→','ArrowRight',39),
            arrow('↑','ArrowUp',38)
        ];
        return rows;
    }

    const DEFAULT_LAYOUTS = [
        makeJisLayout(),
        makeWasdLayout(),
        makeAppleLayout()
    ];

    let layouts = clone(DEFAULT_LAYOUTS);
    let layoutIndex = 0;

    // 固定位置はキーボードの中心Xと下端Yで管理する
    let opacity = 1;
    let scale = 1;
    let posX = 50;
    let posY = 20;

    let settingsOpen = false;
    let dragging = false;
    let dragStart = null;
    let shiftDown = false;
    let capsOn = false;

    const activeKeys = new Map();
    const repeatTimers = new Map();

    function loadSettings() {
        try {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (!data) return;

            if (Number.isFinite(data.opacity)) opacity = Math.max(.2,Math.min(1,data.opacity));
            if (Number.isFinite(data.scale)) scale = Math.max(.5,Math.min(2,data.scale));
            if (Number.isFinite(data.posX)) posX = Math.max(0,Math.min(100,data.posX));
            if (Number.isFinite(data.posY)) posY = Math.max(0,Math.min(2000,data.posY));
            if (Number.isInteger(data.layoutIndex)) layoutIndex = Math.max(0,Math.min(2,data.layoutIndex));

            if (Array.isArray(data.layouts) && data.layouts.length === 3) {
                layouts = data.layouts;
            }
        } catch (_) {}
    }

    function saveSettings() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                opacity,scale,posX,posY,layoutIndex,layouts
            }));
        } catch (_) {}
    }

    loadSettings();

    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.style.cssText = `
        position:fixed;
        left:${posX}%;
        bottom:${posY}px;
        transform:translateX(-50%);
        z-index:9999999;
        background:#222;
        padding:8px;
        border-radius:12px;
        box-shadow:0 8px 24px #000a;
        font-family:Arial,sans-serif;
        color:white;
        box-sizing:border-box;
        user-select:none;
        -webkit-user-select:none;
        opacity:${opacity};
    `;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        #${ROOT_ID} .gvk-row {
            display:flex;
            justify-content:center;
            align-items:center;
            gap:3px;
            margin:4px 0;
        }
        #${ROOT_ID} .gvk-key {
            flex:0 0 auto;
            box-sizing:border-box;
            width:calc(var(--gvk-base-width,36px) * var(--gvk-scale,1));
            height:calc(36px * var(--gvk-scale,1));
            min-width:0;
            padding:1px;
            border:0;
            border-radius:5px;
            background:#444;
            color:#fff;
            font-size:calc(12px * var(--gvk-scale,1));
            font-weight:bold;
            line-height:1.1;
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            cursor:pointer;
            touch-action:none;
            box-shadow:0 2px 0 #111;
        }
        #${ROOT_ID} .gvk-key.gvk-active {
            background:#f90;
            box-shadow:none;
            transform:translateY(2px);
        }
        #${ROOT_ID} .gvk-settings {
            width:min(440px,88vw);
            max-height:55vh;
            overflow:auto;
            box-sizing:border-box;
            padding:10px;
            margin-bottom:9px;
            background:#303030;
            border:1px solid #666;
            border-radius:8px;
            font-size:12px;
            touch-action:pan-y;
        }
        #${ROOT_ID} .gvk-settings label {
            display:block;
            margin:10px 0;
        }
        #${ROOT_ID} .gvk-settings input[type=range] {
            width:100%;
            display:block;
            margin-top:5px;
        }
        #${ROOT_ID} .gvk-settings button,
        #${ROOT_ID} .gvk-settings select {
            background:#555;
            color:white;
            border:0;
            border-radius:4px;
            padding:7px;
            margin:3px;
        }
        #${ROOT_ID} .gvk-drag-handle {
            padding:9px;
            background:#484848;
            margin:8px 0;
            border-radius:5px;
            cursor:move;
            touch-action:none;
        }
        #${ROOT_ID} .gvk-editor {
            width:100%;
            height:180px;
            box-sizing:border-box;
            background:#171717;
            color:white;
            user-select:text;
            -webkit-user-select:text;
        }
        #${ROOT_ID} .gvk-close {
            position:absolute;
            top:-10px;
            right:-10px;
            width:22px;
            height:22px;
            padding:0;
            border:0;
            border-radius:50%;
            background:#e33;
            color:white;
            font-size:16px;
            cursor:pointer;
        }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'gvk-settings';
    panel.style.display = 'none';
    panel.innerHTML = `
        <strong>⚙ キーボード設定</strong>

        <div class="gvk-drag-handle">
            ⠿ ここをドラッグして位置を固定
        </div>

        <label>透明度：<span id="gvk-opacity-label"></span>
            <input id="gvk-opacity-range" type="range" min="20" max="100">
        </label>

        <label>大きさ：<span id="gvk-scale-label"></span>
            <input id="gvk-scale-range" type="range" min="50" max="200">
        </label>

        <label>キー配列
            <select id="gvk-layout-select">
                <option value="0">JIS 配列</option>
                <option value="1">WASD 配列</option>
                <option value="2">Apple 配列</option>
            </select>
        </label>

        <details>
            <summary>キー配列を編集（JSON）</summary>
            <p>t=表示名、c=KeyboardEvent.code、n=キーコード、key=実際のキー名、s=Shift時表示、w=幅、x=特殊キー設定です。</p>
            <textarea class="gvk-editor" id="gvk-layout-editor" spellcheck="false"></textarea>
            <div id="gvk-editor-status"></div>
            <button type="button" id="gvk-apply-layout">適用・保存</button>
            <button type="button" id="gvk-reload-layout">編集を取り消す</button>
            <button type="button" id="gvk-reset-layout">配列をリセット</button>
        </details>

        <button type="button" id="gvk-reset-all">全設定をリセット</button>
        <button type="button" id="gvk-close-settings">設定を閉じる</button>
    `;

    const close = document.createElement('button');
    close.className = 'gvk-close';
    close.textContent = '×';
    close.title = 'キーボードを削除';

    root.appendChild(panel);
    root.appendChild(close);

    function applyPosition() {
        // 中心点を固定するため、scale変更時もleft/bottomは変えない
        root.style.left = posX + '%';
        root.style.bottom = posY + 'px';
    }

    function applyAppearance() {
        root.style.opacity = opacity;
        root.style.setProperty('--gvk-scale', scale);
        applyPosition();
        root.querySelectorAll('.gvk-key').forEach(button => {
            const key = JSON.parse(button.dataset.key);
            button.style.setProperty(
                '--gvk-base-width',
                (key.w || 36) + 'px'
            );
        });
    }

    function dispatchKeyboardEvent(type, key) {
        if (!key || !key.c) return;

        const keyName = key.key || key.t;
        const code = key.c;
        const keyCode = Number.isFinite(key.n) ? key.n : 0;

        const targets = new Set([
            window,
            document,
            document.documentElement,
            document.body,
            document.activeElement
        ]);

        for (const target of targets) {
            if (!target || typeof target.dispatchEvent !== 'function') continue;

            // 各ターゲットに独立したイベントを送る
            const event = new KeyboardEvent(type, {
                key: keyName,
                code,
                keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true,
                composed: true,
                repeat: type === 'keydown' && activeKeys.has(code),
                shiftKey: shiftDown || activeKeys.has('ShiftLeft'),
                ctrlKey: activeKeys.has('ControlLeft') || activeKeys.has('ControlRight'),
                altKey: activeKeys.has('AltLeft') || activeKeys.has('AltRight'),
                metaKey: activeKeys.has('MetaLeft') || activeKeys.has('MetaRight')
            });

            // 一部のブラウザでは keyCode/which が読み取り専用のため、
            // KeyboardEvent の標準初期化値を使用する。
            target.dispatchEvent(event);
        }
    }

    function setKeyDown(key, button) {
        if (key.x === 'settings') {
            setSettingsOpen(!settingsOpen);
            return;
        }

        if (key.x === 'noop' || !key.c) return;

        if (key.x === 'shift') {
            if (shiftDown) return;
            shiftDown = true;
            const shiftKey = makeKey('Shift','ShiftLeft',16,{key:'Shift'});
            activeKeys.set('ShiftLeft', shiftKey);
            dispatchKeyboardEvent('keydown', shiftKey);
            refreshKeyVisuals();
            return;
        }

        if (key.x === 'caps') {
            if (!activeKeys.has('CapsLock')) {
                capsOn = !capsOn;
                activeKeys.set('CapsLock', key);
                dispatchKeyboardEvent('keydown', key);
            }
            refreshKeyVisuals();
            return;
        }

        if (activeKeys.has(key.c)) return;

        activeKeys.set(key.c, key);
        dispatchKeyboardEvent('keydown', key);
        button.classList.add('gvk-active');

        // 移動系キーを押し続けた場合の連続入力
        const repeatable = [
            'ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
            'Backspace','Delete','Space'
        ].includes(key.c) ||
            key.c.startsWith('Key') ||
            key.c.startsWith('Digit') ||
            key.c.startsWith('Numpad');

        if (repeatable) {
            repeatTimers.set(key.c, setInterval(() => {
                if (activeKeys.has(key.c)) {
                    dispatchKeyboardEvent('keydown', key);
                }
            }, 80));
        }
    }

    function setKeyUp(key, button) {
        if (key.x === 'settings' || key.x === 'noop' || !key.c) return;

        if (key.x === 'shift') {
            shiftDown = false;
            const shiftKey = activeKeys.get('ShiftLeft') ||
                makeKey('Shift','ShiftLeft',16,{key:'Shift'});
            dispatchKeyboardEvent('keyup', shiftKey);
            activeKeys.delete('ShiftLeft');
            refreshKeyVisuals();
            return;
        }

        if (key.x === 'caps') {
            if (activeKeys.has('CapsLock')) {
                dispatchKeyboardEvent('keyup', key);
                activeKeys.delete('CapsLock');
            }
            refreshKeyVisuals();
            return;
        }

        if (repeatTimers.has(key.c)) {
            clearInterval(repeatTimers.get(key.c));
            repeatTimers.delete(key.c);
        }

        if (activeKeys.has(key.c)) {
            dispatchKeyboardEvent('keyup', key);
            activeKeys.delete(key.c);
        }

        button.classList.remove('gvk-active');
    }

    function refreshKeyVisuals() {
        root.querySelectorAll('.gvk-key').forEach(button => {
            const key = JSON.parse(button.dataset.key);
            button.textContent = shiftDown && key.s ? key.s : key.t;

            const active =
                (key.x === 'shift' && shiftDown) ||
                (key.x === 'caps' && capsOn) ||
                activeKeys.has(key.c);

            button.classList.toggle('gvk-active', Boolean(active));
        });
    }

    function renderKeyboard() {
        root.querySelectorAll('.gvk-row').forEach(row => row.remove());

        layouts[layoutIndex].forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'gvk-row';

            row.forEach(key => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'gvk-key';
                button.textContent = key.t;
                button.dataset.key = JSON.stringify(key);
                button.setAttribute('aria-label', key.t);

                rowElement.appendChild(button);
                root.insertBefore(rowElement, panel);
            });
        });

        applyAppearance();
        refreshKeyVisuals();
    }

    function setSettingsOpen(open) {
        settingsOpen = open;
        panel.style.display = open ? 'block' : 'none';

        if (open) updateEditor();
        else {
            dragging = false;
            dragStart = null;
        }
    }

    function updateEditor() {
        panel.querySelector('#gvk-opacity-range').value = opacity * 100;
        panel.querySelector('#gvk-scale-range').value = scale * 100;
        panel.querySelector('#gvk-opacity-label').textContent =
            Math.round(opacity * 100) + '%';
        panel.querySelector('#gvk-scale-label').textContent =
            Math.round(scale * 100) + '%';
        panel.querySelector('#gvk-layout-select').value = layoutIndex;
        panel.querySelector('#gvk-layout-editor').value =
            JSON.stringify(layouts[layoutIndex], null, 2);
    }

    function status(message, error = false) {
        const element = panel.querySelector('#gvk-editor-status');
        element.textContent = message;
        element.style.color = error ? '#ff9999' : '#9f9';
    }

    panel.querySelector('#gvk-opacity-range').addEventListener('input', event => {
        opacity = Number(event.target.value) / 100;
        panel.querySelector('#gvk-opacity-label').textContent =
            event.target.value + '%';
        root.style.opacity = opacity;
        saveSettings();
    });

    panel.querySelector('#gvk-scale-range').addEventListener('input', event => {
        scale = Number(event.target.value) / 100;
        panel.querySelector('#gvk-scale-label').textContent =
            event.target.value + '%';

        // 中心点と下端の座標は維持する
        applyAppearance();
        saveSettings();
    });

    panel.querySelector('#gvk-layout-select').addEventListener('change', event => {
        layoutIndex = Number(event.target.value);
        renderKeyboard();
        updateEditor();
        saveSettings();
    });

    panel.querySelector('#gvk-apply-layout').addEventListener('click', () => {
        try {
            const parsed = JSON.parse(
                panel.querySelector('#gvk-layout-editor').value
            );

            if (!Array.isArray(parsed) || !parsed.length || parsed.length > 12) {
                throw new Error('1〜12行の配列を指定してください。');
            }

            let count = 0;
            const cleaned = parsed.map(row => {
                if (!Array.isArray(row) || !row.length || row.length > 30) {
                    throw new Error('各行は1〜30個のキーにしてください。');
                }

                return row.map(key => {
                    if (++count > 150) throw new Error('キーは合計150個までです。');
                    if (!key || typeof key.t !== 'string' || !key.t.trim()) {
                        throw new Error('各キーに t（表示名）が必要です。');
                    }
                    if (key.t.length > 12) throw new Error('表示名は12文字以内です。');
                    if (key.c !== undefined && typeof key.c !== 'string') {
                        throw new Error('c は文字列で指定してください。');
                    }
                    if (key.key !== undefined && typeof key.key !== 'string') {
                        throw new Error('key は文字列で指定してください。');
                    }
                    if (key.n !== undefined && !Number.isFinite(key.n)) {
                        throw new Error('n は数値で指定してください。');
                    }
                    if (key.w !== undefined &&
                        (!Number.isFinite(key.w) || key.w < 25 || key.w > 220)) {
                        throw new Error('w は25〜220の数値にしてください。');
                    }

                    return {
                        t:key.t,
                        ...(key.c !== undefined ? {c:key.c} : {}),
                        ...(key.n !== undefined ? {n:key.n} : {}),
                        ...(key.key !== undefined ? {key:key.key} : {}),
                        ...(key.s !== undefined ? {s:key.s} : {}),
                        ...(key.w !== undefined ? {w:key.w} : {}),
                        ...(key.x !== undefined ? {x:key.x} : {})
                    };
                });
            });

            layouts[layoutIndex] = cleaned;
            renderKeyboard();
            updateEditor();
            saveSettings();
            status('キー配列を適用・保存しました。');
        } catch (error) {
            status('エラー：' + error.message, true);
        }
    });

    panel.querySelector('#gvk-reload-layout').addEventListener('click', () => {
        updateEditor();
        status('保存済みの配列を読み込みました。');
    });

    panel.querySelector('#gvk-reset-layout').addEventListener('click', () => {
        layouts[layoutIndex] = clone(DEFAULT_LAYOUTS[layoutIndex]);
        renderKeyboard();
        updateEditor();
        saveSettings();
        status('配列を初期状態に戻しました。');
    });

    panel.querySelector('#gvk-reset-all').addEventListener('click', () => {
        opacity = 1;
        scale = 1;
        posX = 50;
        posY = 20;
        layoutIndex = 0;
        layouts = clone(DEFAULT_LAYOUTS);
        renderKeyboard();
        updateEditor();
        saveSettings();
        status('全設定を初期状態に戻しました。');
    });

    panel.querySelector('#gvk-close-settings').addEventListener('click', () => {
        setSettingsOpen(false);
    });

    root.addEventListener('pointerdown', event => {
        const button = event.target.closest('.gvk-key');
        if (!button) return;

        event.preventDefault();
        const key = JSON.parse(button.dataset.key);
        setKeyDown(key, button);

        try {
            button.setPointerCapture(event.pointerId);
        } catch (_) {}
    });

    function releasePointer(event) {
        const button = event.target.closest('.gvk-key');
        if (!button) return;

        const key = JSON.parse(button.dataset.key);
        setKeyUp(key, button);
    }

    root.addEventListener('pointerup', releasePointer);
    root.addEventListener('pointercancel', releasePointer);
    root.addEventListener('lostpointercapture', releasePointer);

    // 設定を開いている間だけ専用ハンドルで移動可能
    const dragHandle = panel.querySelector('.gvk-drag-handle');

    dragHandle.addEventListener('pointerdown', event => {
        if (!settingsOpen) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        event.preventDefault();

        const rect = root.getBoundingClientRect();
        dragging = true;

        dragStart = {
            pointerX:event.clientX,
            pointerY:event.clientY,
            left:rect.left,
            bottom:window.innerHeight - rect.bottom
        };

        try {
            dragHandle.setPointerCapture(event.pointerId);
        } catch (_) {}
    });

    dragHandle.addEventListener('pointermove', event => {
        if (!dragging || !dragStart || !settingsOpen) return;

        const rect = root.getBoundingClientRect();
        const left = dragStart.left + event.clientX - dragStart.pointerX;
        const bottom = dragStart.bottom -
            (event.clientY - dragStart.pointerY);

        // 幅の変化にかかわらず、指定した中心位置を固定する
        posX = Math.max(0, Math.min(
            100,
            (left + rect.width / 2) / window.innerWidth * 100
        ));

        posY = Math.max(
            0,
            Math.min(Math.max(0, window.innerHeight - 40), bottom)
        );

        applyPosition();
    });

    function stopDragging() {
        if (!dragging) return;
        dragging = false;
        dragStart = null;
        saveSettings();
    }

    dragHandle.addEventListener('pointerup', stopDragging);
    dragHandle.addEventListener('pointercancel', stopDragging);
    dragHandle.addEventListener('lostpointercapture', stopDragging);

    close.addEventListener('click', () => {
        for (const timer of repeatTimers.values()) clearInterval(timer);
        repeatTimers.clear();

        for (const [code, key] of activeKeys) {
            dispatchKeyboardEvent('keyup', key);
        }
        activeKeys.clear();

        root.remove();
        style.remove();
    });

    // ズームや画面サイズ変更時に固定位置を維持
    window.addEventListener('resize', () => {
        applyPosition();
    });

    document.body.appendChild(root);
    renderKeyboard();
    updateEditor();
    applyAppearance();

})();
