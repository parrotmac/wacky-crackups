const WackyActionSlide = (slideWrapper, characterSled) => {

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

    const _setElementOffset = (el, offset) => {
        el.style.marginLeft = `${offset}px`;
    };

    const setLeftDelta = delta => {
        const instanceDelta = (delta + sledPosition);
        const velocityAdjustedDelta = instanceDelta + (delta * 0.5); // TODO: Add scroll effect using velocity
        clampedDelta = clamp(velocityAdjustedDelta, -getMaxOffset(), 0);
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
        velocity = 0;
        sledPosition = clampedDelta;
    });
    mc.on('panleft', panHandler);
    mc.on('panright', panHandler);
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
};

const slideWrapper = document.querySelector("#characterSledWrapper");
const characterSled = document.querySelector("#characterSled");

if(slideWrapper !== null && characterSled !== null) {
    WackyActionSlide(slideWrapper, characterSled);
}
