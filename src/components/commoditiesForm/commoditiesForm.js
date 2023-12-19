import {fetchData} from '../../script/Helpers/fetchData.js';
import {debounce} from '../../script/Helpers/debounce.js';

const commoditiesForm = () => {
    //=================================================================================================
    //inputDropDown logic
    //=================================================================================================
    const inputDropdown = () => {
        const dropdownListItems = document.querySelectorAll('#sys-search ~ .dropdown-menu > .dropdown-item');
        const ddToggle = document.querySelector('#sys-search');

        const handleDropdownItemClick = () => {
            // some logic
            console.log('ok');
        };

        const handleSysDropdownclick = async () => {
            await fetchData(`https://www.edsm.net/api-status-v1/elite-server`)
                .then(data => {
                    dropdownListItems.forEach(item => {
                        item.textContent = data.message;
                    });

                    console.log(data);
                });
        };

        const processChange = debounce(() => handleSysDropdownclick(), 500);

        ddToggle.addEventListener('input', processChange);

        dropdownListItems.forEach(item => {
            item.addEventListener('click', handleDropdownItemClick);
        });

    };
    inputDropdown();
    //=================================================================================================

    //=================================================================================================
    // custom select logic
    //=================================================================================================
    const customSelect = () => {
        const commoditiesSearchField = document.querySelector('#dd-search-commodities');
        const dropdownListItems = document.querySelectorAll('#dd-search-commodities ~ .dropdown-item');
        const selectedItemsDiv = document.querySelector('#selected-items-commodities');
        const itemsToSubmit = document.querySelector('.dropdown-container > input');
        const selectedItemsArr = [];

        const selectedItemBtn = `
            <span class="border-start border-1 border-black"></span>
            <button class="btn-close px-2" type="button" aria-label="Close"></button>
        `;

        const handleDropdownInput = (e) => {
            dropdownListItems.forEach(item => {
                !item.textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ?
                    item.classList.add('hidden') :
                    item.classList.remove('hidden');
            });
        };

        const handleDropdownItemClick = (e) => {
            if (selectedItemsArr.includes(e.target.textContent)) return;

            selectedItemsArr.push(e.target.textContent);

            const selItm = document.createElement("div");
            selItm.className = 'ps-1';
            selItm.innerHTML = e.target.textContent + selectedItemBtn;
            selectedItemsDiv.appendChild(selItm);

            itemsToSubmit.value += `${e.target.textContent},`;
        };

        const handleDeleteSelectedItem = (e) => {
            if (e.target.classList.contains('btn-close')) {
                selectedItemsArr.splice(selectedItemsArr.indexOf(e.target.parentElement.textContent.trim()), 1);
                e.target.parentElement.remove();
            }
        };

        commoditiesSearchField.addEventListener('input', handleDropdownInput);

        dropdownListItems.forEach(item => {
            item.addEventListener('click', handleDropdownItemClick);
        });

        selectedItemsDiv.addEventListener('click', handleDeleteSelectedItem);
    };
    customSelect();
//===================================================================================================
};

commoditiesForm();
