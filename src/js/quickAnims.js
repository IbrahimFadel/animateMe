/*
 * Get all target in the config and return them in a usable format
 *
 * @param {OBJECT} config
 * @return {ARRAY} targets
 */

function getTargets(config) {
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
}

/*
 * Get all animations and their info and return them in a usable format
 *
 * @param {OBJECT} config
 * @return {ARRAY} animations
 */

function getAnimations(config) {
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
}

/*
 * See if animation is infinite
 *
 * @param {OBJECT} config
 * @return {BOOLEAN} isInfinite
 */

function isInfinite(config) {
    var infinite;
    var keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "infinite") {
            infinite = Object.values(Object.values(config))[i];
        }
    }

    return infinite;
}

/*
 * Get animation config into usable format
 *
 * @params {OBJECT} Animation config
 * @return {ARRAY} Animation config in usable format
 */

function parseConfigInfo(config) {
    var targets = getTargets(config);
    var animations = getAnimations(config);
    var infinite = isInfinite(config);

    var parsedConfigInfo = [targets, animations, infinite];

    return parsedConfigInfo;
}

/*
 * Apply animations
 *
 * @params {ARRAY} Animation config in usable format
 */

function applyAnimations(config) {
    // console.log(config);
    var amntTargets = config[0].length;
    var amntAnimations = config[1].length;
    var infinite = config[2];

    for (let i = 0; i < amntTargets; i++) {
        for (let x = 0; x < amntAnimations; x++) {
            let target = config[0][x];
            let animation = config[1][x][0];
            let delay = config[1][x][1];
            let duration = config[1][x][2];
            let easing = config[1][x][3];
            let value = config[1][x][4];
            console.log(target, animation, delay, duration, easing, value);
        }
    }
}

/*
 * User calls this to make their animation
 *
 * @param {OBJECT} config
 */

function animate(config) {
    var configData = parseConfigInfo(config);
    applyAnimations(configData);
}

animate({
    targets: ".testElement .nine",
    animations: {
        translateX: {
            value: "100px",
            delay: "1000",
            duration: "1000",
            easing: "ease"
        },
        rotate: {
            value: "60deg",
            delay: "500",
            duration: "500",
            easing: "ease"
        }
    },
    infinite: false
});
