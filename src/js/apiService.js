const BASE_URL = 'https://pixabay.com/api/';  
const API_KEY = '22343363-d4b70647121cf81e93de70d08';



export default class ImagesApiService {
    constructor() {
        this.searchQuery ='';
        this.page = 1;
    }

    async fetchImages () {
        console.log(this);

        const response = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        
        if(!response.ok) {
            throw new Error(`Sorry, but such picture doesn't exist ${response.status}`);
        }

        const pictures = await response.json();
        this.incrementPage();
        return await pictures.hits;
    }

    incrementPage () {
        this.page +=1;
    }

    resetPage () {
        this.page =1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}