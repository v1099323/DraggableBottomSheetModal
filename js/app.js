(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const showModalBtn = document.querySelector(".show-modal");
    const bottomSheet = document.querySelector(".bottom-sheet");
    const sheetOverlay = bottomSheet.querySelector(".sheet__overlay");
    const sheetContent = bottomSheet.querySelector(".content-sheet");
    const dragIcon = bottomSheet.querySelector(".content-sheet__drag-icon");
    let startY, startHeight, isDrragging = false;
    const updateSheetHeight = height => {
        sheetContent.style.height = `${height}vh`;
        bottomSheet.classList.toggle("_fullscreen", height === 100);
    };
    const hideBottomSheet = () => {
        bottomSheet.classList.remove("_show");
        document.body.style.overflowY = "auto";
    };
    const showBottomSheet = () => {
        bottomSheet.classList.add("_show");
        document.body.style.overflowY = "hidden";
        updateSheetHeight(50);
    };
    const dragStart = e => {
        isDrragging = true;
        startY = e.pageY || e.touches?.[0].pageY;
        startHeight = parseInt(sheetContent.style.height);
        bottomSheet.classList.add("_dragging");
    };
    const dragStop = () => {
        isDrragging = false;
        bottomSheet.classList.remove("_dragging");
        const sheetHeight = parseInt(sheetContent.style.height);
        sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
    };
    const dragging = e => {
        if (!isDrragging) return;
        const delta = startY - (e.pageY || e.touches?.[0].pageY);
        const newHeight = startHeight + delta / window.innerHeight * 100;
        updateSheetHeight(newHeight);
    };
    document.addEventListener("mouseup", dragStop);
    dragIcon.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragging);
    document.addEventListener("touchend", dragStop);
    dragIcon.addEventListener("touchstart", dragStart);
    document.addEventListener("touchmove", dragging);
    showModalBtn.addEventListener("click", showBottomSheet);
    sheetOverlay.addEventListener("click", hideBottomSheet);
    window["FLS"] = true;
    isWebp();
})();