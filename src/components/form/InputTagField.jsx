/* eslint-disable react/prop-types */
import { Form, Select } from 'antd';
import { useState } from 'react';
const InputTagField = ({ label, name, form, setIsChangedFormValues, options, ...props }) => {
    let isOnSelect = false;
    const [searchValue, setSearchValue] = useState('');
    return (
        <Form.Item name={name} label={label}>
            <Select
                options={options}
                showArrow={false}
                mode='multiple'
                showSearch
                searchValue={searchValue}
                onSearch={(value) => setSearchValue(value)}
                dropdownStyle={{ maxHeight: 100 }}
                defaultActiveFirstOption={false}
                onBlur={(e) => {
                    const fieldValue = form.getFieldValue(name) || [];
                    for (const item of fieldValue) {
                        if (item === e.target.value) {
                            setSearchValue('');
                            return;
                        }
                    }
                    if (e.target.value !== '') {
                        form.setFieldValue(name, [...fieldValue, e.target.value]);
                    }
                    setSearchValue('');
                    setIsChangedFormValues(true);
                }}
                onSelect={(value) => {
                    setSearchValue('');
                    isOnSelect = true;
                    const fieldValue = form.getFieldValue(name) || [];
                    for (const item of fieldValue) {
                        if (item === value) {
                            return;
                        }
                    }
                    form.setFieldValue(name, [...fieldValue, value]);
                }}
                onKeyDown={(e) => {
                    if (e.key == 'Enter' && !isOnSelect) {
                        const fieldValue = form.getFieldValue(name) || [];
                        for (const item of fieldValue) {
                            if (item === e.target.value) {
                                setSearchValue('');
                                return;
                            }
                        }
                        if (e.target.value !== '') {
                            form.setFieldValue(name, [...fieldValue, e.target.value]);
                        }
                        setSearchValue('');
                        setIsChangedFormValues(true);
                    }
                }}
                notFoundContent={null}
                {...props}
            />
        </Form.Item>
    );
};
export default InputTagField;
