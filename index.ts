import Database  from "better-sqlite3";
import express from "express";
import cors from 'cors'


const app = express();
app.use(express.json())
const PORT = 4000;

const db = new Database('./data.db', {
  verbose: console.log
})


const createQuotes = db.prepare (`CREATE TABLE IF NOT EXISTS Quotes (
  id INTEGER,
  name TEXT,
  birthDate TEXT,
  deathDate TEXT,
  image TEXT,
  content TEXT,
  PRIMARY KEY (id)
);`)
createQuotes.run()

const createQuote = db.prepare(`INSERT INTO Quotes (name, birthDate, deathDate, image, content)VALUES (?, ?, ?, ?, ?); `)
const getAllQuotes = db.prepare(`SELECT * FROM quotes`)
const getSingleQuote = db.prepare(`SELECT * FROM quotes WHERE id=?;`)
type Quotes = {
  id: number;
  name: string;
  birthDate: string | null ;
  deathDate: string | null;
  image: string;
  content: string;
};let quotes: Quotes[] = [
  {
    id: 1,
    name: "Dalai Lama",
    birthDate: '1935',
    deathDate: null ,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Dalailama1_20121014_4639.jpg",
    content: "The purpose of our lives is to be happy."
  },
  {
    id: 2,
    name: "John Lennon",
    birthDate: '09/10/1940',
    deathDate: '08/12/1980',
    image: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/c/c/5/7/cc5781ec76634979f9151d8efe000a44.jpg",
    content: "Life is what happens when you’re busy making other plans."
  },
 
  {
    id: 3,
    name: " Stephen King  ",
    birthDate: '21/09/1947',
    deathDate: null,
    image: "https://media.npr.org/assets/img/2020/04/07/stephen-king.by-shane-leonard_wide-f9df986f26c8d66ecb63cf8e49bded6360cbd9d3.jpg?s=1400",
    content: "Get busy living or get busy dying."
  },
  {
    id: 4,
    name: "Mae West",
    birthDate: '17/08/1893',
    deathDate: '22/11/1980' ,
    image: "https://www.biography.com/.image/t_share/MTE5NTU2MzE2NDAzODI4MjM1/mae-west-9528264-1-402.jpg",
    content: "You only live once, but if you do it right, once is enough."
  },
  {
    id: 5,
    name: "Thomas A. Edison",
    birthDate: '11/02/1947' ,
    deathDate: '18/10/1931',
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/1200px-Thomas_Edison2.jpg",
    content: "Many of life’s failures are people who did not realize how close they were to success when they gave up."
  },
  {
    id: 6,
    name: "Albert Einstein",
    birthDate: '14/03/1879',
    deathDate: '18/04/1955',
    image: "https://parade.com/wp-content/uploads/2021/08/albert-einstein-quotes.jpg",
    content: "If you want to live a happy life, tie it to a goal, not to people or things."
  },
  {
    id: 7,
    name: "Babe Ruth",
    birthDate: '06/02/1895',
    deathDate: '16/08/1958',
    image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Babe_Ruth2.jpg",
    content: "Never let the fear of striking out keep you from playing the game."
  },
  {
    id: 8,
    name: "Will Smith",
    birthDate: '25/09/1968' ,
    deathDate: null ,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg",
    content: "Money and success don’t change people; they merely amplify what is already there."
  },
  {
    id: 9,
    name: "Steve Jobs",
    birthDate:' 24/01/1955', 
    deathDate: '05/10/2011',
    image: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg",
    content: "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking."
  },
  {
    id: 10,
    name: "Seneca",
    birthDate: null ,
    deathDate: null ,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Duble_herma_of_Socrates_and_Seneca_Antikensammlung_Berlin_07.jpg/1200px-Duble_herma_of_Socrates_and_Seneca_Antikensammlung_Berlin_07.jpg", 
    content: "Not how long, but how well you have lived is the main thing."
  },
  {
    id: 11,
    name: "Eleanor Roosevelt",
    birthDate: '11/10/1884',
    deathDate: '07/11/1962',
    image: "https://www.biography.com/.image/t_share/MTgwMjA0MzI0Mjg1MDY0NTM2/gettyimages-515252110.jpg",
    content: "If life were predictable it would cease to be life, and be without flavor."
  },
  {
    id: 12,
    name: "Socrates",
    birthDate: null,
    deathDate: null ,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrate_du_Louvre.jpg/1200px-Socrate_du_Louvre.jpg",
    content: "The unexamined life is not worth living."
  },
  {
    id: 13,
    name: "Oprah Winfrey",
    birthDate: '29/01/1954',
    deathDate: null,
    image: "https://imageio.forbes.com/specials-images/imageserve/5ed6730fc6ade40006ffd657/0x0.jpg?format=jpg&crop=1080,1080,x0,y0,safe&fit=crop",
    content: "Turn your wounds into wisdom."
  }
 
];

const cors = require('cors');
app.use(cors());



app.get("/quote", (req, res) => {
  const quote = createQuote.get();
  res.send(quote);
});
 
app.get('/quotes/:id' , (req, res) =>{
  const id = Number(req.params.id)
 const getQuote = getSingleQuote.get(id);
 res.send(getQuote);
})
app.get('/random', (req, res) =>{
 const randomIndex = Math.floor(Math.random()*quotes.length)
 res.send(quotes[randomIndex])
} 
)
app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.post('/quotes', (req, res) => {

  const name = req.body.name
  const birthDate = req.body.birthDate
  const deathDate = req.body.deathDate
  const image = req.body.image
  const content = req.body.content


  const errors: any = []

  if(typeof deathDate !== 'string'){
    errors.push('Death date is missing')
  }

  if(typeof name !== 'string'){
    errors.push('Name is missing')
  }
  if(typeof birthDate !== 'string'){
    errors.push('Birth date is missing')
  }
  if(typeof image !== 'string'){
    errors.push('Image is missing')
  }
  if(typeof content !== 'string'){
    errors.push('Content is missing')
  }


  if(errors.length === 0){
    const newQuote: Quotes ={
    id: Math.random(),
    content: content,
    name: name,
    image: image,
    birthDate: birthDate,
    deathDate: deathDate
  }
  quotes.push(newQuote)
  res.status(201).send(newQuote)
  } else{
    res.status(400).send({error: errors})
  }
  
 
})

app.patch('/quotes/:id', (req, res) => {
  const id = Number(req.params.id)
  const quoteToChange = quotes.find((quote)=> quote.id === id )

  if(quoteToChange){
    if(typeof req.body.name === 'string') quoteToChange.name === req.body.name
    if(typeof req.body.image === 'string') quoteToChange.image === req.body.image
    if(typeof req.body.content === 'string') quoteToChange.content === req.body.content
    res.send(quoteToChange)
  }else{
    res.status(404).send({ error: 'Quote not found!'})
  }
})


app.delete('/dogs/:id', (req, res) => {
  //get id
  const id = Number(req.params.id)
//find quote
  const match = quotes.find((quote) => quote.id === id )
  // delete quote if it exist

  if(match){
    quotes = quotes.filter((quote) => quote.id !== id)
    res.send({message: 'Quote deleted successfully.'})
  }else{
    res.status(404).send({ error: 'Quote not found!'})
  }
})

app.listen(
  PORT
  
);

function cord(): any {
  throw new Error("Function not implemented.");
}

