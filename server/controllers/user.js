
const User = require('../models/user')

exports.createUsers = async(req,res) =>{
    const {username,name,email,gender,profile} = req.body
    try {
        if(!name || !username || !email || !profile || !gender){
            return res.status(400).json({message:"Please fill all the detail"})
        }

        
        
        const users = User({username,name,email,gender,profile})
        await users.save()

        res.status(201).json({
            success:true,
            data:users,
            message:"User created successfully 🔥"
        })
    } catch (error) {
        res.status(500).json({message:error})
        process.exit()
    }
}

exports.getUsers = async(req,res)=>{
    try {
      const user = await  User.find({});
      res.status(200).json({
        success:true,
        data:user,
        message:"fetched all data successfully 🔥"
      })
    } catch (error) {
        res.status(500).json({message:error})
        process.exit()
    }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully 🗑️" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "User updated successfully ✏️" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
