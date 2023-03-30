import { makeStyles } from 'tss-react/mui'

export const useOrganizationCardStyle = makeStyles()((theme) => ({
    textcols:{
        overflow: "hidden"
    },
    textcolsLeft:{
        float: "left",
        width: "51%",
    },
    textcolsRight:{
        marginLeft: "53%",
    },
    title:{
        fontFamily: "Inter",
        fontStyle: "normal",
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
    website:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "25px",
        textDecorationLine: "underline",
        color: "#5F52FA"

    },
    status:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "30px",
        color: "#4A4646"
    },
    competence:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "30px",
        color: "#4A4646"
    },
}));

export default useOrganizationCardStyle;
