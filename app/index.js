import express from 'express'
import mongoose from 'mongoose';
// import { Course } from './model/course.js';
import { Users } from './model/users.js';

const PORT = 3000;

const url = 'mongodb://127.0.0.1/study';

const app = express();

app.use(express.static('css'));

app.set('view engine', 'pug');

mongoose.connect(url)
        .then(()=> {
            console.log('Connected to DB');
            app.listen(PORT, ()=> {
                console.log(`Server started on http://localhost:${PORT}`);
            })
        })
        .catch((err)=> {console.log(`DB connection error: ${err}`)});

app.get('/', async(req, res) => {
    try {
        const users = await Users.find();
        res.render('index', {users})
       
    } catch (err){
        console.log(err);
    }});
  
    app.use(express.urlencoded({ extended: true }));
    app.get('/edit/:id', async (req, res)=> {
        try{
            const user = await Users.findById(req.params.id)
            res.render('edit', {user})
        } catch(err){
            console.log(err);
        } 
    });
    
    app.post('/edit/:id', async (req, res)=> {
        try{
            await Users.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/');
        } catch(err){
            console.log(err);
        }
    });
    
    app.post('/add', async (req, res) => {
        try {
            const { name, age, status, link } = req.body;
            
            if (!name || !age || !status || !link) {
                const users = await Users.find({});
                return res.render('index', { users, errorMessage: 'All fields are required' });
            }
            const newUser = new User({ name, age, status, link });
            await newUser.save();
            res.redirect('/');
        } catch (err) {
            res.status(500).send(`Error: ${err}`);
        }
    });

    app.delete('/remove/:id', async (req, res)=> {
        try{
            await Users.deleteOne({_id: req.params.id})
            res.status(200).json({ message: 'Course deleted' });
        } catch(err){
            console.log(err);
        }
    });
    