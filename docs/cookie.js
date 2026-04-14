(function () {
    var bar = document.getElementById("web-cookie-bar");
    var closeBtn = document.getElementById("web-cookie-close");
    var sidebar = document.getElementById("cookie-sidebar");
    var layout = document.getElementById("page-layout");
    var countEl = document.getElementById("cookie-count");

    if (!bar || !closeBtn) return;

    var count = 0;
    var BOTTOM_ZONE_PX = 110;
    var policyLink = bar.querySelector(".web-cookie-bar__text a");

    function setBarFocusable(on) {
        var v = on ? 0 : -1;
        closeBtn.tabIndex = v;
        if (policyLink) policyLink.tabIndex = v;
    }

    function clearBarInlinePosition() {
        bar.style.left = "";
        bar.style.top = "";
        bar.style.right = "";
        bar.style.bottom = "";
        bar.style.transform = "";
        bar.style.transition = "";
    }

    function placeBar() {
        clearBarInlinePosition();
        bar.classList.remove("web-cookie-bar--revealed");
        setBarFocusable(false);
        bar.removeAttribute("hidden");

        // NEW: Randomize position if we've closed it at least once
        if (count > 0) {
            // Briefly reveal to get actual dimensions before placing
            bar.style.visibility = 'hidden';
            bar.classList.add("web-cookie-bar--revealed");

            var maxX = Math.max(0, window.innerWidth - bar.offsetWidth);
            var maxY = Math.max(0, window.innerHeight - bar.offsetHeight);

            // Calculate random coordinates keeping it inside the viewport
            var randomX = Math.floor(Math.random() * maxX);
            var randomY = Math.floor(Math.random() * maxY);

            // Apply new inline positions and override default CSS behaviors
            bar.style.left = randomX + "px";
            bar.style.top = randomY + "px";
            bar.style.bottom = "auto";
            bar.style.right = "auto";
            bar.style.transform = "none"; // Stop it from offsetting 50% left
            bar.style.transition = "none"; // Snap instantly when randomizing

            bar.style.visibility = ''; // Restore visibility
        }
    }

    function tryRevealFromPointer(clientY) {
        if (count > 0) return; // Disable hover reveal once it goes random
        if (bar.hasAttribute("hidden")) return;
        if (clientY < window.innerHeight - BOTTOM_ZONE_PX) return;
        if (bar.classList.contains("web-cookie-bar--revealed")) return;
        bar.classList.add("web-cookie-bar--revealed");
        setBarFocusable(true);
        try {
            closeBtn.focus({ preventScroll: true });
        } catch (e) {
            closeBtn.focus();
        }
    }

    document.addEventListener(
        "mousemove",
        function (e) {
            tryRevealFromPointer(e.clientY);
        },
        { passive: true }
    );

    document.addEventListener(
        "touchstart",
        function (e) {
            var t = e.touches[0];
            if (t) tryRevealFromPointer(t.clientY);
        },
        { passive: true }
    );

    function onClose() {
        count += 1;
        if (countEl) {
            countEl.textContent = String(count);
            countEl.classList.remove("sidebar-counter--pop");
            void countEl.offsetWidth; // trigger reflow
            countEl.classList.add("sidebar-counter--pop");
        }
        if (sidebar) sidebar.removeAttribute("hidden");
        
        // We removed layout.classList.add("page-layout--play") here 
        // to prevent the base text from shifting.

        bar.classList.remove("web-cookie-bar--revealed");
        setBarFocusable(false);
        bar.setAttribute("hidden", "");

        window.setTimeout(function() {
            placeBar();
            if (count > 0) {
                // Force it to stay revealed in its new random spot immediately
                bar.classList.add("web-cookie-bar--revealed");
                setBarFocusable(true);
            }
        }, 120);
    }

    closeBtn.addEventListener("click", onClose);
    placeBar();
})();