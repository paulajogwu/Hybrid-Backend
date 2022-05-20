const account = require('../model/userModel')
const bcrypt = require('bcrypt')


exports.createUser = async (req, res, next) => {
  const userName = req.body.userName
  const userType = req.body.userType
  const passwordd = req.body.password

  // Check if user  exits
  if (
    userName == '' ||
    userName == null ||
    userType == '' ||
    userType == null ||
    passwordd == '' ||
    passwordd == null
  ) {
    res.status(500).json({
      status: false,
      message:
        'Fill out all required fields ( userName, userType,password)',
      data: null,
    })
  } else {
    // get the total users object of available users
    var all_users = await account
      .findAll({})
      .then((users) => users)
      .catch(() => null)
    //console.log("we move", all_users)

    // check user email
    var check_userName = await account
      .findOne({ where: { userName } })
      .then((user) => user)
      .catch(() => null)

 

    // if userName exist
    if (check_userName) {
      // If user exists with same username
      res.status(400).json({
        status: false,
        message: 'A user exist with same username',
        user: null,
      })
    }

    else {
      try {
        var save = await account.create({
          userName,
          userType,
          password: bcrypt.hashSync(passwordd, 10),
        })

        if (save) {
          var userId = save.id
          req.session.userId = userId
          req.session.userName = userName
          req.session.userType = userType
          console.log('saved user', req.session.userId)
          return res.status(200).json({
            status: true,
            user: save,
            message: 'Registration Successful',
          })
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: `Error saving user: ${err}`,
          user: null,
        })
      }

    }
  }
}



exports.login = async (req, res, next) => {
    const userName = req.body.userName
    const password = req.body.password
    // find user, and exclude the pin column
  
    if (userName == null || userName == '' || password == null || password == '') {
      res.status(500).json({
        status: false,
        message: 'Fill out all required',
        data: null,
      })
    } else {
      account
        .findOne({ where: { userName } })
        .then((user) => {
          if (!user) {
            // If user does not exists
            res.status(404).json({
              status: false,
              message: 'User not found',
              data: null,
            })
            // console.log(res)
          } else {
            let hash = user.password
  
            // Match password
            if (bcrypt.compareSync(password, hash)) {
              //if Passwords match
  
              // fetch user wallet and return wallet and user details
              var id = user.id
              account.findOne({ where: { id } }).then((userInfo) => {
                var userId = userInfo.id
                var userName = userInfo.userName
                var userType = userInfo.userType
                req.session.userId = userId
                req.session.userName = userName
                req.session.userType = userType
             
                if (!userInfo) {
                  res.status(404).json({
                    status: false,
                    message: 'No record found',
                    data: null,
                  })
                } else {
                  res.status(200).json({
                    status: true,
                    userInfo,
                    message: 'Login Successful',
                  })
                }
              })
            } else {
              //Passwords don't match
              res.status(400).json({
                status: false,
                message: 'Password Incorrect',
                data: null,
              })
            }
          }
        })
        .catch((err) => console.log(err))
    }
  },

  exports.findAll = async (req, res) => {
    let userType ='seller'
    const users = await account.findAll({ where:{userType}})
       if (!users) {
      return res.status(400).send({
        message: `No user found `,
      });
    }
    console.log("good",users)
    return res.status(200).send(users);
    
  }
