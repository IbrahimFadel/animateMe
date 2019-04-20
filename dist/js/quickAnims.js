/*
 * Get animation config into usable format
 *
 * @params {OBJECT} Animation config
 * @return {ARRAY} Animation config in usable format
 */

function parseConfigInfo(config) {
    var targets = null;
    var animations = [];
    var infinite = false;
    for (let i = 0; i < Object.keys(config).length; i++) {
        if (Object.keys(config)[i] === "targets") {
            targets = Object.values(config)[i].split(" ");
        } else if (Object.keys(config)[i] === "animations") {
            var animationsLength = Object.keys(config).length - 1;
            for (let x = 0; x < animationsLength; x++) {
                animations.push([
                    Object.keys(Object.values(config)[i])[x],
                    Object.values(Object.values(config)[1])[x]
                ]);
            }
        }
    }

    return [targets, animations];
}

/*
 * Apply animations
 *
 * @params {ARRAY} Animation config in usable format
 */

function applyAnimations(config) {
    var amntTargets = config[0].length;
    var amntAnimations = config[1].length;
    var transforms = "translateY translateX scaleX scaleY rotate skewX skewY".split(
        " "
    );

    for (let i = 0; i < amntTargets; i++) {
        var transformationString = "";
        var target = config[0][i].replace(".", "");
        for (let x = 0; x < amntAnimations; x++) {
            var animation = config[1][x][0];
            var value = config[1][x][1];
            for (let y = 0; y < transforms.length; y++) {
                if (animation == transforms[y]) {
                    transformationString += animation + "(" + value + ")";
                }
                if (y == transforms.length - 1) {
                    for (
                        let z = 0;
                        z < document.getElementsByClassName(target).length;
                        z++
                    ) {
                        document.getElementsByClassName(target)[
                            z
                        ].style.transform = transformationString;
                    }
                }
            }
        }
    }
}

function animate(config) {
    var configData = parseConfigInfo(config);
    applyAnimations(configData);
}

animate({
    targets: ".testElement .nine",
    animations: {
        translateX: "150px",
        rotate: "-60deg"
    },
    infinite: false
});
