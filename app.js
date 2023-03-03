const express = require('express');
const app = express();
/* const path = require("path"); */

const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* app.use(express.static(path.join(__dirname,'views')))
app.get('/',(req,res)=>{
  res.sendFile('index.html')
}) */
const animals = {
  Cows:50,
   Dogs: 1,
   Pigs:100,
   Sheep:20
   }

  app.get('/return_crew', (req, res) => {
    res.send(animals);
  });

  app.get('/return_number_of_animals_per_category/:category', (req, res) => {
      res.status(200).json(animals[req.params.category]);
  })

  app.put('/newAnimal', (req, res) => {
    res.status(200).json(animals[req.body.category] = req.body.count)
  })

  app.delete('/deleteAnimals/:category', (req, res) => {
    delete animals[req.params.category]
    res.status(200).json(animals)
  })

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});