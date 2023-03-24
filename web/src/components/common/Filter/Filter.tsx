import { Autocomplete, Button, Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, FC, useState } from "react";
import { fetchFilterParams } from "services/filter";
import { useFilterStyles } from "./Filter.styles";
import { FilterCompProps } from "./Filter.types";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { OptionProps } from "types";

const Filter: FC<FilterCompProps> = ({ id }) => {
    // const { classes } = useFilterStyles()
    // const filterElements = fetchFilterParams(id)
    // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    // const checkedIcon = <CheckBoxIcon fontSize="small" />;
    // const filterPropIds: string[] = filterElements.map((ele) => {
    //     return ele.id
    // })


    // const filterPropsStates: { [key: string]: string | OptionProps[] | Dayjs | boolean | null } = {}
    // const setfilterPropsStates: { [key: string]: Dispatch<string> | Dispatch<OptionProps[]> | Dispatch<Dayjs | null> | Dispatch<boolean> } = {}
    // for (let i = 0; i < filterElements.length; i++) {
    //     switch (filterElements[i].type) {

    //         case 'text':
    //             const [val, setVal] = useState<string>('')
    //             filterPropsStates[filterPropIds[i]] = val
    //             setfilterPropsStates[filterPropIds[i]] = setVal
    //             break
    //         case 'multi-select':
    //             const [val1, setVal1] = useState<OptionProps[]>([])
    //             filterPropsStates[filterPropIds[i]] = val1
    //             setfilterPropsStates[filterPropIds[i]] = setVal1
    //             break

    //         case 'date':
    //             const [val2, setVal2] = useState<Dayjs | null>(null);
    //             filterPropsStates[filterPropIds[i]] = val2
    //             setfilterPropsStates[filterPropIds[i]] = setVal2
    //             break
    //         case 'switch':
    //             const [val3, setVal3] = useState<boolean>(false)
    //             filterPropsStates[filterPropIds[i]] = val3
    //             setfilterPropsStates[filterPropIds[i]] = setVal3
    //             break
    //     }
    // }
    // const handleChange = (id: string, e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    //     setfilterPropsStates[id](e.target.value)
    // }
    // const handleChangeDate = (id: string, newValue: Dayjs | null ): void => {
    //     setfilterPropsStates[id](newValue)
    // }

    // const handleClick = () => {
    //     console.log(filterPropsStates)
    // }

    // console.log(filterElements)
    // const fil = () => {
    //     return filterElements.map((filterEle) => {
    //         switch (filterEle.type) {
    //             case 'text':


    //                 return <TextField value={filterPropsStates[filterEle.id]} onChange={(e) => handleChange(filterEle.id, e)} key={filterEle.id} id={filterEle.id} label={filterEle.label} variant="standard" />
    //                 break
    //             case 'multi-select':
    //                 return <Autocomplete
    //                     key={filterEle.id}
    //                     multiple
    //                     id="size-small-standard-multi"
    //                     options={filterEle.options as OptionProps[]}
    //                     disableCloseOnSelect
    //                     getOptionLabel={(option) => option.lable}
    //                     value={filterPropsStates[filterEle.id] as OptionProps[] | undefined}
    //                     renderOption={(props, option, { selected }) => (
    //                         <li {...props}>
    //                             <Checkbox
    //                                 icon={icon}
    //                                 checkedIcon={checkedIcon}
    //                                 style={{ marginRight: 8 }}
    //                                 checked={selected}
    //                             />
    //                             {option.lable}
    //                         </li>
    //                     )}
    //                     style={{ width: 500 }}
    //                     renderInput={(params) => (
    //                         <TextField {...params} variant="standard" label={filterEle.label} placeholder="" />
    //                     )}
    //                 />
    //                 break
    //             case 'switch':
    //                 return <FormControlLabel key={filterEle.id} control={<Switch checked={filterPropsStates[filterEle.id] as boolean} onChange={(e) => handleChange(filterEle.id, e)} />} label={filterEle.label} />

    //                 break
    //             case 'date':
    //                 return (
    //                     <>
    //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                             <DemoContainer components={['DateField', 'DateField']}>
    //                                 <DateField
    //                                     label={filterEle.label}
    //                                     value={filterPropsStates[filterEle.id]}
    //                                     onChange={(newValue) => handleChangeDate(filterEle.id, newValue)}
    //                                     variant="standard"
    //                                 />
    //                                 <DateField
    //                                     label={filterEle.label}
    //                                 // value={value}
    //                                 // onChange={(newValue) => setValue(newValue)}
    //                                 />
    //                             </DemoContainer>

    //                         </LocalizationProvider>

    //                     </>
    //                 )
    //                 break
    //         }
    //     })
    // }
    return (
        <>
            <strong>The dynamic filter in development</strong> 
        </>
    );
};

export default Filter;