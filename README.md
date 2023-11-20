## Features

- Scrapes news from select sources
- Summarises the content of each article
- Fetches bias, confidence, agreement and disagreement scores from allsides 
- Takes an article and scrapes reddit's "news" subreddit to find a post, the title of which is most semantically similar to that of the article (and performs sentiment analysis on their comments).

Todo:
- [save above into file and run fetch only a few times a month; api limits]
- Looks through comments, topics and analyses sentiment with an LLM?
- subjective vs objective content scoring