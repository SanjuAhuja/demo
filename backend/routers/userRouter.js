import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get('/top-sellers', expressAsyncHandler(async(req, res) => {
  const topSellers = await User.find({ isSeller: true })
  .sort({ 'seller.rating': -1 })
  .limit(3);
  res.send(topSellers);
})
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
     //await User.remove({});
     console.log('Text');
    const createdUsers = await User.insertMany(data.users);
    res.send( "createdUsers" );
  })
);

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(user) {
    if(req.body.password, user.password) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user)
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
      token: generateToken(createdUser),
    });
  })
);


userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(user)
  {
    res.send(user)
  }
  else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

userRouter.put(
  '/profile',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
          const { name, email, password } = req.body;
          user.name = name;
          user.email = email;
          user.password = password;   
          if(user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
          }    
          const updateUser = await user.save();
          res.json(updateUser);
      } else {
          res.send('user not found')
      }

  } catch (err) {
      res.send('error', err);
  }
  }
));


userRouter.get('/', expressAsyncHandler(async(req, res) => {
  const users = await User.find({});
  res.send(users);
})
);

userRouter.delete('/:id', expressAsyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    if(user.email === 'sanju123@gmail.com') {
      res.status(400).send({ message: 'Can not Delete Admin User' });
      return;
    }
    const deleteUser = await user.remove();
    res.send({ message: 'User Deleted', user: deleteUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

userRouter.put('/:id', expressAsyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = req.body.isSeller || user.isSeller;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updateUser = await user.save();
    res.send({ message: 'User Updated' , user: updateUser });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
})
);

export default userRouter;