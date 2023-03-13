const KEY_CODE = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};


function isCtrlOrCommand(e: KeyboardEvent) {
    return e.ctrlKey || (navigator.platform.indexOf('Mac') === 0 && e.metaKey);
}


(function() {
    

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (isCtrlOrCommand(e)) {
            const { keyCode, ctrlKey } = e;
            switch (keyCode) {
                case 
            }
        }
        
    });
})()