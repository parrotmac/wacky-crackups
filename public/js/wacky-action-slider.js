const WackyActionSlide = (slideWrapper, characterSled, leftFab, rightFab) => {

    const CLICK_MOVE_MULTIPLIER = 0.3; // Move 30% per click

    // Returns viewable width of wrapper
    const getWrapperWidth = () => slideWrapper.offsetWidth;

    // Returns overflowed width of sled
    const getSledWidth = () => characterSled.scrollWidth;

    const getMaxOffset = () => getSledWidth() - getWrapperWidth();

    const clamp = (val, min, max) => {
        return Math.min(Math.max(val, min), max);
    };

    let sledPosition = 0;
    let clampedDelta = 0;
    let velocity = 0;
    let windowWidth = window.innerWidth;

    const setFabVisibility = (fabElement, shown) => {
        if(shown) {
            fabElement.classList.add("shown");
        } else {
            fabElement.classList.remove("shown");
        }
    }

    const notifyFabOfOffset = (newPostition) => {
        if(newPostition === 0) {
            setFabVisibility(leftFab, false);
        } else {
            setFabVisibility(leftFab, true);
        }

        if (Math.abs(newPostition) === getMaxOffset()) {
            setFabVisibility(rightFab, false);
        } else {
            setFabVisibility(rightFab, true);
        }
    };
    notifyFabOfOffset(0);

    const _setElementOffset = (el, offset) => {
        el.style.marginLeft = `${offset}px`;
    };

    const setTransitionEnabled = enable => {
        if(enable) {
            characterSled.classList.remove("no-transition");
        } else {
            characterSled.classList.add("no-transition");
        }
    }

    const setLeftDelta = delta => {
        const instanceDelta = (delta + sledPosition);
        const velocityAdjustedDelta = instanceDelta + (delta * 0.5); // TODO: Add scroll effect using velocity
        clampedDelta = clamp(velocityAdjustedDelta, -getMaxOffset(), 0);
        notifyFabOfOffset(clampedDelta);
        _setElementOffset(characterSled, clampedDelta);
    };

    const panHandler = (evt) => {
        if(evt.velocityX > velocity) {
            velocity = evt.velocityX;
        }
        setLeftDelta(evt.deltaX);
    };

    const mc = new Hammer.Manager(characterSled, {});
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 }) );
    mc.on("panstart", () => {
        setTransitionEnabled(false);
        velocity = 0;
        sledPosition = clampedDelta;
    });
    mc.on('panleft', panHandler);
    mc.on('panright', panHandler);
    mc.on('panend', () => setTransitionEnabled(true));
    window.addEventListener("resize", () => {
        const newWidth = window.innerWidth;
        if(newWidth !== windowWidth) {
            windowWidth = newWidth;
            setLeftDelta(0)
        }
    });

    const _imgs = characterSled.querySelectorAll("img");
    const imgs = [].slice.call(_imgs);
    imgs.forEach(img =>
        img.addEventListener("dragstart", evt => evt.preventDefault())
    );

    const leftFabClick = () => {
        sledPosition = clampedDelta;
        setLeftDelta( getWrapperWidth() * CLICK_MOVE_MULTIPLIER );
    }
    const rightFabClick = () => {
        sledPosition = clampedDelta;
        setLeftDelta( -( getWrapperWidth() * CLICK_MOVE_MULTIPLIER ) );
    }
    leftFab.addEventListener('click', leftFabClick, false);
    rightFab.addEventListener('click', rightFabClick, false);
};

const slideWrapper = document.querySelector("#characterSledWrapper");
const characterSled = document.querySelector("#characterSled");
const leftFab = document.querySelector("#leftSledFAB");
const rightFab = document.querySelector("#rightSledFAB");

if(slideWrapper !== null) {
    WackyActionSlide(slideWrapper, characterSled, leftFab, rightFab);
}
