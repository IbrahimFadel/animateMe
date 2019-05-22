function wait(mil) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved");
        }, mil);
    });
}

/*
 * Get all the targets and organize them into classes and ids
 *
 * @param {OBJECT} config
 * @return {ARRAY} targets
 */

function getTargets(config) {
    const amntObjectKeys = Object.keys(config).length;
    let targetsString = null;
    for (let i = 0; i < amntObjectKeys; i++) {
        const currentObjectKey = Object.keys(config)[i];
        const currentObjectValue = Object.values(config)[i];
        if (currentObjectKey === "targets") {
            targetsString = currentObjectValue;
        }
    }
    const targetsArray = targetsString.split(" ");
    let classTargets = [];
    let idTargets = [];
    for (let target of targetsArray) {
        const targetPrefix = target.slice(0, 1);
        if (targetPrefix === ".") {
            const targetCharArr = target.split("");
            targetCharArr.splice(0, 1);
            const targetWithoutPrefix = targetCharArr.join("");
            classTargets.push(targetWithoutPrefix);
        } else if (targetPrefix === "#") {
            const targetCharArr = target.split("");
            targetCharArr.splice(0, 1);
            const targetWithoutPrefix = targetCharArr.join("");
            idTargets.push(targetWithoutPrefix);
        }
    }
    const targets = [classTargets, idTargets];

    return targets;
}

/*
 * Get all the settings(infinite, delay, duration, easing)
 *
 * @param {OBJECT} config
 * @return {OBJECT} settings
 */

function getAnimationSettings(config) {
    const configKeys = Object.keys(config);
    const configValues = Object.values(config);
    let settings = {};
    configKeys.forEach((key, i) => {
        let value = configValues[i];
        if (key === "infinite") {
            settings.infinite = value;
        } else if (key === "delay") {
            settings.delay = value;
        } else if (key === "duration") {
            settings.duration = value;
        } else if (key === "easing") {
            settings.easing = value;
        }
    });

    return settings;
}

/*
 * Find all the animation names and their values
 *
 * @param {OBJECT} config
 * @return {ARRAY} animations
 */

function getAnimations(config) {
    const configKeys = Object.keys(config);
    const configValues = Object.values(config);
    let animations = [];
    configKeys.forEach((configKey, i) => {
        let configValue = configValues[i];
        if (configKey === "animations") {
            const animationKeys = Object.keys(configValue);
            const animationValues = Object.values(configValue);
            animationKeys.forEach((animationKey, x) => {
                const animationValue = animationValues[x].value;
                const animation = [animationKey, animationValue];
                animations.push(animation);
            });
        }
    });

    return animations;
}

/*
 * Find all of the information in the config
 *
 * @param {OBJECT} config
 * @return {ARRAY} parsed config
 */

function parseConfig(config) {
    const targets = getTargets(config);
    const settings = getAnimationSettings(config);
    const animations = getAnimations(config);

    const parsedConfig = [targets, settings, animations];

    return parsedConfig;
}

/*
 * When applying transformations with javascript, we need to put it
 * all on one line. This function takes in the animations, and creates
 * the single line with all the transformations
 *
 * @param {ARRAY} animations
 * @return {STRING} transformation string
 */

function createTransformString(animations) {
    var transformString = "";

    const amntAnimations = animations.length;
    for (let i = 0; i < amntAnimations; i++) {
        const animationName = animations[i][0];
        const animationValue = animations[i][1];
        transformString += animationName + "(" + animationValue + ")";
    }

    return transformString;
}

/*
 * Apply all the animations with delay, duration, and easing
 *
 * @param {OBJECT} config
 */

async function applyAnimations(config) {
    const targets = config[0];
    const settings = config[1];
    const animations = config[2];

    const delay = settings.delay;
    const duration = settings.duration;
    const easing = settings.easing;
    const infinite = settings.infinite;

    const transformString = createTransformString(animations);

    setTimeout(() => {
        for (let i = 0; i < targets.length; i++) {
            if (i === 0) {
                // It's a class
                for (let x = 0; x < targets[i].length; x++) {
                    const currentElements = document.getElementsByClassName(
                        targets[i][x]
                    );
                    for (let j = 0; j < currentElements.length; j++) {
                        currentElements[j].style.transition =
                            "transform " + duration + " " + easing;
                        currentElements[j].style.transform = transformString;
                    }
                }
            } else if (i === 1) {
                // It's an id
                for (let x = 0; x < targets[i].length; x++) {
                    const currentElement = document.getElementById(
                        targets[i][x]
                    );
                    currentElement.style.transition =
                        "transform " + duration + " " + easing;
                    currentElement.style.transform = transformString;
                }
            }
        }
    }, delay);

    const delayPlusDuration =
        parseInt(delay) + parseInt(duration.slice(0, -1) + "000");

    await wait(delayPlusDuration);
}

/*
 * Main function of library
 *
 * @param {OBJECT} config
 *
 * ENJOY!
 */

async function animateMe(config) {
    const parsedConfig = parseConfig(config);
    await applyAnimations(parsedConfig);
}
