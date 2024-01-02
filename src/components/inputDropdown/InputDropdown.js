import {FetchData} from '../../script/Helpers/FetchData.js';

export class InputDropdown {
    constructor(config) {
        if (!config) return console.log('provide config');

        this.dropdownListItems = document.querySelectorAll(`#${config.search} ~ .dropdown-menu > .dropdown-item`);
        this.ddToggle = document.querySelector(`#${config.search}`);

        this.processChange = this.debounce((e) => this.handleDropdownInput(e), 1000);

        this.setEventListeners();
    }

    debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    };

    handleDropdownItemClick = (e) => {
        this.ddToggle.value = e.target.textContent;
    };

    handleDropdownInput = async (e) => {
        const data = await FetchData.fetch(
            {
                url: `https://jsonplaceholder.typicode.com/users`,
                method: 'GET',
                contentType: 'application/json',
                body: null
            }
        );

        this.dropdownListItems.forEach((item, index) => {
            item.textContent = data[index].name;
        });

        this.dropdownListItems.forEach(item => {
            !item.textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ?
                item.classList.add('hidden') :
                item.classList.remove('hidden');
        });
    };

    setEventListeners = () => {
        this.ddToggle.addEventListener('input', (e) => this.processChange(e));

        this.dropdownListItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleDropdownItemClick(e));
        });
    };
}
