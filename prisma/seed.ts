import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = 
[
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Southern Gothic",
    "description": "A timeless classic exploring racial injustice and the loss of innocence in the American South."
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "description": "A chilling vision of a totalitarian future where individuality is suppressed and thought is controlled."
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "genre": "Romance",
    "description": "A delightful tale of love, class, and social conventions in 19th-century England."
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "description": "A poignant exploration of the American Dream, wealth, and illusion in the Roaring Twenties."
  },
  {
    "title": "Moby Dick",
    "author": "Herman Melville",
    "genre": "Adventure",
    "description": "The epic saga of Captain Ahab's obsessive pursuit of the white whale, Moby Dick."
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "genre": "Coming-of-Age",
    "description": "A rebellious teenager's cynical and humorous observations on phoniness and adulthood."
  },
  {
    "title": "Jane Eyre",
    "author": "Charlotte Brontë",
    "genre": "Gothic Romance",
    "description": "A passionate and enduring love story set against the backdrop of a mysterious English estate."
  },
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "description": "An epic high fantasy adventure of hobbits, elves, and wizards in a quest to destroy a powerful ring."
  },
  {
    "title": "Don Quixote",
    "author": "Miguel de Cervantes",
    "genre": "Satire",
    "description": "A hilarious and profound journey of an aging nobleman who imagines himself a knight-errant."
  },
  {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "genre": "Historical Fiction",
    "description": "A sprawling masterpiece depicting Russian society during the Napoleonic Wars."
  },
  {
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "genre": "Magical Realism",
    "description": "A multi-generational saga of the Buendía family in the mythical town of Macondo."
  },
  {
    "title": "The Odyssey",
    "author": "Homer",
    "genre": "Epic Poetry",
    "description": "The arduous ten-year journey of the hero Odysseus as he attempts to return home after the Trojan War."
  },
  {
    "title": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "genre": "Philosophical Fiction",
    "description": "A psychological drama of a young man who commits murder and grapples with his conscience."
  },
  {
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "genre": "Science Fiction Comedy",
    "description": "A hilarious and absurd journey through space after Earth is demolished to make way for a hyperspace bypass."
  },
  {
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "genre": "Gothic Horror",
    "description": "A chilling tale of scientific ambition, creation, and the consequences of playing God."
  },
  {
    "title": "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    "author": "C.S. Lewis",
    "genre": "Fantasy",
    "description": "Four siblings discover a magical world through a wardrobe and embark on an adventure to save it."
  },
  {
    "title": "Les Misérables",
    "author": "Victor Hugo",
    "genre": "Historical Fiction",
    "description": "An epic story of injustice, redemption, and revolution in 19th-century France."
  },
  {
    "title": "Dracula",
    "author": "Bram Stoker",
    "genre": "Gothic Horror",
    "description": "The terrifying story of Count Dracula and his attempts to spread his vampiric curse."
  },
  {
    "title": "Anna Karenina",
    "author": "Leo Tolstoy",
    "genre": "Realist Fiction",
    "description": "A tragic love story set against the backdrop of high society in Imperial Russia."
  },
  {
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "genre": "Dystopian",
    "description": "A chilling vision of a future society where conditioning and pleasure control replace freedom and individuality."
  },
  {
    "title": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "genre": "Philosophical Fiction",
    "description": "A haunting tale of a man who sells his soul for eternal youth and beauty, with dark consequences."
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "description": "The adventurous journey of Bilbo Baggins as he joins a company of dwarves to reclaim their treasure."
  },
  {
    "title": "Wuthering Heights",
    "author": "Emily Brontë",
    "genre": "Gothic Romance",
    "description": "A dark and passionate love story of Catherine Earnshaw and Heathcliff on the Yorkshire moors."
  },
  {
    "title": "Great Expectations",
    "author": "Charles Dickens",
    "genre": "Classic",
    "description": "The story of Pip, an orphan, and his journey through life, love, and social ascension."
  },
  {
    "title": "Alice's Adventures in Wonderland",
    "author": "Lewis Carroll",
    "genre": "Fantasy",
    "description": "A whimsical and nonsensical journey of a young girl into a magical, surreal world."
  },
  {
    "title": "Gone with the Wind",
    "author": "Margaret Mitchell",
    "genre": "Historical Fiction",
    "description": "A sweeping epic of love and survival set during the American Civil War and Reconstruction era."
  },
  {
    "title": "The Grapes of Wrath",
    "author": "John Steinbeck",
    "genre": "Social Realism",
    "description": "A powerful depiction of a family's struggle during the Great Depression's Dust Bowl migration."
  },
  {
    "title": "Catch-22",
    "author": "Joseph Heller",
    "genre": "Satire",
    "description": "A darkly humorous and absurd look at the madness of war and bureaucracy."
  },
  {
    "title": "Slaughterhouse-Five",
    "author": "Kurt Vonnegut",
    "genre": "Satire",
    "description": "A non-linear, satirical anti-war novel exploring themes of free will and the destructiveness of conflict."
  },
  {
    "title": "The Handmaid's Tale",
    "author": "Margaret Atwood",
    "genre": "Dystopian",
    "description": "A chilling depiction of a totalitarian society where women are stripped of their rights and forced into servitude."
  },
  {
    "title": "The Bell Jar",
    "author": "Sylvia Plath",
    "genre": "Semi-Autobiographical Fiction",
    "description": "A young woman's descent into mental illness while interning at a New York fashion magazine."
  },
  {
    "title": "A Tale of Two Cities",
    "author": "Charles Dickens",
    "genre": "Historical Fiction",
    "description": "A classic story of love, sacrifice, and revolution set during the French Revolution."
  },
  {
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "genre": "Dystopian",
    "description": "A future society where books are burned and knowledge is suppressed."
  },
  {
    "title": "Of Mice and Men",
    "author": "John Steinbeck",
    "genre": "Social Realism",
    "description": "A tragic story of two migrant workers dreaming of owning their own land during the Great Depression."
  },
  {
    "title": "The Sun Also Rises",
    "author": "Ernest Hemingway",
    "genre": "Modernist Fiction",
    "description": "A tale of the Lost Generation, focusing on a group of American and British expatriates in Paris and Spain."
  },
  {
    "title": "Beloved",
    "author": "Toni Morrison",
    "genre": "Historical Fiction",
    "description": "A powerful and haunting story of a former slave haunted by the ghost of her child."
  },
  {
    "title": "The Road",
    "author": "Cormac McCarthy",
    "genre": "Post-Apocalyptic",
    "description": "A harrowing journey of a father and son through a desolate, post-apocalyptic landscape."
  },
  {
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "genre": "Non-Fiction",
    "description": "An ambitious exploration of the entire history of humankind, from the Stone Age to the 21st century."
  },
  {
    "title": "Educated",
    "author": "Tara Westover",
    "genre": "Memoir",
    "description": "A compelling memoir of a young woman who, despite a strict upbringing, pursues education and self-reinvention."
  },
  {
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Philosophical Fiction",
    "description": "A metaphorical tale about a shepherd boy who journeys to find his destiny and hidden treasure."
  },
  {
    "title": "Life of Pi",
    "author": "Yann Martel",
    "genre": "Adventure",
    "description": "The extraordinary story of a young man who survives a shipwreck and is stranded on a lifeboat with a Bengal tiger."
  },
  {
    "title": "The Secret History",
    "author": "Donna Tartt",
    "genre": "Dark Academia",
    "description": "A group of eccentric classics students become involved in a murder at their elite college."
  },
  {
    "title": "American Gods",
    "author": "Neil Gaiman",
    "genre": "Fantasy",
    "description": "An ex-convict becomes embroiled in a war between old and new gods in America."
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "genre": "Science Fiction",
    "description": "A sweeping epic set on a desert planet, exploring themes of politics, religion, and ecology."
  },
  {
    "title": "The Girl with the Dragon Tattoo",
    "author": "Stieg Larsson",
    "genre": "Thriller",
    "description": "A disgraced journalist and a brilliant hacker investigate a decades-old disappearance."
  },
  {
    "title": "Normal People",
    "author": "Sally Rooney",
    "genre": "Contemporary Fiction",
    "description": "The complex and evolving relationship between two young people navigating class, love, and identity."
  },
  {
    "title": "Circe",
    "author": "Madeline Miller",
    "genre": "Mythology",
    "description": "The story of the Greek goddess Circe, exiled to a solitary island, as she discovers her powers and identity."
  },
  {
    "title": "The Nightingale",
    "author": "Kristin Hannah",
    "genre": "Historical Fiction",
    "description": "Two sisters' struggle for survival, love, and freedom during World War II in occupied France."
  },
  {
    "title": "Where the Crawdads Sing",
    "author": "Delia Owens",
    "genre": "Mystery",
    "description": "A young woman raised in the North Carolina marsh becomes the prime suspect in a murder investigation."
  },
  {
    "title": "Pachinko",
    "author": "Min Jin Lee",
    "genre": "Historical Fiction",
    "description": "A multi-generational saga of a Korean family who immigrates to Japan and faces prejudice and resilience."
  }
];

async function main() {
  console.log('Start seeding...');
  console.log(`Total books to seed: ${books.length}`);

  let successCount = 0;
  let errorCount = 0;

  for (const book of books) {
    try {
      const createdBook = await prisma.book.create({
        data: book
      });
      console.log(`Created book with id: ${createdBook.id} - "${book.title}"`);
      successCount++;
    } catch (error) {
      console.error(`Error creating book "${book.title}":`, error);
      errorCount++;
    }
  }

  console.log('\nSeeding Summary:');
  console.log(`Total books processed: ${books.length}`);
  console.log(`Successfully created: ${successCount}`);
  console.log(`Failed to create: ${errorCount}`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Fatal error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 

// This file only created to input some value to the database.