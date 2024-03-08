const express =require("express");
const cors =require("cors");
const mysql =require("mysql2");
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const bodyParser = require('body-parser');
const app=express();
app.use(express.json());
app.use(cors());

// Serve uploads directory as a static folder
app.use('/uploads', express.static('uploads'));

// Body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const randomName = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const uniqueFilename = randomName + '-' + timestamp + ext;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });


// const db=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"MySQL",
//     database:"product_shop"
// });


const db=mysql.createConnection({
    host:"mysql-ecdf2f5-rayanzahabi-142b.a.aivencloud.com",
    port:17040,
    user:"avnadmin",
    password:"AVNS_8IDY9c5PXj3edLbyovH",
    database:"defaultdb",
    ssl  : {
        ca : fs.readFileSync(__dirname + '/ca.pem')
      }
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to database');
});
// Define the uploads folder path
const uploadsFolderPath = path.join(__dirname, 'uploads');

app.get("/",(req,res)=>{
    const sql ="SELECT * FROM products";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.get("/product",(req,res)=>{
    const sql ="SELECT * FROM products";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})


app.post('/create', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const { fullname, merchantemail, storeid } = req.body;
    // const image = req.files ? uploadImage(req.files.image) : null;

    const sql = "INSERT INTO products (`full_name`, `merchant_email`, `store_id`, `image`) VALUES (?, ?, ?, ?)";
    const values = [fullname, merchantemail, storeid, image];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ error: 'Error inserting product' });
        }
        return res.status(201).json({ message: 'Product created successfully' });
    });
});


app.put('/update/:id', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const { fullname, merchantemail, storeid } = req.body;
    // const image = req.files ? uploadImage(req.files.image) : null;
    const id=req.params.id;

    const sql = "UPDATE products SET full_name=?, merchant_email=?, store_id=?, image=? WHERE id=?";
    const values = [fullname, merchantemail, storeid, image, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Error updating product' });
        }
        return res.status(201).json({ message: 'Product updated successfully' });
    });
});

app.delete("/product/:id", (req,res)=>{
    const productId=req.params.id;
    const q="DELETE FROM products WHERE id = ?"

    db.query(q,[productId], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data) ;
    })
})

app.get("/storeLocations", (req, res) => {
    const sql = "SELECT id, location FROM store";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch product details by ID
app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [productId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]); 
    });
});

app.post('/arrange-objects', (req, res) => {
    const inputArray = req.body["input-array"];
  
    // Function to arrange objects recursively
    const arrangeObjects = (arr, result = []) => {  
      const currentItem = arr.shift();

      if (arr.length === 0) {
        result.push(currentItem);
        return result;
      }
      const { first_id, second_id } = currentItem;
  
      const nextItemIndex = arr.findIndex(item => item.first_id === second_id);
  
      if (nextItemIndex !== -1) {
        result.push(currentItem);
        return arrangeObjects(arr, result);
      } else {
        arr.push(currentItem);
        return arrangeObjects(arr, result);
      }
    };
  
    const outputArray = arrangeObjects([...inputArray]);
  
    res.json(outputArray);
  });

app.listen(3000,()=>{
    console.log("listening");
})