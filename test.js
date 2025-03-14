const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const signJwt = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

const user = {
    _id: "abcdefgh",
    password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNkZWZnaCIsImlhdCI6MTc0MTk0ODA2MiwiZXhwIjoxNzQxOTUxNjYyfQ.hue4gNOlgDtfZAfxZidRPjsxhyEjkdrt_hU2B8J1gn8"
}
async function run() {
    const token = await signJwt(user._id);
    console.log(token)

    const password = "123123";
    const email = "raiyan.c.me@gmail.com";

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const verification = await verifyJwt(token)

    if (!isPasswordValid) {
        console.log("not valid")
    } else {
        console.log("valid")
    }
    if (!verification) {
        console.log("not valid token")
    } else {
        console.log("valid token")
    }

}
run()

