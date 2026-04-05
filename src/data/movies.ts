export type Mood = 'happy' | 'sad' | 'thrilling' | 'romantic' | 'chill' | 'mysterious' | 'inspiring' | 'scary';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  description: string;
  poster: string;
  moods: Mood[];
}

export const moods: { id: Mood; label: string; emoji: string; gradient: string }[] = [
  { id: 'happy', label: 'Happy', emoji: '😄', gradient: 'from-yellow-500/20 to-orange-500/20' },
  { id: 'sad', label: 'Melancholy', emoji: '😢', gradient: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'thrilling', label: 'Thrilling', emoji: '🔥', gradient: 'from-red-600/20 to-orange-600/20' },
  { id: 'romantic', label: 'Romantic', emoji: '💕', gradient: 'from-pink-500/20 to-rose-500/20' },
  { id: 'chill', label: 'Chill', emoji: '😌', gradient: 'from-teal-500/20 to-cyan-500/20' },
  { id: 'mysterious', label: 'Mysterious', emoji: '🔮', gradient: 'from-purple-500/20 to-violet-500/20' },
  { id: 'inspiring', label: 'Inspiring', emoji: '✨', gradient: 'from-amber-500/20 to-yellow-500/20' },
  { id: 'scary', label: 'Scary', emoji: '👻', gradient: 'from-gray-700/20 to-gray-900/20' },
];

export const movies: Movie[] = [
  { id: 1, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, duration: "1h 39m", genres: ["Comedy", "Drama"], description: "A writer encounters the owner of an aging high-class hotel, who tells the story of his early years.", poster: "", moods: ["happy", "inspiring"] },
  { id: 2, title: "Amélie", year: 2001, rating: 8.3, duration: "2h 2m", genres: ["Comedy", "Romance"], description: "A shy waitress decides to change the lives of those around her for the better.", poster: "", moods: ["happy", "romantic"] },
  { id: 3, title: "Eternal Sunshine of the Spotless Mind", year: 2004, rating: 8.3, duration: "1h 48m", genres: ["Drama", "Romance", "Sci-Fi"], description: "When their relationship turns sour, a couple undergoes a medical procedure to erase each other from their memories.", poster: "", moods: ["sad", "romantic"] },
  { id: 4, title: "Blue Valentine", year: 2010, rating: 7.4, duration: "1h 52m", genres: ["Drama", "Romance"], description: "The relationship of a contemporary married couple, charting their evolution over a span of years.", poster: "", moods: ["sad", "romantic"] },
  { id: 5, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, duration: "2h", genres: ["Action", "Sci-Fi"], description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland.", poster: "", moods: ["thrilling"] },
  { id: 6, title: "Inception", year: 2010, rating: 8.8, duration: "2h 28m", genres: ["Action", "Sci-Fi", "Thriller"], description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.", poster: "", moods: ["thrilling", "mysterious"] },
  { id: 7, title: "Before Sunrise", year: 1995, rating: 8.1, duration: "1h 41m", genres: ["Drama", "Romance"], description: "A young man and woman meet on a train in Europe, and end up spending one evening together in Vienna.", poster: "", moods: ["romantic", "chill"] },
  { id: 8, title: "The Notebook", year: 2004, rating: 7.8, duration: "2h 3m", genres: ["Drama", "Romance"], description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom.", poster: "", moods: ["romantic", "sad"] },
  { id: 9, title: "The Big Lebowski", year: 1998, rating: 8.1, duration: "1h 57m", genres: ["Comedy", "Crime"], description: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug.", poster: "", moods: ["chill", "happy"] },
  { id: 10, title: "Lost in Translation", year: 2003, rating: 7.7, duration: "1h 42m", genres: ["Comedy", "Drama"], description: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.", poster: "", moods: ["chill", "sad"] },
  { id: 11, title: "Mulholland Drive", year: 2001, rating: 7.9, duration: "2h 27m", genres: ["Drama", "Mystery", "Thriller"], description: "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues.", poster: "", moods: ["mysterious"] },
  { id: 12, title: "Shutter Island", year: 2010, rating: 8.2, duration: "2h 18m", genres: ["Mystery", "Thriller"], description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", poster: "", moods: ["mysterious", "thrilling", "scary"] },
  { id: 13, title: "The Pursuit of Happyness", year: 2006, rating: 8.0, duration: "1h 57m", genres: ["Biography", "Drama"], description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.", poster: "", moods: ["inspiring", "sad"] },
  { id: 14, title: "Rocky", year: 1976, rating: 8.1, duration: "2h", genres: ["Drama", "Sport"], description: "A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion.", poster: "", moods: ["inspiring", "thrilling"] },
  { id: 15, title: "The Conjuring", year: 2013, rating: 7.5, duration: "1h 52m", genres: ["Horror", "Mystery", "Thriller"], description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence.", poster: "", moods: ["scary", "mysterious"] },
  { id: 16, title: "Hereditary", year: 2018, rating: 7.3, duration: "2h 7m", genres: ["Drama", "Horror", "Mystery"], description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.", poster: "", moods: ["scary"] },
  { id: 17, title: "Forrest Gump", year: 1994, rating: 8.8, duration: "2h 22m", genres: ["Drama", "Romance"], description: "The presidencies of Kennedy and Johnson, the Vietnam War, Watergate, and other history unfold from the perspective of an Alabama man.", poster: "", moods: ["happy", "inspiring", "sad"] },
  { id: 18, title: "The Dark Knight", year: 2008, rating: 9.0, duration: "2h 32m", genres: ["Action", "Crime", "Drama"], description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.", poster: "", moods: ["thrilling", "mysterious"] },
  { id: 19, title: "Whiplash", year: 2014, rating: 8.5, duration: "1h 46m", genres: ["Drama", "Music"], description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.", poster: "", moods: ["thrilling", "inspiring"] },
  { id: 20, title: "Her", year: 2013, rating: 8.0, duration: "2h 6m", genres: ["Drama", "Romance", "Sci-Fi"], description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.", poster: "", moods: ["romantic", "sad", "chill"] },
  { id: 21, title: "Superbad", year: 2007, rating: 7.6, duration: "1h 53m", genres: ["Comedy"], description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-fueled party goes awry.", poster: "", moods: ["happy", "chill"] },
  { id: 22, title: "Get Out", year: 2017, rating: 7.7, duration: "1h 44m", genres: ["Horror", "Mystery", "Thriller"], description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.", poster: "", moods: ["scary", "mysterious", "thrilling"] },
  { id: 23, title: "La La Land", year: 2016, rating: 8.0, duration: "2h 8m", genres: ["Comedy", "Drama", "Music"], description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.", poster: "", moods: ["romantic", "inspiring", "sad"] },
  { id: 24, title: "Interstellar", year: 2014, rating: 8.7, duration: "2h 49m", genres: ["Adventure", "Drama", "Sci-Fi"], description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "", moods: ["inspiring", "thrilling", "mysterious"] },
];
