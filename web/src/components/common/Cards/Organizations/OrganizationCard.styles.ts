import { makeStyles } from 'tss-react/mui'

export const useOrganizationCardStyle = makeStyles()((theme) => ({
    title:{
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        textTransform: "uppercase",
        color: "#4A4646",
        marginBottom: "10px",
    },
    line:{
        border: "1px solid #D9D9D9"
    },
    desc:{
        color: "#4A4646"
    },
    label:{
        textTransform: "uppercase",
        color: "#5F52FA"
    },
    labelEntity:{
        display: "inline",
        textTransform: "uppercase",
        color: "#5F52FA"
    },
    value:{
        display: "inline",
        color: "#4A4646",
    }
}));

export default useOrganizationCardStyle;
