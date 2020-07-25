const process = require('child_process');
const Path = require('path');

module.exports = {

    /**
     * Given a color, fetches nearest matched color information
     * @param {Array<number>} color RGB values
     * @param {number} match Number of matches required
     * @returns {Promise<any>} Result as json object
     */
    lookupColor: function(color, match = 1) {
        return new Promise((resolve, reject) => {
            var path = Path.join(__dirname, "..", "lib", "clt", "lookup.py");
            process.exec("python3 " + path + " --k " + match + " " + color.join(' '), (err, stdout, stderr) => {
                if(err || stderr) return reject(err || stderr);
                
                result = JSON.parse(stdout);
                if(result.status === "success") {
                    resolve({
                        status: "success",
                        given_color: {
                            red: color[0],
                            green: color[1],
                            blue: color[2]
                        },
                        matches: result.result
                    });
                } else {
                    reject("internal server error");
                }
            });
        });
    },

    /**
     * Ensures a number is between the given range
     * @param {number} value The value
     * @param {number} lower Lower range
     * @param {number} upper Upper range
     */
    clamp: function(value, lower, upper) {
        if(value < lower) return lower;
        else if(value > upper) return upper;
        else return value;
    }
};
