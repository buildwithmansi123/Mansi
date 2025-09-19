import jwt from 'jsonwebtoken';

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, meassage: "Logged out" });
        } else {
            return res.json({ success: false, meassage: "invalid Credentials" });
        }
    } catch (error) {
        console.log(error.meassage);
        res.json({ success: false, meassage: error.meassage });
    }
}


// Seller is-Auth /api/seller/is-Auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}




//logout Seller/api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'productionn',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: 'logged Out' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}        