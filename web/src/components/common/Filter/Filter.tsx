import { Autocomplete, Checkbox, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useFilterStyles } from "./Filter.styles";
import { FilterCompProps } from "./Filter.types";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';
import { OptionProps } from "types";
import { PinkButton } from "../Buttons";

const Filter: FC<FilterCompProps> = ({ onFind, filterElements, filterParams }) => {
    const { classes } = useFilterStyles()
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const filterPropIds: string[] = filterElements.map((ele) => {
        return ele.id
    })
    const initializeForm = () => {
        for (let i = 0; i < filterElements.length; i++) {
            switch (filterElements[i].type) {
                case 'text':
                    dic[filterPropIds[i]] = ''
                    break
                case 'multi-select':
                    dic[filterPropIds[i]] = [] as OptionProps[]
                    break
                case 'date':
                    dic[filterPropIds[i] + '[start]'] = null
                    dic[filterPropIds[i] + '[end]'] = null
                    break
                case 'switch':
                    dic[filterPropIds[i]] = undefined
                    break
                case 'number':
                    dic[filterPropIds[i] + '[start]'] = ''
                    dic[filterPropIds[i] + '[end]'] = ''
                    break
            }
        }
    }
    let dic = { ...filterParams }
    if (Object.keys(dic).length === 0) {
        initializeForm()
    }
    const [filProps, setFilProps] = useState(dic)


    const handleChange = (id, e) => {
        setFilProps({ ...filProps, [id]: e.target.value });
    }
    const handleNumberChange = (id, e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setFilProps({ ...filProps, [id]: (e.target.value) });
        }
    }
    const handleSwitchChange = (id, newval) => {
        setFilProps({ ...filProps, [id]: newval });
    }
    const handleSelectChange = (id, newValue) => {
        setFilProps({ ...filProps, [id]: newValue });
    }
    const handleChangeDate = (id: string, newValue: Dayjs | null): void => {
        setFilProps({ ...filProps, [id]: newValue });
    }

    const handleClick = () => {
        onFind(filProps)
    }
    const handleCleanFilter = () => {
        initializeForm()
        setFilProps(dic)
        onFind(filProps)
    }

    const filterForm = () => {
        return filterElements.map((filterEle) => {
            switch (filterEle.type) {
                case 'text':
                    return <TextField className={classes.textField} value={filProps[filterEle.id]} onChange={(e) => handleChange(filterEle.id, e)} key={filterEle.id} id={filterEle.id} label={filterEle.label} variant="standard" />
                    break
                case 'number':
                    return (
                        <Grid key={filterEle.id}>
                            <TextField className={classes.textField} value={filProps[filterEle.id + '[start]']}
                                onChange={(e) => handleNumberChange(filterEle.id + '[start]', e)} id={filterEle.id}
                                label={filterEle.label + ' | Начало'} variant="standard" type="number"
                                InputProps={{ inputProps: { min: 0 } }} />
                            <TextField className={classes.textField} value={filProps[filterEle.id + '[end]']}
                                onChange={(e) => handleNumberChange(filterEle.id + '[end]', e)} id={filterEle.id}
                                label={filterEle.label + ' | Конец'} variant="standard" type="number"
                                InputProps={{ inputProps: { min: 0 } }} />
                        </Grid>)
                    break
                case 'multi-select':
                    return <Autocomplete
                        className={classes.autocomplete}
                        key={filterEle.id}
                        multiple
                        id="size-small-standard-multi"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={filterEle.options as OptionProps[]}
                        disableCloseOnSelect
                        onChange={(e, newValue) => handleSelectChange(filterEle.id, newValue)}
                        getOptionLabel={(option) => option.label}
                        value={filProps[filterEle.id] as OptionProps[] | undefined}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.label}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" label={filterEle.label} placeholder="" />
                        )}
                    />
                    break
                case 'switch':
                    return <FormControlLabel className={classes.switch} key={filterEle.id} control={<Switch checked={!!filProps[filterEle.id]} onChange={(e) => handleSwitchChange(filterEle.id, !filProps[filterEle.id])} />} label={filterEle.label} />

                    break
                case 'date':
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs} key={filterEle.id}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DateField
                                    className={classes.dateField}
                                    label={filterEle.label + ' | Начало периода'}
                                    value={filProps[filterEle.id + '[start]']}
                                    onChange={(newValue) => handleChangeDate(filterEle.id + '[start]', newValue)}
                                    variant="standard"
                                    format="DD - MM - YYYY"
                                />
                                <DateField
                                    className={classes.dateField}
                                    label={filterEle.label + ' | Конец периода'}
                                    value={filProps[filterEle.id    + '[end]']}
                                    onChange={(newValue) => handleChangeDate(filterEle.id + '[end]', newValue)}
                                    variant="standard"
                                    format="DD - MM - YYYY"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    )
                    break
            }
        })
    }
    return (
        <Grid className={classes.root}>
            <PinkButton variant="text" title={'Очистить фильтры'} onClick={handleCleanFilter} />
            {filterForm()}
            <PinkButton variant="contained" title={'Фильтровать'} onClick={handleClick} />
        </Grid>
    );
};

export default Filter;