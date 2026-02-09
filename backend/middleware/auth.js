const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        //recupération de token dans le header authorization
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        // Vérification du token avec clé de env
        const decocedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Ajout de l'id de l'utilisateur dans la requete
        const userId = decocedToken.userId;

        // Ajout de l'id de l'utilisateur dans la requete
        req.auth = { userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
}

module.exports= authMiddleware;