const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        console.log("Données reçues du Frontend :", req.body); // Pour voir ce qu'Angular envoie
        const {email,password,firstName,lastName} = req.body;
        const saltRounds = 10;


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //on créer le user
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        //save le user
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.error("ERREUR MONSTRUEUSE :", error);
        res.status(500).json({ message: 'Server error' });
    }
}


const login = async (req, res) => {
    try {

        //recupere les champs email et password du body de la requete
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "invalide email" });
        }
        //verification de mot de pass 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

        res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

    const getUserInfos = async (req, res) => {
        try {
            const userId = req.params.userId; // Récupérez l'ID de l'utilisateur à partir des paramètres de la requête
            const userInfos = await User.findById(userId).select('-password'); // Récupérez les projets liés à l'utilisateur
            res.status(200).json(userInfos);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }


    const saveProfile = async (req, res) => {
        try {
            const urlUserId = req.params.userId; // Récupérez l'ID de l'utilisateur à partir des paramètres de la requête
            const loggedInUserId = req.auth.userId; // Récupérez l'ID de l'utilisateur connecté à partir du token d'authentification

            if (urlUserId !== loggedInUserId) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            // Récupérez les champs à mettre à jour à partir du corps de la requête
            const {firstName,lastName,bio,title,profileImage} = req.body;
            // Mettez à jour les informations de l'utilisateur dans la base de données
            const updatedUser = await User.findByIdAndUpdate(
                loggedInUserId, 
                { $set: { firstName, lastName, bio, title, profileImage } },
                { new: true, runValidators: true }
            ).select('-password');
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" }); 
            }
            res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    
        }
        catch (error) {
            res.status(500).json({ message: "Server error" }); 
        } 
    }






module.exports ={ register, login, getUserInfos,saveProfile}