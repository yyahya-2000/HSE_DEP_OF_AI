import { makeStyles } from 'tss-react/mui'

export const useResearchCenterCardStyle = makeStyles()((theme) => ({
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
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "25px",
        textDecorationLine: "underline",
        color: "#5F52FA"

    },
    status:{
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "30px",
        color: "#4A4646"
    },
    competence:{
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "30px",
        color: "#4A4646"
    },
}));

export default useResearchCenterCardStyle;