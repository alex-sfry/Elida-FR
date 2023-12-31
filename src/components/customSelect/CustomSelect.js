export class CustomSelect {
    constructor(config) {
        if (!config) return console.log('provide config');

        this.commoditiesSearchField = document.querySelector(`#${config.search}`);
        this.dropdownListItems = document.querySelectorAll(`#${config.search} ~ .dropdown-item`);
        this.selectedItemsDiv = document.querySelector(`#${config.selected}`);
        this.itemsToSubmitSelect = document.querySelector('.dropdown-container > select');
        this.selectedItemsArr = [];

        this.selectedItemBtn = `
            <span class="border-start border-1 border-black"></span>
            <button class="btn-close px-2" type="button" aria-label="Close"></button>
        `;

        this.setEventListeners();
    }

    handleDropdownInput = (e) => {
        this.dropdownListItems.forEach(item => {
            !item.textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ?
                item.classList.add('hidden') :
                item.classList.remove('hidden');
        });
    };

    handleDropdownItemClick = (e) => {
        if (this.selectedItemsArr.includes(e.target.textContent)) return;

        this.selectedItemsArr.push(e.target.textContent);

        const selItm = document.createElement("div");
        selItm.className = 'ps-1';
        selItm.innerHTML = e.target.textContent + this.selectedItemBtn;
        this.selectedItemsDiv.appendChild(selItm);

        const optionItem = document.createElement("option");
        optionItem.setAttribute('value', e.target.textContent);
        this.itemsToSubmitSelect.appendChild(optionItem);
    };

    handleDeleteSelectedItem = (e) => {
        if (e.target.classList.contains('btn-close')) {
            this.selectedItemsArr.splice(this.selectedItemsArr.indexOf(e.target.parentElement.textContent.trim()), 1);
            e.target.parentElement.remove();

            const optionToDelete = this.itemsToSubmitSelect.querySelector(
                `option[value="${e.target.parentElement.textContent.trim()}"]`
            );
            optionToDelete.remove();
        }
    };

    setEventListeners = () => {
        this.commoditiesSearchField.addEventListener('input', (e) => this.handleDropdownInput(e));

        this.dropdownListItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleDropdownItemClick(e));
        });

        this.selectedItemsDiv.addEventListener('click', (e) => this.handleDeleteSelectedItem(e));
    };
}
