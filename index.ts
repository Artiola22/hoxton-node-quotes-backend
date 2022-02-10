import express from "express";

const app = express();
const PORT = 4000;

type Quotes = {
  id: number;
  name: string;
  content: string;
};
const quotes: Quotes[] = [
  {
    id: 1,
    name: "Dalai Lama",
    content: "The purpose of our lives is to be happy.",
  },
  {
    id: 2,
    name: "John Lennon",
    content: "Life is what happens when you’re busy making other plans.",
  },
  {
    id: 3,
    name: " Stephen King  ",
    content: "Get busy living or get busy dying.",
  },
  {
    id: 4,
    name: "Mae West",
    content: "You only live once, but if you do it right, once is enough.",
  },
  {
    id: 5,
    name: "Thomas A. Edison",
    content: "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
  },
  {
    id: 6,
    name: "Albert Einstein",
    content: "If you want to live a happy life, tie it to a goal, not to people or things.",
  },
  {
    id: 7,
    name: "Babe Ruth",
    content: "Never let the fear of striking out keep you from playing the game.",
  },
  {
    id: 8,
    name: "Will Smith",
    content: "Money and success don’t change people; they merely amplify what is already there.",
  },
  {
    id: 9,
    name: "Steve Jobs",
    content: "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.",
  },
  {
    id: 10,
    name: "Seneca",
    content: "Not how long, but how well you have lived is the main thing.",
  },
  {
    id: 11,
    name: "Eleanor Roosevelt",
    content: "If life were predictable it would cease to be life, and be without flavor.",
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to Node!!!");
});
app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.listen(
  PORT
  //     , (err) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   return console.log(`Server is listening on ${PORT}`);
  // }
);
