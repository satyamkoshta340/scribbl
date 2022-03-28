

const CreateSession = async (req, res) =>{
    console.log("creating session....")
    // const name = req.body.name;
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = ""
    let charactersLength = characters.length;

    for ( var i = 0; i < 7 ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    res.json({
        'id': result
    });
}

module.exports = {
    CreateSession
}