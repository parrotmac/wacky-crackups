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
    let windowWidth = window.innerWidth;

    const _setElementOffset = (el, offset) => {
        // el.style.transform = `translateX(${offset}px)`;
        // el.style.left = `${offset}px`;

        // Margin left seems to be the least bad on Android, and doesn't break on iOS
        el.style.marginLeft = `${offset}px`;
    };

    const setLeftDelta = delta => {
        clampedDelta = clamp(sledPosition + delta, -getMaxOffset(), 0);
    };

    let lastUpdatedDelta = 0;
    const _updateElementDelta = () => {
        if(lastUpdatedDelta !== clampedDelta) {
            _setElementOffset(characterSled, clampedDelta);
            lastUpdatedDelta = clampedDelta;
        }
        window.setTimeout(() => window.requestAnimationFrame(_updateElementDelta), 100);
    };

    window.requestAnimationFrame(_updateElementDelta);

    const mc = new Hammer.Manager(characterSled, {});
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 }) );
    mc.on("panstart", () => (sledPosition = clampedDelta));
    mc.on('panright', evt => setLeftDelta(evt.deltaX));
    mc.on('panleft', evt => setLeftDelta(evt.deltaX));
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
