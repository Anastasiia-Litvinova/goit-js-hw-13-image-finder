// ===== IMPORTS ===== //
import './sass/main.scss';


import { error, notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";


import ImagesApiService from './js/apiService.js';
import imagesItemTpl from './templates/imagesItemTpl.hbs';




const imagesApiService = new ImagesApiService();

const elems = {
    searchForm: document.querySelector('#search-form'),

    gallery: document.querySelector('.gallery'),

    showMoreBtn: document.querySelector('[data-action="load-more"]'),
};

elems.searchForm.addEventListener('submit', onSearch);
elems.showMoreBtn.addEventListener('click', onLoadMore);


// ========= FUNCTIONS =========== //

async function onSearch (evt) {
    evt.preventDefault();

    try {
        imagesApiService.query = evt.currentTarget.elements.query.value;
        evt.currentTarget.elements.query.value = '';

        if(imagesApiService.query === '') {
            return error({
                text: "Please, enter something you are looking for",
                delay: 3000,
                mouseReset: true,
            });
        };

        imagesApiService.resetPage();
        const pictures = await imagesApiService.fetchImages();
        
        checkPresence(pictures);
        clearGalleryContainer(pictures);
        injectImagesMarkup(pictures);
        scrollAfterLoad();

    }
    
    catch {
        return error({
            text: "Ooops, something went wrong",
            delay: 3000,
            mouseReset: true,
        });
    };  
};


function injectImagesMarkup (pictures) {
    elems.gallery.insertAdjacentHTML('beforeend', imagesItemTpl(pictures));
    elems.showMoreBtn.classList.remove('is-hidden');
};

function clearGalleryContainer () {
    elems.gallery.innerHTML = '';
};

function checkPresence (array) {
    if (array.length === 0) {
        return notice({
            text: "Sorry, we could not find pictures you looking for",
            delay: 3000,
        });
    }
};

function scrollAfterLoad () {
    elems.showMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

async function onLoadMore () {
    const pictures = await imagesApiService.fetchImages();
    injectImagesMarkup(pictures);
    scrollAfterLoad();
};

