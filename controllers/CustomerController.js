const customerModel = require("../model/CustomerModel");
const bcrypt = require("bcryptjs")
const saltRound = 10;
// const jwt = require("jsonwebtoken"); // For token generation



const SignUpCustomer = async (req, res) => {
   try {
      console.log(req.body);
      const { firstname, lastname, email, Password } = req.body;

      if (!firstname || !lastname || !email ||  !Password) {
         return res.status(400).json({ message: "All fields are mandatory", status: false });
      }
      const existingUser = await customerModel.findOne({ email });
      if (existingUser) {
         return res.status(407).json({ message: "User Already exists", status: false });
      }
      const hashedPassword = await bcrypt.hash(Password, saltRound)
      const createdCustomer = await customerModel.create(
         {
            firstname, lastname, email, Password:hashedPassword
         }
      );

      if (!createdCustomer) {
         return res.status(402).json({ message: "An error occurred when creating customer", status: false });
      }

      return res.status(200).json({ message: "Customer Created Successfully", status: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
   }
};

const LoginCustomer = async (req, res) => {
   try {
      console.log(req.body);
      const { email, Password } = req.body;

      if (!email || !Password) {
         return res.status(400).json({ message: "Email and Password are required", status: false });
      }
      const existingCustomer = await customerModel.findOne({ email });
      console.log(existingCustomer);
      
      if (!existingCustomer) {
         return res.status(404).json({ message: "User not found", status: false });
      }
      
      const ValidPassword = await bcrypt.compare(Password, existingCustomer.Password);
      if (!ValidPassword) {
         return res.status(401).json({ message: "Invalid credentials", status: false });
      }

      // Generate JWT Token
      // const token = jwt.sign({ id: existingCustomer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful", status: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
   }
};

module.exports = { SignUpCustomer, LoginCustomer };
