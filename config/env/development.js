module.exports = {
    db: "mongodb://localhost/fittr-dev",
    app: {
        name: "MEAN - A Modern Stack - Development"
    },
    facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "307901336212-ovb1i4ubia0nb93gbsqa367jqo7jnalf.apps.googleusercontent.com",
        clientSecret: "Hnb0mmEgHZn7sa0wAaaeIYYY",
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    }
}