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

function applyAnimations(config) {
    const targets = config[0];
    const settings = config[1];
    const animations = config[2];

    // Apply to Classes through classes
    const amntClassTargets = targets[0].length;
    for (let i = 0; i < targets[0].length; i++) {
        const currentTarget = targets[0][i];
        const elements = document.getElementsByClassName(currentTarget);
        for (let element of elements) {
            element.style.transition =
                "all " + settings.duration + " " + settings.easing;
            for (let animation of animations) {
                const animationName = animation[0];
                const animationValue = animation[1];
                let transformString = "";
                if (animationName === "translateX") {
                    transformString += "translateX(" + animationValue + ")";
                    // element.style.transform =
                    // "translateX(" + animationValue + ")";
                } else if (animationName === "skewX") {
                    transformString += "skewX(" + animationValue + ")";
                    // element.style.transform = "skewX(" + animationValue + ")";
                }
                console.log(transformString);
                element.style.transform = transformString;
            }
        }
    }

    // for (let typeOfTarget of targets) {
    //     typeOfTarget.forEach((targetValue, i) => {
    //         if (i === 0) {
    //             const elements = document.getElementsByClassName(targetValue);
    //             console.log(elements, i);
    //         }
    //     });
    // }
}

function animateMe(config) {
    const parsedConfig = parseConfig(config);
    applyAnimations(parsedConfig);
}

animateMe({
    targets: ".testElement .nine #idTarget",
    animations: {
        translateX: {
            value: "100px"
        },
        skewX: {
            value: "25deg"
        }
    },
    infinite: false,
    delay: "0",
    duration: "3s",
    easing: "ease"
});
