const expressJwt = require('express-jwt/lib');
const config = require('../../config');
const userService = require('../Users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/socket.io',
            '/api/v1/users/login',
            '/api/v1/users/signup',
            '/api/v1/reports',
            '/api/v1/reports/filter',
            '/api/v1/feeds'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};