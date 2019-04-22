/*
 * Get all target in the config and return them in a usable format
 *
 * @param {OBJECT} config
 * @return {ARRAY} targets
 */

getTargets = config => {
    var configLength = Object.keys(config).length;
    for (let i = 0; i < configLength; i++) {
        var keys = Object.keys(config);
        if (keys[i] === "targets") {
            if (Object.values(Object.values(config))[i].includes(".")) {
                var targets = Object.values(Object.values(config))[i].split(
                    " "
                );
            }
        }
    }
    for (let i = 0; i < targets.length; i++) {
        targets[i] = targets[i].replace(".", "");
    }

    return targets;
};

/*
 * Get all animations and their info and return them in a usable format
 *
 * @param {OBJECT} config
 * @return {ARRAY} animations
 */

getAnimations = config => {
    var animations = [];
    var keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "animations") {
            let animationsObject = Object.values(config)[i];
            let delay, duration, easing, value;
            let names = Object.keys(animationsObject);
            for (let x = 0; x < names.length; x++) {
                let animationName = Object.keys(animationsObject)[x];
                let animationObject = Object.values(animationsObject)[x];
                let amntKeys = Object.keys(animationObject).length;
                for (let y = 0; y < amntKeys; y++) {
                    if (Object.keys(animationObject)[y] === "delay") {
                        delay = Object.values(animationObject)[y];
                    } else if (Object.keys(animationObject)[y] === "duration") {
                        duration = Object.values(animationObject)[y];
                    } else if (Object.keys(animationObject)[y] === "easing") {
                        easing = Object.values(animationObject)[y];
                    } else if (Object.keys(animationObject)[y] === "value") {
                        value = Object.values(animationObject)[y];
                    }
                }
                var animation = [animationName, delay, duration, easing, value];
                animations.push(animation);
            }
        }
    }
    return animations;
};

/*
 * See if animation is infinite
 *
 * @param {OBJECT} config
 * @return {BOOLEAN} isInfinite
 */

isInfinite = config => {
    var infinite;
    var keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "infinite") {
            infinite = Object.values(Object.values(config))[i];
        }
    }

    return infinite;
};

/*
 * Get animation config into usable format
 *
 * @params {OBJECT} Animation config
 * @return {ARRAY} Animation config in usable format
 */

parseConfig = config => {
    var targets = getTargets(config);
    var animations = getAnimations(config);
    var infinite = isInfinite(config);

    var parsedConfigInfo = [targets, animations, infinite];

    return parsedConfigInfo;
};

/*
 * Take in animation info, and return that in a string format that can be applied to
 * an html element
 *
 * @params {ARRAY} animationInfo, {STRING} current string in proper format
 * @return {STRING} string in proper format
 */

translateAnimToString = (anim, animString) => {
    let name = anim[0];
    let val = anim[4];
    animString += name + "(" + val + ")";

    return animString;
};

applyDelayDuration = (anim, el) => {
    // console.log(anim, el);
    let duration = anim[2];
    let easing = anim[3];
    el.style.transition = "transform" + " " + duration + " " + easing;
    console.log(duration, easing);
};

/*
 * Apply animations
 *
 * @params {ARRAY} Animation config in usable format
 */

applyAnimations = config => {
    let animString = "";
    config[1].forEach((anim, i) => {
        animString = translateAnimToString(anim, animString);
        config[0].forEach((target, i) => {
            let elements = document.getElementsByClassName(target);
            Array.prototype.forEach.call(elements, (el, i) => {
                applyDelayDuration(anim, el);
            });
        });
    });
    config[0].forEach((target, i) => {
        let elements = document.getElementsByClassName(target);
        Array.prototype.forEach.call(elements, (el, i) => {
            el.style.transform = animString;
        });
    });
};

/*
 * User calls this to make their animation
 *
 * @param {OBJECT} config
 */

function animate(config) {
    var configData = parseConfig(config);
    applyAnimations(configData);
}

animate({
    targets: ".testElement .nine",
    animations: {
        translateX: {
            value: "100px",
            delay: "0",
            duration: "3s",
            easing: "ease"
        },
        skewX: {
            value: "25deg",
            delay: "1000",
            duration: "2s",
            easing: "linear"
        }
    },
    infinite: false
});
