import {CustomSelect} from '../customSelect/CustomSelect.js';
import {InputDropdown} from '../inputDropdown/InputDropdown.js';

const commoditiesForm = () => {
    new InputDropdown(
        {
            search: 'sys-search'
        }
    );

    new CustomSelect({
            search: 'dd-search-commodities',
            selected: 'selected-items-commodities'
        }
    );
};

if (document.querySelector('.c-form')) commoditiesForm();
