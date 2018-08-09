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

    const setLeftDelta = delta => {
        const newDelta = sledPosition + delta;
        const clampedDelta = clamp(newDelta, -getMaxOffset(), 0);
        console.log(clampedDelta, newDelta, getMaxOffset());
        characterSled.style.left = `${clampedDelta}px`;
    };

    const getSledLeft = () => {
        const parsedVal = parseInt(characterSled.style.left);
        if (characterSled.style.left.indexOf("px") < 0 || parsedVal === "NaN") {
            return 0;
        }
        return parsedVal;
    };

    var hammertime = new Hammer(characterSled, {
        direction: Hammer.DIRECTION_HORIZONTAL
    });
    hammertime.on("panstart", () => (sledPosition = getSledLeft()));
    hammertime.on("pan", evt => setLeftDelta(evt.deltaX));
    window.addEventListener("resize", () => setLeftDelta(0));

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
