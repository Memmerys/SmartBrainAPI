
const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('not valid submission');
    }

    db.select('email', 'hash').from('login')
     .where('email', '=', email)
     .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
             res.json(user[0])
            })
            .catch(err => res.status(400).jason('unable to get user'))
        } else {
        res.status(400).json('Wrong name or password')
        }
     })
     .catch(err => res.status(400).json('Wrong name or password'))
 }

 module.exports = {
    handleSignin: handleSignin
 };