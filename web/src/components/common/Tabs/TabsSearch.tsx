import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {FC} from "react";
import {TabsProps} from "./Tabs.types";
import {observer} from "mobx-react-lite";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabIOSearch: FC<TabsSearchProps> = ({listOrganizations, listProjects, listResearchCenter, listProducts, listUseCases}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Организации" {...a11yProps(0)} />
                    <Tab label="Проекты" {...a11yProps(1)} />
                    <Tab label="Продукты" {...a11yProps(2)} />
                    <Tab label="Исследовательские центры" {...a11yProps(3)} />
                    <Tab label="Варианты использования" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {listOrganizations}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {listProjects}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {listProducts}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {listResearchCenter}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {listUseCases}
            </TabPanel>
        </Box>
    );
}

export default observer(TabIO);