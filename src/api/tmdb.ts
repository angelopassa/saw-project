
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
};

export type Result = {
    results: Media[],
    total_pages: number,
    page: number,
    total_results: number
}

export type Media = {
    media_type: string,
    name: string,
    profile_path: string,
    id: number,
    backdrop_path: string,
    vote_average: number,
    first_air_date: string,
    poster_path: string,
    title: string,
    release_date: string
}

export type Genere = {
    id: number,
    name: string
}

export type Produzione = {
    logo_path: string,
    name: string
}

export type StagioneSimple = {
    id: number,
    season_number: number,
    name: string
}

export type Episodio = {
    episode_number: number,
    still_path: string,
    name: string,
    air_date: string,
    runtime: number,
    vote_average: number,
    overview: string,
    crew: PersonCrew[],
    id: number
}

export type Stagione = StagioneSimple & {
    episodes: Episodio[]
}

export type Serie = {
    id: number,
    poster_path: string,
    backdrop_path: string,
    first_air_date: string,
    name: string,
    status: string,
    last_air_date: string,
    genres: Genere[],
    production_companies: Produzione[],
    networks: Produzione[],
    seasons: StagioneSimple[],
    created_by: PersonCast[],
    tagline: string,
    overview: string,
    vote_average: number
}

export type Movie = {
    id: number,
    poster_path: string,
    genres: Genere[],
    tagline: string,
    overview: string,
    runtime: number,
    production_companies: Produzione[],
    backdrop_path: string,
    title: string,
    vote_average: number,
    release_date: string
}

export type Person = {
    media_type: string,
    biography: string,
    deathday: string,
    place_of_birth: string,
    birthday: string,
    name: string,
    id: number,
    profile_path: string
}

export type PersonCast = {
    id: number,
    name: string,
    known_for_department: string
}

export type PersonCrew = PersonCast & {
    job: string
}

async function searchByKeyword(keyword: string, page: number): Promise<Result | null> {
    try {
        let result = await fetch('https://api.themoviedb.org/3/search/multi?query=' + keyword + '&include_adult=false&language=it-IT&page=' + page, options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function searchById(id: string): Promise<Movie | null> {
    try {
        let result = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getPeopleByMovieId(id: string) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function searchTvById(id: string): Promise<Serie | null> {
    try {
        let result = await fetch('https://api.themoviedb.org/3/tv/' + id + '?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getEpisodesById(idSerie: string, idSeries: number) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/tv/' + idSerie + '/season/' + idSeries + '?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getPersonById(id: string) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/person/' + id + '?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getMoviesByPersonId(id: string) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/person/' + id + '/combined_credits?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}


async function getTvCreditsById(id: string) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/tv/' + id + '/aggregate_credits?language=it-IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getPopularMovies(page: number = 1): Promise<Result | null> {
    try {
        let result = await fetch('https://api.themoviedb.org/3/movie/popular?language=it-IT&page=' + page, options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getPopularSeries(page: number = 1) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/tv/popular?language=it-IT&page=' + page, options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

async function getUpcomingMovies(page: number = 1) {
    try {
        let result = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=it-IT&page=' + page + '&region=IT', options);
        return result.json();
    } catch (error) {
        console.log("[TMDB] ", error);
        return null;
    }
}

function removeDup<T extends Movie | Serie>(res: T[]): T[] {
    let ret: T[] = [];
    for (let item of res)
        if (!ret.find((el) => el.id === item.id))
            ret.push(item);
    return ret;
}

const genres: { [key: string]: string } = {
    Avventura: 'bg-red-600',
    Animazione: 'bg-blue-600',
    Azione: 'bg-green-600',
    Fantascienza: 'bg-orange-600',
    Commedia: 'bg-teal-600',
    Crime: 'bg-gray-600',
    Documentario: 'bg-teal-600',
    Dramma: 'bg-blue-600',
    Famiglia: 'bg-pink-600',
    Fantasy: 'bg-fuchsia-600',
    Storia: 'bg-yellow-600',
    Horror: 'bg-black',
    Musica: 'bg-lime-500',
    Mistero: 'bg-purple-700',
    Romance: 'bg-rose-500',
    Thriller: 'bg-stone-600',
    Guerra: 'bg-slate-500',
    Western: 'bg-amber-700'
}

const genres_tv: { [key: string]: string } =
{
    'Action & Adventure': 'bg-red-600',
    Animazione: 'bg-blue-600',
    Commedia: 'bg-teal-600',
    Crime: 'bg-gray-600',
    Documentario: 'bg-teal-600',
    Dramma: 'bg-blue-600',
    Famiglia: 'bg-pink-600',
    Kids: 'bg-green-600',
    Mistero: 'bg-purple-700',
    News: 'bg-yellow-600',
    Reality: 'bg-orange-600',
    'Sci-Fi & Fantasy': 'bg-fuchsia-600',
    Soap: 'bg-rose-500',
    Talk: 'bg-lime-500',
    'War & Politics': 'bg-slate-500',
    Western: 'bg-amber-700'
}

export {
    searchByKeyword, searchById, genres, getPeopleByMovieId, searchTvById, genres_tv, getEpisodesById, getPersonById,
    getMoviesByPersonId, removeDup, getTvCreditsById, getPopularMovies, getPopularSeries, getUpcomingMovies
}

